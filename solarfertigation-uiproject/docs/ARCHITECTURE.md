# Architettura SolarFertigation UI

## Struttura del Progetto

Il progetto è organizzato come una monorepo NX con la seguente struttura:

```
solarfertigation-uiproject/
├── libs/
│   ├── ui-components/       # Libreria di componenti UI riutilizzabili
│   │   ├── src/
│   │   │   └── lib/
│   │   │       ├── components/
│   │   │       │   ├── Attività/    # Componenti per la gestione delle attività
│   │   │       │   └── Macchine/    # Componenti per la gestione delle macchine
│   │   │       └── interfaces/      # Definizioni dei tipi e interfacce
│   │   └── .storybook/            # Configurazione Storybook
│   ├── domain/             # Modelli e interfacce di dominio
│   └── repository/         # Servizi per l'accesso ai dati
└── src/                    # Applicazione principale
```

## Convenzioni di Naming

### File e Cartelle
- I nomi delle cartelle principali che rappresentano domini funzionali sono in italiano (es: `Attività`, `Macchine`)
- I nomi dei file seguono il pattern: `nome-componente.tipo.ts` (es: `activity-category-list.component.ts`)

### Codice
- Le interfacce e i tipi che rappresentano concetti di dominio sono in italiano (es: `CategoriaAttivita`, `SelettoreDataProps`)
- I nomi dei componenti Angular e le classi sono in inglese (es: `ActivityCategoryListComponent`)
- I nomi delle proprietà e dei metodi interni ai componenti sono in italiano quando rappresentano concetti di dominio

## Componenti UI

### Gestione Attività

#### ActivityCategoryListComponent
- **Selector**: `sf-activity-category-list`
- **Props**:
  - `categoriaSelezionata?: CategoriaAttivita`
  - `onSelect: EventEmitter<CategoriaAttivita>`

#### ActivityDateSelectorComponent
- **Selector**: `sf-activity-date-selector`
- **Props**:
  - `dataSelezionata: Date`
  - `onChange: EventEmitter<Date>`

### Gestione Macchine

#### CardMacchinaComponent
- **Selector**: `sf-card-macchina`
- **Props**:
  - `machine: Machine`
  - `onSelect: EventEmitter<Machine>`

## Pattern e Best Practices

1. **Componenti Presentazionali**
   - I componenti sono progettati per essere presentazionali (dumb components)
   - Utilizzano EventEmitter per la comunicazione con i componenti parent
   - Non contengono logica di business

2. **Tipizzazione**
   - Uso estensivo di TypeScript per la type safety
   - Interfacce separate per props dei componenti
   - Tipi di dominio ben definiti

3. **Storybook**
   - Ogni componente ha le sue stories per la documentazione
   - Le stories mostrano i diversi stati dei componenti
   - Utilizzato per lo sviluppo e il testing visuale
