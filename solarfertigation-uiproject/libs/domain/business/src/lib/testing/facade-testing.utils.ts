import { Observable, of, BehaviorSubject } from 'rxjs';
import { BaseFacade, EntityState } from '../interfaces/base.interfaces';

/**
 * @class FacadeTestingUtils
 * @description Utilities per il testing dei facade
 * Fornisce metodi per creare mock facade e simulare comportamenti
 */
export class FacadeTestingUtils {
  /**
   * Crea un mock facade con dati statici
   */
  static createMockFacade<T extends { id: string }>(mockData: T[]): BaseFacade<T> {
    const state$ = new BehaviorSubject<EntityState<T>>({
      items: mockData,
      selectedItem: null,
      loading: false,
      error: null
    });

    return {
      getAll: () => of(mockData),
      getById: (id) => of(mockData.find(item => item.id === id) || null),
      getState: () => state$.asObservable(),
      getLoading: () => of(false),
      getError: () => of(null),
      select: (id) => {
        const current = state$.value;
        state$.next({
          ...current,
          selectedItem: mockData.find(item => item.id === id) || null
        });
      },
      reset: () => {
        state$.next({
          items: mockData,
          selectedItem: null,
          loading: false,
          error: null
        });
      }
    };
  }

  /**
   * Crea un mock facade con comportamento dinamico
   */
  static createDynamicMockFacade<T extends { id: string }>(
    mockData: T[],
    options: {
      simulateDelay?: number;
      simulateErrors?: boolean;
    } = {}
  ): BaseFacade<T> {
    const { simulateDelay = 0, simulateErrors = false } = options;
    const state$ = new BehaviorSubject<EntityState<T>>({
      items: mockData,
      selectedItem: null,
      loading: false,
      error: null
    });

    return {
      getAll: () => {
        if (simulateErrors && Math.random() > 0.8) {
          return new Observable(subscriber => {
            subscriber.error('Simulated error in getAll');
          });
        }
        return new Observable(subscriber => {
          state$.next({ ...state$.value, loading: true });
          setTimeout(() => {
            state$.next({ ...state$.value, loading: false });
            subscriber.next(mockData);
            subscriber.complete();
          }, simulateDelay);
        });
      },
      getById: (id) => {
        return new Observable(subscriber => {
          state$.next({ ...state$.value, loading: true });
          setTimeout(() => {
            const item = mockData.find(item => item.id === id);
            state$.next({ ...state$.value, loading: false });
            subscriber.next(item || null);
            subscriber.complete();
          }, simulateDelay);
        });
      },
      getState: () => state$.asObservable(),
      getLoading: () => of(state$.value.loading),
      getError: () => of(state$.value.error),
      select: (id) => {
        state$.next({
          ...state$.value,
          selectedItem: mockData.find(item => item.id === id) || null
        });
      },
      reset: () => {
        state$.next({
          items: mockData,
          selectedItem: null,
          loading: false,
          error: null
        });
      }
    };
  }
}
