import { Injectable } from '@angular/core';
import { Observable, of, interval } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Machine, Fertilizer } from '@solarfertigation-uiproject/domain/interfaces';
import { MachineRepositoryService } from '@solarfertigation-uiproject/repository';

@Injectable({
  providedIn: 'root'
})
export class MachineService {
  constructor(private machineRepository: MachineRepositoryService) {}

  // Metodi base CRUD
  getAllMachines(): Observable<Machine[]> {
    return this.machineRepository.getMachines();
  }

  getMachineById(id: string): Observable<Machine | null> {
    return this.machineRepository.getMachineById(id);
  }

  getMachinesByZone(zoneId: string): Observable<Machine[]> {
    return this.machineRepository.getMachines().pipe(
      map(machines => machines.filter(m => m.zoneId === zoneId))
    );
  }

  // Gestione Fertilizzanti
  getFertilizersByMachine(machineId: string): Observable<Fertilizer[]> {
    return this.machineRepository.getFertilizerLevels(machineId);
  }

  // Monitoraggio Real-time
  getMachineStatus(machineId: string): Observable<Machine> {
    return interval(5000).pipe(
      switchMap(() => this.getMachineById(machineId)),
      map(machine => {
        if (!machine) throw new Error('Macchina non trovata');
        return machine;
      })
    );
  }

  getFertilizerLevels(machineId: string): Observable<Fertilizer[]> {
    return interval(5000).pipe(
      switchMap(() => this.getFertilizersByMachine(machineId))
    );
  }

  // Business Logic
  checkMachineAvailability(machineId: string): Observable<boolean> {
    return this.getMachineById(machineId).pipe(
      map(machine => machine?.status === 'active' && !machine.hasAlarm)
    );
  }

  validateFertilizerLevels(machineId: string): Observable<{ 
    valid: boolean; 
    warnings: string[];
    errors: string[] 
  }> {
    return this.getFertilizersByMachine(machineId).pipe(
      map(fertilizers => {
        const warnings: string[] = [];
        const errors: string[] = [];

        fertilizers.forEach(fert => {
          if (fert.currentLevel <= 10) {
            errors.push(`Livello critico per ${fert.name}: ${fert.currentLevel}%`);
          } else if (fert.currentLevel <= 25) {
            warnings.push(`Livello basso per ${fert.name}: ${fert.currentLevel}%`);
          }
        });

        return {
          valid: errors.length === 0,
          warnings,
          errors
        };
      })
    );
  }

  // Simulazione aggiornamenti (per testing)
  simulateFertilizerUpdate(machineId: string): Observable<Fertilizer[]> {
    return this.getFertilizersByMachine(machineId).pipe(
      map(fertilizers => 
        fertilizers.map(fert => ({
          ...fert,
          currentLevel: Math.max(0, Math.min(100, fert.currentLevel + (Math.random() * 20 - 10)))
        }))
      )
    );
  }

  simulateMachineStateChange(machineId: string): Observable<Machine | undefined> {
    return this.getMachineById(machineId).pipe(
      map(machine => {
        if (!machine) return undefined;
        return {
          ...machine,
          status: Math.random() > 0.8 ? 'inactive' : 'active',
          hasAlarm: Math.random() > 0.9
        };
      })
    );
  }

  updateMachineStatus(id: string, status: Machine['status']): Observable<void> {
    return this.machineRepository.updateMachineStatus(id, status);
  }
}
