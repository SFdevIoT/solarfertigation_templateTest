import { Observable } from 'rxjs';

/**
 * @interface EntityState
 * @description Stato base per qualsiasi entità
 */
export interface EntityState<T> {
  items: T[];
  selectedItem: T | null;
  loading: boolean;
  error: string | null;
}

/**
 * @interface BaseFacade
 * @description Interfaccia base per tutti i facade
 * Definisce i metodi standard che ogni facade deve implementare
 */
export interface BaseFacade<T, ID = string> {
  // Core methods
  getAll(): Observable<T[]>;
  getById(id: ID): Observable<T | null>;
  getState(): Observable<EntityState<T>>;
  
  // State selectors
  getLoading(): Observable<boolean>;
  getError(): Observable<string | null>;
  
  // Actions
  select(id: ID): void;
  reset(): void;
}

/**
 * @interface BaseRepository
 * @description Interfaccia base per tutti i repository
 * Definisce i metodi standard per l'accesso ai dati
 */
export interface BaseRepository<T, ID = string> {
  getAll(): T[];
  getById(id: ID): T | undefined;
  getByIds(ids: ID[]): T[];
}
