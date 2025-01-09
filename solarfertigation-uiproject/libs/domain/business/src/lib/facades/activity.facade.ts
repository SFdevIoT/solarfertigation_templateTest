import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Activity } from '@solarfertigation-uiproject/domain/interfaces';
import { ActivityService } from '../services/activity.service';

interface ActivityState {
  activities: Activity[];
  selectedActivity: Activity | null;
  currentActivities: Activity[];
  statistics: {
    totalActivities: number;
    completedActivities: number;
    averageCompletionTime: number;
    successRate: number;
  } | null;
  loading: boolean;
  error: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class ActivityFacade {
  private state$ = new BehaviorSubject<ActivityState>({
    activities: [],
    selectedActivity: null,
    currentActivities: [],
    statistics: null,
    loading: false,
    error: null
  });

  constructor(private service: ActivityService) {
    this.loadActivities();
    this.loadCurrentActivities();
    this.loadStatistics();
  }

  // Selectors
  getActivities(): Observable<Activity[]> {
    return this.state$.pipe(
      map(state => state.activities),
      distinctUntilChanged()
    );
  }

  getSelectedActivity(): Observable<Activity | null> {
    return this.state$.pipe(
      map(state => state.selectedActivity),
      distinctUntilChanged()
    );
  }

  getCurrentActivities(): Observable<Activity[]> {
    return this.state$.pipe(
      map(state => state.currentActivities),
      distinctUntilChanged()
    );
  }

  getStatistics(): Observable<{
    totalActivities: number;
    completedActivities: number;
    averageCompletionTime: number;
    successRate: number;
  } | null> {
    return this.state$.pipe(
      map(state => state.statistics),
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
  loadActivities(): void {
    this.updateState({ loading: true });

    this.service.getAllActivities().subscribe({
      next: (activities) => {
        this.updateState({ 
          activities,
          loading: false,
          error: null
        });
      },
      error: (error) => {
        this.updateState({
          loading: false,
          error: 'Errore nel caricamento delle attività'
        });
      }
    });
  }

  loadCurrentActivities(): void {
    this.service.getAllActivities().pipe(
      map(activities => 
        activities.filter(activity => 
          activity.status === 'in_progress' || 
          activity.status === 'paused'
        )
      )
    ).subscribe({
      next: (currentActivities) => {
        this.updateState({ currentActivities });
      }
    });
  }

  loadStatistics(): void {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));

    this.service.getActivityStatistics({
      start: thirtyDaysAgo,
      end: now
    }).subscribe({
      next: (statistics) => {
        this.updateState({ statistics });
      }
    });
  }

  selectActivity(id: string): void {
    const activity = this.state$.value.activities.find(a => a.id === id);
    if (activity) {
      this.updateState({ selectedActivity: activity });
    }
  }

  startActivity(id: string): void {
    this.service.startActivity(id).pipe(
      switchMap(() => this.service.getActivityById(id))
    ).subscribe({
      next: (activity) => {
        if (activity) {
          this.updateActivitiesList(activity);
          this.loadCurrentActivities();
        }
      }
    });
  }

  pauseActivity(id: string): void {
    this.service.pauseActivity(id).pipe(
      switchMap(() => this.service.getActivityById(id))
    ).subscribe({
      next: (activity) => {
        if (activity) {
          this.updateActivitiesList(activity);
          this.loadCurrentActivities();
        }
      }
    });
  }

  completeActivity(id: string): void {
    this.service.completeActivity(id).pipe(
      switchMap(() => this.service.getActivityById(id))
    ).subscribe({
      next: (activity) => {
        if (activity) {
          this.updateActivitiesList(activity);
          this.loadCurrentActivities();
          this.loadStatistics();
        }
      }
    });
  }

  // Helpers
  private updateActivitiesList(updatedActivity: Activity): void {
    const currentState = this.state$.value;
    const updatedActivities = currentState.activities.map(activity =>
      activity.id === updatedActivity.id ? updatedActivity : activity
    );

    this.updateState({ activities: updatedActivities });
  }

  // State Management
  private updateState(partialState: Partial<ActivityState>): void {
    const currentState = this.state$.value;
    this.state$.next({ ...currentState, ...partialState });
  }
}
