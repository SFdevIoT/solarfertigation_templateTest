€import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, timer } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Machine, Fertilizer } from '@solarfertigation-uiproject/domain/interfaces';
import { MachineService } from '../services/machine.service';

interface MachineState {
  machines: Machine[];
  selectedMachine: Machine | null;
  fertilizers: Record<string, Fertilizer[]>;
  loading: boolean;
  error: string | null;
  warnings: Record<string, string[]>;
}

@Injectable({
  providedIn: 'root'
})
export class MachineFacade {
  // State
  private state$ = new BehaviorSubject<MachineState>({
    machines: [],
    selectedMachine: null,
    fertilizers: {},
    loading: false,
    error: null,
    warnings: {}
  });

  // Subscriptions per il real-time monitoring
  private monitoringSubscriptions: Record<string, Subscription> = {};

  constructor(private service: MachineService) {
    this.loadMachines();
  }

  // Selectors
  getMachines(): Observable<Machine[]> {
    return this.state$.pipe(map(state => state.machines));
  }

  getSelectedMachine(): Observable<Machine | null> {
    return this.state$.pipe(map(state => state.selectedMachine));
  }

  getMachineFertilizers(machineId: string): Observable<Fertilizer[]> {
    return this.state$.pipe(
      map(state => state.fertilizers[machineId] || [])
    );
  }

  getLoading(): Observable<boolean> {
    return this.state$.pipe(map(state => state.loading));
  }

  getError(): Observable<string | null> {
    return this.state$.pipe(map(state => state.error));
  }

  getMachineWarnings(machineId: string): Observable<string[]> {
    return this.state$.pipe(
      map(state => state.warnings[machineId] || [])
    );
  }

  // Actions
  loadMachines(): void {
    this.updateState({ loading: true });

    this.service.getAllMachines().subscribe({
      next: (machines) => {
        this.updateState({ 
          machines,
          loading: false,
          error: null
        });

        // Avvia il monitoraggio per ogni macchina
        machines.forEach(machine => this.startMachineMonitoring(machine.id));
      },
      error: (error) => {
        this.updateState({
          loading: false,
          error: 'Errore nel caricamento delle macchine'
        });
      }
    });
  }

  selectMachine(id: string): void {
    const currentState = this.state$.value;
    const machine = currentState.machines.find(m => m.id === id);
    
    if (machine) {
      this.updateState({ selectedMachine: machine });
      this.loadMachineFertilizers(id);
    }
  }

  private loadMachineFertilizers(machineId: string): void {
    this.service.getFertilizersByMachine(machineId).subscribe({
      next: (fertilizers) => {
        const currentState = this.state$.value;
        this.updateState({
          fertilizers: {
            ...currentState.fertilizers,
            [machineId]: fertilizers
          }
        });
      }
    });
  }

  // Real-time Monitoring
  private startMachineMonitoring(machineId: string): void {
    // Ferma il monitoraggio esistente se presente
    this.stopMachineMonitoring(machineId);

    // Avvia il nuovo monitoraggio
    const subscription = timer(0, 5000).pipe(
      switchMap(() => this.service.getMachineStatus(machineId)),
      tap(machine => {
        const currentState = this.state$.value;
        const updatedMachines = currentState.machines.map(m => 
          m.id === machineId ? machine : m
        );

        this.updateState({ machines: updatedMachines });
      }),
      switchMap(() => this.service.validateFertilizerLevels(machineId)),
      tap(validation => {
        const currentState = this.state$.value;
        this.updateState({
          warnings: {
            ...currentState.warnings,
            [machineId]: [...validation.warnings, ...validation.errors]
          }
        });
      })
    ).subscribe();

    this.monitoringSubscriptions[machineId] = subscription;
  }

  private stopMachineMonitoring(machineId: string): void {
    if (this.monitoringSubscriptions[machineId]) {
      this.monitoringSubscriptions[machineId].unsubscribe();
      delete this.monitoringSubscriptions[machineId];
    }
  }

  // State Management
  private updateState(partialState: Partial<MachineState>): void {
    const currentState = this.state$.value;
    this.state$.next({ ...currentState, ...partialState });
  }

  // Cleanup
  destroy(): void {
    Object.keys(this.monitoringSubscriptions).forEach(machineId => {
      this.stopMachineMonitoring(machineId);
    });
  }
}
