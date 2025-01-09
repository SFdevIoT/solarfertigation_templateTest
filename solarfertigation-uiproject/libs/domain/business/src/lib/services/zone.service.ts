import { Injectable } from '@angular/core';
import { Observable, of, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Zone, Machine, Culture } from '@solarfertigation-uiproject/domain/interfaces';
import { ZoneRepositoryService } from '@solarfertigation-uiproject/repository';
import { MachineService } from './machine.service';
import { CultureService } from './culture.service';

@Injectable({
  providedIn: 'root'
})
export class ZoneService {
  constructor(
    private repository: ZoneRepositoryService,
    private machineService: MachineService,
    private cultureService: CultureService
  ) {}

  // Metodi base CRUD
  getAllZones(): Observable<Zone[]> {
    return of(this.repository.getAllZones());
  }

  getZoneById(id: string): Observable<Zone | undefined> {
    return of(this.repository.getZoneById(id));
  }

  // Relazioni con altre entità
  getZoneMachines(zoneId: string): Observable<Machine[]> {
    return this.machineService.getMachinesByZone(zoneId);
  }

  getZoneCultures(zoneId: string): Observable<Culture[]> {
    return this.cultureService.getCulturesByZone(zoneId);
  }

  // Aggregazione dati zona
  getZoneDetails(zoneId: string): Observable<{
    zone: Zone | undefined;
    machines: Machine[];
    cultures: Culture[];
    status: 'active' | 'warning' | 'error';
  }> {
    return combineLatest([
      this.getZoneById(zoneId),
      this.getZoneMachines(zoneId),
      this.getZoneCultures(zoneId)
    ]).pipe(
      map(([zone, machines, cultures]) => {
        // Calcola lo stato della zona basato sulle macchine e colture
        let status: 'active' | 'warning' | 'error' = 'active';
        
        const hasInactiveMachines = machines.some(m => !m.isActive);
        const hasAlarmedMachines = machines.some(m => m.hasAlarm);
        
        if (hasAlarmedMachines) {
          status = 'error';
        } else if (hasInactiveMachines) {
          status = 'warning';
        }

        return {
          zone,
          machines,
          cultures,
          status
        };
      })
    );
  }

  // Business Logic
  validateZoneConfiguration(zoneId: string): Observable<{
    valid: boolean;
    warnings: string[];
    errors: string[];
  }> {
    return this.getZoneDetails(zoneId).pipe(
      map(({ zone, machines, cultures }) => {
        const warnings: string[] = [];
        const errors: string[] = [];

        // Validazione macchine
        if (machines.length === 0) {
          errors.push('Nessuna macchina associata alla zona');
        }

        machines.forEach(machine => {
          if (!machine.isActive) {
            warnings.push(`Macchina ${machine.name} non attiva`);
          }
          if (machine.hasAlarm) {
            errors.push(`Allarme attivo su macchina ${machine.name}`);
          }
        });

        // Validazione colture
        if (cultures.length === 0) {
          warnings.push('Nessuna coltura presente nella zona');
        }

        return {
          valid: errors.length === 0,
          warnings,
          errors
        };
      })
    );
  }

  checkZoneAvailability(zoneId: string): Observable<{
    available: boolean;
    reason?: string;
  }> {
    return this.getZoneDetails(zoneId).pipe(
      map(({ zone, machines, cultures }) => {
        if (!zone) {
          return { available: false, reason: 'Zona non trovata' };
        }

        const activeMachines = machines.filter(m => m.isActive);
        if (activeMachines.length === 0) {
          return { available: false, reason: 'Nessuna macchina attiva nella zona' };
        }

        const alarmedMachines = machines.filter(m => m.hasAlarm);
        if (alarmedMachines.length > 0) {
          return { available: false, reason: 'Presenza di allarmi nelle macchine' };
        }

        return { available: true };
      })
    );
  }

  // Statistiche zona
  getZoneStatistics(zoneId: string): Observable<{
    totalMachines: number;
    activeMachines: number;
    totalCultures: number;
    activeCultures: number;
    efficiency: number;
  }> {
    return this.getZoneDetails(zoneId).pipe(
      map(({ machines, cultures }) => {
        const activeMachines = machines.filter(m => m.isActive);
        const activeCultures = cultures.filter(c => c.status === 'active');
        
        return {
          totalMachines: machines.length,
          activeMachines: activeMachines.length,
          totalCultures: cultures.length,
          activeCultures: activeCultures.length,
          efficiency: machines.length > 0 ? 
            (activeMachines.length / machines.length) * 100 : 0
        };
      })
    );
  }
}
