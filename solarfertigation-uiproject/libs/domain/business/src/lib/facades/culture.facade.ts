import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Coltura, CulturaFase } from '@solarfertigation-uiproject/domain/interfaces';
import { CultureService } from '../services/culture.service';

@Injectable({
  providedIn: 'root'
})
export class CultureFacade {
  // State
  private cultures$ = new BehaviorSubject<Coltura[]>([]);
  private selectedCulture$ = new BehaviorSubject<Coltura | null>(null);
  private culturePhases$ = new BehaviorSubject<CulturaFase[]>([]);
  private loading$ = new BehaviorSubject<boolean>(false);
  private error$ = new BehaviorSubject<string | null>(null);

  constructor(private service: CultureService) {
    this.loadCultures();
  }

  // Selectors
  getCultures(): Observable<Coltura[]> {
    return this.cultures$.asObservable();
  }

  getSelectedCulture(): Observable<Coltura | null> {
    return this.selectedCulture$.asObservable();
  }

  getCulturePhases(): Observable<CulturaFase[]> {
    return this.culturePhases$.asObservable();
  }

  getLoading(): Observable<boolean> {
    return this.loading$.asObservable();
  }

  getError(): Observable<string | null> {
    return this.error$.asObservable();
  }

  // Actions
  loadCultures(): void {
    this.loading$.next(true);
    this.error$.next(null);

    this.service.getAllCultures().subscribe({
      next: (cultures) => {
        this.cultures$.next(cultures);
        this.loading$.next(false);
      },
      error: (error) => {
        this.error$.next('Errore nel caricamento delle colture');
        this.loading$.next(false);
      }
    });
  }

  selectCulture(id: string): void {
    this.loading$.next(true);
    this.error$.next(null);

    this.service.getCultureById(id).subscribe({
      next: (culture) => {
        if (culture) {
          this.selectedCulture$.next(culture);
          this.loadCulturePhases(culture.id);
        } else {
          this.error$.next('Coltura non trovata');
        }
        this.loading$.next(false);
      },
      error: (error) => {
        this.error$.next('Errore nel caricamento della coltura');
        this.loading$.next(false);
      }
    });
  }

  private loadCulturePhases(cultureId: string): void {
    this.service.getCulturePhases(cultureId).subscribe({
      next: (phases) => {
        this.culturePhases$.next(phases);
      },
      error: (error) => {
        this.error$.next('Errore nel caricamento delle fasi');
      }
    });
  }

  // Computed Properties
  getActivePhase(): Observable<CulturaFase | undefined> {
    return this.culturePhases$.pipe(
      map(phases => phases.find(phase => phase.status === 'active'))
    );
  }

  getCompletedPhasesCount(): Observable<number> {
    return this.culturePhases$.pipe(
      map(phases => phases.filter(phase => phase.status === 'completed').length)
    );
  }

  // Business Logic Actions
  validatePhaseTransition(fromPhaseId: string, toPhaseId: string): Observable<boolean> {
    const selectedCulture = this.selectedCulture$.value;
    if (!selectedCulture) {
      return new Observable(subscriber => {
        subscriber.error('Nessuna coltura selezionata');
      });
    }

    return this.service.isPhaseTransitionAllowed(selectedCulture.id, fromPhaseId, toPhaseId);
  }

  calculateHarvestDate(): Observable<Date> {
    const selectedCulture = this.selectedCulture$.value;
    if (!selectedCulture) {
      return new Observable(subscriber => {
        subscriber.error('Nessuna coltura selezionata');
      });
    }

    return this.service.calculateExpectedHarvestDate(selectedCulture);
  }
}
