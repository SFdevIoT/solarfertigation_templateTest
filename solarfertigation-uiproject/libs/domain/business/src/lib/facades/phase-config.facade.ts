import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { BaseFacade, EntityState } from '../interfaces/base.interfaces';

export interface Phase {
  id: string;
  name: string;
  status: 'pending' | 'active' | 'completed';
  notes: string[];
  startDate?: Date;
  endDate?: Date;
}

export interface PhaseConfig {
  note?: string;
  startDate?: Date;
  endDate?: Date;
  parameters?: Record<string, any>;
}

interface PhaseConfigState extends EntityState<Phase> {
  currentPhaseId: string | null;
  configHistory: Record<string, PhaseConfig[]>;
}

@Injectable({ providedIn: 'root' })
export class PhaseConfigFacade implements BaseFacade<Phase> {
  private state$ = new BehaviorSubject<PhaseConfigState>({
    items: [],
    selectedItem: null,
    currentPhaseId: null,
    configHistory: {},
    loading: false,
    error: null
  });

  constructor() {}

  // Implementazione BaseFacade
  getAll(): Observable<Phase[]> {
    return this.state$.pipe(map(state => state.items));
  }

  getById(id: string): Observable<Phase | null> {
    return this.state$.pipe(
      map(state => state.items.find(phase => phase.id === id) || null)
    );
  }

  getState(): Observable<EntityState<Phase>> {
    return this.state$.pipe(
      map(({ items, selectedItem, loading, error }) => ({
        items,
        selectedItem,
        loading,
        error
      }))
    );
  }

  getLoading(): Observable<boolean> {
    return this.state$.pipe(map(state => state.loading));
  }

  getError(): Observable<string | null> {
    return this.state$.pipe(map(state => state.error));
  }

  // Metodi specifici per la configurazione delle fasi
  getCurrentPhase(): Observable<Phase | null> {
    return this.state$.pipe(
      map(state => 
        state.items.find(phase => phase.id === state.currentPhaseId) || null
      )
    );
  }

  getPhaseNotes(phaseId: string): Observable<string[]> {
    return this.getById(phaseId).pipe(
      map(phase => phase?.notes || [])
    );
  }

  getConfigHistory(phaseId: string): Observable<PhaseConfig[]> {
    return this.state$.pipe(
      map(state => state.configHistory[phaseId] || [])
    );
  }

  // Actions
  addPhaseNote(phaseId: string, note: string): Observable<void> {
    return new Observable(subscriber => {
      const currentState = this.state$.value;
      const phaseIndex = currentState.items.findIndex(p => p.id === phaseId);
      
      if (phaseIndex === -1) {
        subscriber.error('Fase non trovata');
        return;
      }

      const updatedPhases = [...currentState.items];
      const phase = { ...updatedPhases[phaseIndex] };
      phase.notes = [...(phase.notes || []), note];
      updatedPhases[phaseIndex] = phase;

      this.state$.next({
        ...currentState,
        items: updatedPhases
      });

      subscriber.next();
      subscriber.complete();
    });
  }

  deletePhaseNote(phaseId: string, noteIndex: number): Observable<void> {
    return new Observable(subscriber => {
      const currentState = this.state$.value;
      const phaseIndex = currentState.items.findIndex(p => p.id === phaseId);
      
      if (phaseIndex === -1) {
        subscriber.error('Fase non trovata');
        return;
      }

      const updatedPhases = [...currentState.items];
      const phase = { ...updatedPhases[phaseIndex] };
      
      if (!phase.notes || noteIndex >= phase.notes.length) {
        subscriber.error('Nota non trovata');
        return;
      }

      phase.notes = phase.notes.filter((_, index) => index !== noteIndex);
      updatedPhases[phaseIndex] = phase;

      this.state$.next({
        ...currentState,
        items: updatedPhases
      });

      subscriber.next();
      subscriber.complete();
    });
  }

  configurePhase(phaseId: string, config: PhaseConfig): Observable<void> {
    return new Observable(subscriber => {
      const currentState = this.state$.value;
      const phaseIndex = currentState.items.findIndex(p => p.id === phaseId);
      
      if (phaseIndex === -1) {
        subscriber.error('Fase non trovata');
        return;
      }

      // Aggiorna la configurazione
      const updatedHistory = {
        ...currentState.configHistory,
        [phaseId]: [
          ...(currentState.configHistory[phaseId] || []),
          { ...config, timestamp: new Date() }
        ]
      };

      // Aggiorna la fase
      const updatedPhases = [...currentState.items];
      const phase = { ...updatedPhases[phaseIndex] };
      
      if (config.note) {
        phase.notes = [...(phase.notes || []), config.note];
      }
      if (config.startDate) {
        phase.startDate = config.startDate;
      }
      if (config.endDate) {
        phase.endDate = config.endDate;
      }

      updatedPhases[phaseIndex] = phase;

      this.state$.next({
        ...currentState,
        items: updatedPhases,
        configHistory: updatedHistory
      });

      subscriber.next();
      subscriber.complete();
    });
  }

  // Utility methods
  reset(): void {
    this.state$.next({
      items: [],
      selectedItem: null,
      currentPhaseId: null,
      configHistory: {},
      loading: false,
      error: null
    });
  }

  select(id: string): void {
    const currentState = this.state$.value;
    const phase = currentState.items.find(p => p.id === id);
    
    if (phase) {
      this.state$.next({
        ...currentState,
        selectedItem: phase
      });
    }
  }
}
