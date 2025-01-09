# Business Layer Documentation

## Overview
Il business layer dell'applicazione è strutturato per fornire un'interfaccia coerente tra i componenti UI e i dati, facilitando lo sviluppo e il testing dei componenti in isolamento.

## Architettura

### 1. Base Interfaces
```typescript
interface BaseFacade<T, ID = string> {
  getAll(): Observable<T[]>;
  getById(id: ID): Observable<T | null>;
  getState(): Observable<EntityState<T>>;
  // ... altri metodi
}
```

### 2. Testing Utilities
- `FacadeTestingUtils`: Utility per creare mock facade
- `StorybookTestingUtils`: Utility per l'integrazione con Storybook

### 3. Componenti
Ogni componente può essere utilizzato in due modalità:
- **Standalone**: Per sviluppo UI puro
- **Integrato**: Utilizzando i facade per i dati reali

## Implementazione Facade

### Activity Facade
Il facade per la gestione delle attività fornisce i seguenti metodi:

```typescript
interface ActivityFacade extends BaseFacade<Activity> {
  // Gestione Fasi
  getPhases(activityId: string): Observable<Phase[]>;
  getCurrentPhase(activityId: string): Observable<Phase | null>;
  
  // Configurazione
  configurePhase(activityId: string, phase: Phase, config: PhaseConfig): Observable<void>;
  addPhaseNote(activityId: string, phaseId: string, note: string): Observable<void>;
  deletePhaseNote(activityId: string, phaseId: string, noteIndex: number): Observable<void>;
  
  // Transizioni
  moveToNextPhase(activityId: string): Observable<void>;
  moveToPreviousPhase(activityId: string): Observable<void>;
}
```

### Machine Facade
```typescript
interface MachineFacade extends BaseFacade<Machine> {
  getMachineStatus(id: string): Observable<MachineStatus>;
  getFertilizerLevels(id: string): Observable<FertilizerLevel[]>;
  // ... altri metodi
}
```

## Utilizzo nei Componenti

### 1. Definizione Componente
```typescript
@Component({
  selector: 'sf-activity-config',
  template: `...`
})
export class ActivityConfigComponent {
  @Input() activityId?: string;
  @Input() standalone = false;
  @Input() mockData?: Activity; // Per modalità standalone
}
```

### 2. Storie Storybook
```typescript
export default {
  title: 'Components/ActivityConfig',
  component: ActivityConfigComponent,
  decorators: [
    moduleMetadata({
      providers: StorybookTestingUtils.createProvidersWithMockFacade(
        ActivityFacade, 
        MOCK_ACTIVITIES
      )
    })
  ]
};
```

## Best Practices

1. **Sviluppo Componenti**
   - Iniziare sempre in modalità standalone
   - Aggiungere l'integrazione con il facade dopo
   - Testare tutti gli stati (loading, error, empty)

2. **Testing**
   - Utilizzare i mock facade per i test
   - Testare sia la modalità standalone che integrata
   - Coprire tutti i casi d'uso

3. **Documentazione**
   - Documentare tutti i metodi del facade
   - Fornire esempi di utilizzo
   - Mantenere aggiornata la documentazione Storybook

## Migrazione verso Produzione

Per migrare un componente in produzione:

1. Rimuovere la modalità standalone
2. Sostituire il mock facade con quello reale
3. Aggiornare i test per utilizzare i dati reali

## Esempi

### Configurazione Fase Attività
```typescript
// Nel componente
constructor(private activityFacade: ActivityFacade) {
  this.phases$ = this.activityFacade.getPhases(this.activityId);
}

onAddNote(note: string): void {
  this.activityFacade.addPhaseNote(
    this.activityId,
    this.currentPhase.id,
    note
  ).subscribe();
}
```

### Testing con Mock
```typescript
describe('ActivityConfigComponent', () => {
  let mockFacade: BaseFacade<Activity>;

  beforeEach(() => {
    mockFacade = FacadeTestingUtils.createMockFacade(MOCK_ACTIVITIES);
    TestBed.configureTestingModule({
      providers: [
        { provide: ActivityFacade, useValue: mockFacade }
      ]
    });
  });
});
```
