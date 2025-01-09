import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map, tap, distinctUntilChanged } from 'rxjs/operators';
import { Zone, Machine, Culture } from '@solarfertigation-uiproject/domain/interfaces';
import { ZoneService } from '../services/zone.service';

interface ZoneState {
  zones: Zone[];
  selectedZone: Zone | null;
  zoneDetails: Record<string, {
    machines: Machine[];
    cultures: Culture[];
    status: 'active' | 'warning' | 'error';
  }>;
  statistics: Record<string, {
    totalMachines: number;
    activeMachines: number;
    totalCultures: number;
    activeCultures: number;
    efficiency: number;
  }>;
  loading: boolean;
  error: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class ZoneFacade {
  private state$ = new BehaviorSubject<ZoneState>({
    zones: [],
    selectedZone: null,
    zoneDetails: {},
    statistics: {},
    loading: false,
    error: null
  });

  constructor(private service: ZoneService) {
    this.loadZones();
  }

  // Selectors
  getZones(): Observable<Zone[]> {
    return this.state$.pipe(
      map(state => state.zones),
      distinctUntilChanged()
    );
  }

  getSelectedZone(): Observable<Zone | null> {
    return this.state$.pipe(
      map(state => state.selectedZone),
      distinctUntilChanged()
    );
  }

  getZoneDetails(zoneId: string): Observable<{
    machines: Machine[];
    cultures: Culture[];
    status: 'active' | 'warning' | 'error';
  } | undefined> {
    return this.state$.pipe(
      map(state => state.zoneDetails[zoneId]),
      distinctUntilChanged()
    );
  }

  getZoneStatistics(zoneId: string): Observable<{
    totalMachines: number;
    activeMachines: number;
    totalCultures: number;
    activeCultures: number;
    efficiency: number;
  } | undefined> {
    return this.state$.pipe(
      map(state => state.statistics[zoneId]),
      distinctUntilChanged()
    );
  }

  getLoading(): Observable<boolean> {
    return this.state$.pipe(
      map(state => state.loading),
      distinctUntilChanged()
    );
  }

  getError(): Observable<string | null> {
    return this.state$.pipe(
      map(state => state.error),
      distinctUntilChanged()
    );
  }

  // Actions
  loadZones(): void {
    this.updateState({ loading: true });

    this.service.getAllZones().subscribe({
      next: (zones) => {
        this.updateState({ 
          zones,
          loading: false,
          error: null
        });

        // Carica i dettagli per ogni zona
        zones.forEach(zone => this.loadZoneDetails(zone.id));
      },
      error: (error) => {
        this.updateState({
          loading: false,
          error: 'Errore nel caricamento delle zone'
        });
      }
    });
  }

  selectZone(id: string): void {
    const currentState = this.state$.value;
    const zone = currentState.zones.find(z => z.id === id);
    
    if (zone) {
      this.updateState({ selectedZone: zone });
      this.loadZoneDetails(id);
    }
  }

  private loadZoneDetails(zoneId: string): void {
    combineLatest([
      this.service.getZoneDetails(zoneId),
      this.service.getZoneStatistics(zoneId)
    ]).subscribe({
      next: ([details, statistics]) => {
        const currentState = this.state$.value;
        
        this.updateState({
          zoneDetails: {
            ...currentState.zoneDetails,
            [zoneId]: {
              machines: details.machines,
              cultures: details.cultures,
              status: details.status
            }
          },
          statistics: {
            ...currentState.statistics,
            [zoneId]: statistics
          }
        });
      }
    });
  }

  // Computed Properties
  getActiveZonesCount(): Observable<number> {
    return this.state$.pipe(
      map(state => 
        Object.values(state.zoneDetails).filter(
          details => details.status === 'active'
        ).length
      )
    );
  }

  getZonesWithWarnings(): Observable<string[]> {
    return this.state$.pipe(
      map(state => {
        const zonesWithWarnings: string[] = [];
        Object.entries(state.zoneDetails).forEach(([zoneId, details]) => {
          if (details.status === 'warning') {
            const zone = state.zones.find(z => z.id === zoneId);
            if (zone) {
              zonesWithWarnings.push(zone.name);
            }
          }
        });
        return zonesWithWarnings;
      })
    );
  }

  getOverallEfficiency(): Observable<number> {
    return this.state$.pipe(
      map(state => {
        const stats = Object.values(state.statistics);
        if (stats.length === 0) return 0;
        
        const totalEfficiency = stats.reduce(
          (sum, stat) => sum + stat.efficiency, 0
        );
        return totalEfficiency / stats.length;
      })
    );
  }

  // State Management
  private updateState(partialState: Partial<ZoneState>): void {
    const currentState = this.state$.value;
    this.state$.next({ ...currentState, ...partialState });
  }
}
