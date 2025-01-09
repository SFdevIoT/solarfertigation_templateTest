# Domain Interfaces Library

Questa libreria contiene tutte le interfacce di dominio utilizzate nell'applicazione Solarfertigation.

## Struttura

```
interfaces/
├── src/
│   ├── lib/
│   │   ├── activity.entities.ts     # Interfacce per le attività
│   │   ├── base.entities.ts         # Interfacce base comuni
│   │   ├── campi.entities.ts        # Interfacce per i campi
│   │   ├── colture.entities.ts      # Interfacce per le colture
│   │   ├── colture-fasi.entities.ts # Interfacce per le fasi delle colture
│   │   ├── machine.entities.ts      # Interfacce per le macchine
│   │   └── zone.entities.ts         # Interfacce per le zone
│   └── index.ts                     # Export pubblici
```

## Aggiungere Nuove Interfacce

1. Creare un nuovo file `*.entities.ts` nella cartella `src/lib/`
2. Definire le interfacce necessarie estendendo `BaseEntity` se appropriato
3. Esportare le interfacce in `index.ts`

### Esempio

```typescript
// nuovo-tipo.entities.ts
import { BaseEntity } from './base.entities';

export interface NuovoTipo extends BaseEntity {
    name: string;
    // ... altri campi
}
```

## Convenzioni

1. **Naming**:
   - File: `kebab-case.entities.ts`
   - Interfacce: `PascalCase`
   - Proprietà: `camelCase`

2. **Organizzazione**:
   - Raggruppare interfacce correlate nello stesso file
   - Usare commenti per documentare campi complessi
   - Includere esempi nei commenti quando utile

3. **Tipizzazione**:
   - Preferire tipi espliciti a `any`
   - Usare union types per enumerazioni
   - Documentare valori possibili nei commenti

## Integrazione con Storybook

Le interfacce sono utilizzate nei componenti UI e nelle loro stories. Per ogni interfaccia:

1. Creare mock data appropriati nella libreria repository
2. Utilizzare i mock nelle stories dei componenti
3. Documentare esempi di utilizzo nei file story

### Esempio Story con Interfacce

```typescript
import { NuovoTipo } from '@solarfertigation-uiproject/domain/interfaces';
import { nuovoTipoMockData } from '@solarfertigation-uiproject/repository';

export default {
  title: 'Components/NuovoTipoComponent',
  component: NuovoTipoComponent,
} as Meta;

export const Default = () => ({
  component: NuovoTipoComponent,
  props: {
    data: nuovoTipoMockData.default
  }
});
