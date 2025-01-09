# Storybook Integration Guide

Questa guida spiega come utilizzare Storybook nell'applicazione Solarfertigation per sviluppare e documentare i componenti UI.

## Struttura delle Stories

```
component-library/
├── src/
│   └── lib/
│       ├── components/
│       │   └── my-component/
│       │       ├── my-component.component.ts
│       │       ├── my-component.component.html
│       │       ├── my-component.component.scss
│       │       └── my-component.stories.ts
│       └── ...
```

## Creare una Nuova Story

1. Creare il file `*.stories.ts` nella stessa cartella del componente
2. Importare i repository e i mock data necessari
3. Definire i casi d'uso principali come storie separate

### Template Base

```typescript
import { Meta, Story } from '@storybook/angular';
import { MyComponent } from './my-component.component';
import { MyDataRepositoryService } from '@solarfertigation-uiproject/repository';

export default {
  title: 'Components/MyComponent',
  component: MyComponent,
  argTypes: {
    // Definire i controlli per i props
    title: { control: 'text' },
    items: { control: 'object' }
  }
} as Meta;

// Template base
const Template: Story = (args) => ({
  component: MyComponent,
  props: args
});

// Storia di default
export const Default = Template.bind({});
Default.args = {
  title: 'Mio Componente',
  items: new MyDataRepositoryService().getAll()
};

// Varianti
export const Empty = Template.bind({});
Empty.args = {
  title: 'Nessun Dato',
  items: []
};
```

## Best Practices

1. **Organizzazione**:
   - Raggruppare storie correlate sotto lo stesso titolo
   - Usare una gerarchia chiara nei titoli (es: "Components/Data/TableView")
   - Mantenere le storie vicine ai componenti

2. **Mock Data**:
   - Utilizzare i repository per accedere ai mock data
   - Creare varianti con dati diversi
   - Includere casi edge e stati di errore

3. **Documentazione**:
   - Aggiungere descrizioni per ogni storia
   - Documentare i props e gli eventi
   - Includere esempi di utilizzo

4. **Testing**:
   - Usare le storie per i test visivi
   - Verificare stati e interazioni
   - Testare la responsività

## Esempi di Stories

### Lista di Colture

```typescript
import { Meta } from '@storybook/angular';
import { CultureListComponent } from './culture-list.component';
import { CultureRepositoryService } from '@solarfertigation-uiproject/repository';

export default {
  title: 'Components/Culture/List',
  component: CultureListComponent
} as Meta;

export const Default = () => ({
  component: CultureListComponent,
  providers: [CultureRepositoryService],
  props: {
    cultures: new CultureRepositoryService().getAllCultures()
  }
});

export const Empty = () => ({
  component: CultureListComponent,
  props: {
    cultures: []
  }
});
```

### Card Macchina

```typescript
import { Meta } from '@storybook/angular';
import { MachineCardComponent } from './machine-card.component';
import { MachineRepositoryService } from '@solarfertigation-uiproject/repository';

export default {
  title: 'Components/Machine/Card',
  component: MachineCardComponent
} as Meta;

const machineRepo = new MachineRepositoryService();

export const Active = () => ({
  component: MachineCardComponent,
  props: {
    machine: machineRepo.getMachineById('machine1'), // Macchina attiva
    fertilizers: machineRepo.getFertilizersByMachine('machine1')
  }
});

export const WithAlarm = () => ({
  component: MachineCardComponent,
  props: {
    machine: machineRepo.getMachineById('machine2'), // Macchina con allarme
    fertilizers: machineRepo.getFertilizersByMachine('machine2')
  }
});
```

## Comandi Utili

```bash
# Avviare Storybook in modalità sviluppo
nx run ui:storybook

# Buildare Storybook per la produzione
nx run ui:build-storybook

# Generare una nuova storia
nx g @nx/angular:stories --project=ui
```
