import { Injectable } from '@angular/core';
import { Observable, of, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Activity, Machine, Zone } from '@solarfertigation-uiproject/domain/interfaces';
import { ActivityRepositoryService } from '@solarfertigation-uiproject/repository';
import { MachineService } from './machine.service';
import { ZoneService } from './zone.service';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  constructor(
    private repository: ActivityRepositoryService,
    private machineService: MachineService,
    private zoneService: ZoneService
  ) {}

  // Metodi base CRUD
  getAllActivities(): Observable<Activity[]> {
    return of(this.repository.getAllActivities());
  }

  getActivityById(id: string): Observable<Activity | undefined> {
    return of(this.repository.getActivityById(id));
  }

  getActivitiesByMachine(machineId: string): Observable<Activity[]> {
    return of(this.repository.getActivitiesByMachine(machineId));
  }

  getActivitiesByZone(zoneId: string): Observable<Activity[]> {
    return of(this.repository.getActivitiesByZone(zoneId));
  }

  // Gestione Stato Attività
  startActivity(activityId: string): Observable<Activity> {
    return this.getActivityById(activityId).pipe(
      map(activity => {
        if (!activity) throw new Error('Attività non trovata');
        return {
          ...activity,
          status: 'in_progress',
          startTime: new Date()
        };
      })
    );
  }

  pauseActivity(activityId: string): Observable<Activity> {
    return this.getActivityById(activityId).pipe(
      map(activity => {
        if (!activity) throw new Error('Attività non trovata');
        return {
          ...activity,
          status: 'paused',
          pauseTime: new Date()
        };
      })
    );
  }

  completeActivity(activityId: string): Observable<Activity> {
    return this.getActivityById(activityId).pipe(
      map(activity => {
        if (!activity) throw new Error('Attività non trovata');
        return {
          ...activity,
          status: 'completed',
          endTime: new Date()
        };
      })
    );
  }

  // Validazione e Business Logic
  validateActivityRequirements(activity: Activity): Observable<{
    valid: boolean;
    warnings: string[];
    errors: string[];
  }> {
    return combineLatest([
      this.machineService.checkMachineAvailability(activity.machineId),
      this.zoneService.checkZoneAvailability(activity.zoneId)
    ]).pipe(
      map(([machineAvailable, zoneAvailable]) => {
        const warnings: string[] = [];
        const errors: string[] = [];

        if (!machineAvailable) {
          errors.push('Macchina non disponibile');
        }

        if (!zoneAvailable.available) {
          errors.push(`Zona non disponibile: ${zoneAvailable.reason}`);
        }

        // Validazione temporale
        const now = new Date();
        if (activity.scheduledStart && new Date(activity.scheduledStart) < now) {
          warnings.push('Data di inizio programmata nel passato');
        }

        return {
          valid: errors.length === 0,
          warnings,
          errors
        };
      })
    );
  }

  calculateActivityDuration(activity: Activity): Observable<{
    estimatedDuration: number;
    actualDuration?: number;
    efficiency?: number;
  }> {
    return of({
      estimatedDuration: activity.estimatedDuration || 0,
      actualDuration: activity.endTime && activity.startTime ? 
        new Date(activity.endTime).getTime() - new Date(activity.startTime).getTime() : 
        undefined,
      efficiency: activity.endTime && activity.startTime && activity.estimatedDuration ?
        (activity.estimatedDuration / 
          (new Date(activity.endTime).getTime() - new Date(activity.startTime).getTime())) * 100 :
        undefined
    });
  }

  // Reporting e Analytics
  getActivityStatistics(timeRange: { start: Date; end: Date }): Observable<{
    totalActivities: number;
    completedActivities: number;
    averageCompletionTime: number;
    successRate: number;
  }> {
    return this.getAllActivities().pipe(
      map(activities => {
        const filteredActivities = activities.filter(activity => 
          activity.startTime && 
          new Date(activity.startTime) >= timeRange.start &&
          new Date(activity.startTime) <= timeRange.end
        );

        const completedActivities = filteredActivities.filter(
          activity => activity.status === 'completed'
        );

        const completionTimes = completedActivities
          .map(activity => 
            activity.endTime && activity.startTime ?
              new Date(activity.endTime).getTime() - new Date(activity.startTime).getTime() :
              0
          )
          .filter(time => time > 0);

        return {
          totalActivities: filteredActivities.length,
          completedActivities: completedActivities.length,
          averageCompletionTime: completionTimes.length > 0 ?
            completionTimes.reduce((sum, time) => sum + time, 0) / completionTimes.length :
            0,
          successRate: filteredActivities.length > 0 ?
            (completedActivities.length / filteredActivities.length) * 100 :
            0
        };
      })
    );
  }
}
