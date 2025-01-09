import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Coltura, CulturaFase } from '@solarfertigation-uiproject/domain/interfaces';
import { CultureRepositoryService } from '@solarfertigation-uiproject/repository';

@Injectable({
  providedIn: 'root'
})
export class CultureService {
  constructor(private repository: CultureRepositoryService) {}

  // Metodi base CRUD
  getAllCultures(): Observable<Coltura[]> {
    return of(this.repository.getAllCultures());
  }

  getCultureById(id: string): Observable<Coltura | undefined> {
    return of(this.repository.getCultureById(id));
  }

  getCulturesByZone(zoneId: string): Observable<Coltura[]> {
    return of(this.repository.getCulturesByZone(zoneId));
  }

  getCulturesByField(fieldId: string): Observable<Coltura[]> {
    return of(this.repository.getCulturesByField(fieldId));
  }

  // Metodi per la gestione delle fasi
  getCulturePhases(cultureId: string): Observable<CulturaFase[]> {
    return of(this.repository.getCulturePhases(cultureId));
  }

  getActivePhase(cultureId: string): Observable<CulturaFase | undefined> {
    return of(this.repository.getActivePhase(cultureId));
  }

  getCompletedPhases(cultureId: string): Observable<CulturaFase[]> {
    return of(this.repository.getCompletedPhases(cultureId));
  }

  // Metodi di business logic
  isPhaseTransitionAllowed(cultureId: string, fromPhaseId: string, toPhaseId: string): Observable<boolean> {
    // Implementare la logica di validazione della transizione di fase
    return of(true); // TODO: implementare la logica effettiva
  }

  calculateExpectedHarvestDate(culture: Coltura): Observable<Date> {
    // Implementare la logica di calcolo della data prevista di raccolta
    return of(new Date()); // TODO: implementare la logica effettiva
  }

  validateCultureConfiguration(culture: Coltura): Observable<{ valid: boolean; errors: string[] }> {
    // Implementare la validazione della configurazione della coltura
    return of({ valid: true, errors: [] }); // TODO: implementare la logica effettiva
  }
}
