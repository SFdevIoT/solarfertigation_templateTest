# Repository Library

Questa libreria fornisce l'accesso ai dati dell'applicazione attraverso repository pattern e mock data.

## Struttura

```
repository/
├── src/
│   ├── lib/
│   │   ├── mock/                    # Dati mock
│   │   │   ├── culture.mock.ts
│   │   │   ├── field.mock.ts
│   │   │   ├── machine.mock.ts
│   │   │   └── phase.mock.ts
│   │   ├── repositories/            # Repository services
│   │   │   ├── culture-repository.service.ts
│   │   │   ├── field-repository.service.ts
│   │   │   ├── machine-repository.service.ts
│   │   │   └── phase-repository.service.ts
│   │   └── repository.module.ts     # Module definition
│   └── index.ts                     # Public exports
```

## Aggiungere Nuovi Mock Data

1. Creare un nuovo file `*.mock.ts` nella cartella `mock/`
2. Importare le interfacce necessarie da `@solarfertigation-uiproject/domain/interfaces`
3. Definire i dati mock usando `Record<string, Interface>`

### Esempio

```typescript
// nuovo-tipo.mock.ts
import { NuovoTipo } from '@solarfertigation-uiproject/domain/interfaces';

export const nuovoTipoMockData: Record<string, NuovoTipo> = {
    'item1': {
        id: 'id1',
        name: 'Nome Item 1',
        // ... altri campi
        createdAt: new Date(),
        updatedAt: new Date()
    }
};
```

## Aggiungere Nuovi Repository

1. Creare un nuovo service `*-repository.service.ts` nella cartella `repositories/`
2. Importare i mock data necessari
3. Implementare i metodi CRUD e di query
4. Registrare il service in `repository.module.ts`

### Esempio

```typescript
// nuovo-tipo-repository.service.ts
import { Injectable } from '@angular/core';
import { NuovoTipo } from '@solarfertigation-uiproject/domain/interfaces';
import { nuovoTipoMockData } from '../mock/nuovo-tipo.mock';

@Injectable({
  providedIn: 'root'
})
export class NuovoTipoRepositoryService {
  getAll(): NuovoTipo[] {
    return Object.values(nuovoTipoMockData);
  }

  getById(id: string): NuovoTipo | undefined {
    return Object.values(nuovoTipoMockData)
      .find(item => item.id === id);
  }
}
```

## Convenzioni per i Mock Data

1. **Naming**:
   - File: `kebab-case.mock.ts`
   - Costanti: `camelCase`
   - Chiavi record: identificatori significativi

2. **Organizzazione**:
   - Un file mock per tipo di entità
   - Raggruppare dati correlati nello stesso file
   - Mantenere le relazioni tra entità coerenti

3. **Qualità dei Dati**:
   - Usare dati realistici e significativi
   - Mantenere le relazioni tra entità
   - Includere casi edge e scenari speciali

## Integrazione con Storybook

I repository e i mock data sono utilizzati nelle stories dei componenti per simulare dati reali:

1. Importare i repository necessari
2. Utilizzare i mock data nelle stories
3. Simulare scenari reali e casi edge

### Esempio Story con Repository

```typescript
import { NuovoTipoRepositoryService } from '@solarfertigation-uiproject/repository';

export default {
  title: 'Components/NuovoTipoList',
  component: NuovoTipoListComponent,
} as Meta;

export const Default = () => ({
  component: NuovoTipoListComponent,
  providers: [NuovoTipoRepositoryService],
  props: {
    items: new NuovoTipoRepositoryService().getAll()
  }
});
```

## Running unit tests

Run `nx test repository` to execute the unit tests.
