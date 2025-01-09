# Guida all'Implementazione dei Componenti

Questa guida descrive il processo di implementazione di nuovi componenti seguendo l'architettura dell'applicazione principale "SOLARFERTIGATION", con particolare attenzione alla struttura facade-entities-service-repository.

## Architettura a Livelli

```
Component UI
    ↓
Facade (State Management)
    ↓
Entities (Interfaces)
    ↓
Service (Business Logic)
    ↓
Repository (Data Access)
    ↓
Entities (Domain Models)
```

## Processo di Implementazione

### 1. Analisi e Preparazione

Prima di iniziare l'implementazione:

1. Identificare le entità di dominio necessarie
2. Definire le interfacce richieste
3. Preparare i mock data
4. Pianificare la struttura del componente

### 2. Comandi per la Generazione dei File

```bash
# 1. Creare una nuova libreria (se necessario)
nx g @nx/angular:library my-feature --directory=libs/my-feature

# 2. Generare le interfacce
nx g @nx/angular:interface my-entity --project=domain-interfaces

# 3. Generare il repository
nx g @nx/angular:service repositories/my-entity-repository --project=repository

# 4. Generare il service
nx g @nx/angular:service services/my-entity --project=my-feature

# 5. Generare il facade
nx g @nx/angular:service facades/my-entity.facade --project=my-feature

# 6. Generare il componente
nx g @nx/angular:component components/my-entity --project=my-feature

# 7. Generare le stories
nx g @nx/angular:stories --project=my-feature
```

### 3. Implementazione Step-by-Step

#### 3.1 Entities (Domain Models)

```typescript
// libs/domain/interfaces/src/lib/my-entity.entities.ts
import { BaseEntity } from './base.entities';

export interface MyEntity extends BaseEntity {
    name: string;
    // ... altri campi
}
```

#### 3.2 Repository Layer

```typescript
// libs/repository/src/lib/mock/my-entity.mock.ts
export const myEntityMockData: Record<string, MyEntity> = {
    'entity1': {
        id: '1',
        name: 'Entity 1',
        createdAt: new Date(),
        updatedAt: new Date()
    }
};

// libs/repository/src/lib/repositories/my-entity-repository.service.ts
@Injectable({ providedIn: 'root' })
export class MyEntityRepositoryService {
    getAll(): MyEntity[] {
        return Object.values(myEntityMockData);
    }
}
```

#### 3.3 Service Layer (Business Logic)

```typescript
// libs/my-feature/src/lib/services/my-entity.service.ts
@Injectable({ providedIn: 'root' })
export class MyEntityService {
    constructor(private repository: MyEntityRepositoryService) {}

    getEntities(): Observable<MyEntity[]> {
        return of(this.repository.getAll());
    }
}
```

#### 3.4 Facade Layer (State Management)

```typescript
// libs/my-feature/src/lib/facades/my-entity.facade.ts
@Injectable({ providedIn: 'root' })
export class MyEntityFacade {
    private entities$ = new BehaviorSubject<MyEntity[]>([]);

    constructor(private service: MyEntityService) {
        this.loadEntities();
    }

    getEntities(): Observable<MyEntity[]> {
        return this.entities$.asObservable();
    }

    private loadEntities(): void {
        this.service.getEntities()
            .subscribe(entities => this.entities$.next(entities));
    }
}
```

#### 3.5 Component Layer (UI)

```typescript
// libs/my-feature/src/lib/components/my-entity/my-entity.component.ts
@Component({
    selector: 'app-my-entity',
    templateUrl: './my-entity.component.html'
})
export class MyEntityComponent implements OnInit {
    entities$ = this.facade.getEntities();

    constructor(private facade: MyEntityFacade) {}
}
```

#### 3.6 Storybook Integration

```typescript
// libs/my-feature/src/lib/components/my-entity/my-entity.stories.ts
import { Meta } from '@storybook/angular';
import { MyEntityComponent } from './my-entity.component';
import { MyEntityFacade } from '../../facades/my-entity.facade';
import { MyEntityService } from '../../services/my-entity.service';
import { MyEntityRepositoryService } from '@solarfertigation-uiproject/repository';

export default {
    title: 'Components/MyEntity',
    component: MyEntityComponent
} as Meta;

export const Default = () => ({
    component: MyEntityComponent,
    providers: [
        MyEntityFacade,
        MyEntityService,
        MyEntityRepositoryService
    ]
});
```

## Best Practices

1. **Separazione delle Responsabilità**:
   - Components: Presentazione e interazione utente
   - Facades: Gestione dello stato e orchestrazione
   - Services: Logica di business
   - Repositories: Accesso ai dati

2. **Gestione dello Stato**:
   - Utilizzare BehaviorSubject per lo stato locale
   - Esporre solo Observable dai facade
   - Mantenere lo stato immutabile

3. **Testing**:
   - Unit test per ogni layer
   - Integration test tra layers
   - E2E test per flussi completi

4. **Storybook**:
   - Documentare tutti i casi d'uso
   - Includere stati di loading/error
   - Testare la responsività

## Comandi Utili per il Development

```bash
# Servire l'applicazione
nx serve

# Servire Storybook
nx run ui:storybook

# Generare test
nx g @nx/angular:test --project=my-feature

# Eseguire i test
nx test my-feature

# Buildare la libreria
nx build my-feature

# Buildare Storybook
nx run ui:build-storybook
```

## Integrazione con l'Applicazione Principale

1. **Esportazione**:
   ```typescript
   // libs/my-feature/src/index.ts
   export * from './lib/components/my-entity/my-entity.component';
   export * from './lib/facades/my-entity.facade';
   ```

2. **Importazione**:
   ```typescript
   // In app.module.ts
   import { MyFeatureModule } from '@solarfertigation-uiproject/my-feature';
   ```

3. **Utilizzo**:
   ```typescript
   // In un componente
   import { MyEntityFacade } from '@solarfertigation-uiproject/my-feature';
   ```
