# Changelog

## [2025-01-09] - Refactoring Componenti UI e Standardizzazione Naming

### Modifiche
- Aggiornate le interfacce dei componenti per utilizzare `EventEmitter` invece di funzioni callback
- Standardizzata la nomenclatura dei componenti e delle interfacce
- Risolti problemi di configurazione Storybook

### Dettagli delle Modifiche

#### Interfacce
- `attivita.types.ts`: Aggiornate le interfacce per usare `EventEmitter`
  - `SelettoreDataProps`
  - `ListaCategorieProps`
  - `DettaglioAttivitaProps`

#### Componenti
- `ActivityCategoryListComponent`: Aggiornato per implementare la nuova interfaccia
- `ActivityDateSelectorComponent`: Aggiornato per implementare la nuova interfaccia
- `CardMacchinaComponent`: Rimossa configurazione ChangeDetection non necessaria

#### Storybook
- Aggiornati i percorsi di configurazione in `project.json`
- Corretti i percorsi per puntare a `libs/ui-components/.storybook`

### Convenzioni di Naming Stabilite
- Nomi di file e cartelle in italiano per i domini funzionali
- Nomi di componenti e classi in inglese
- Interfacce e tipi di dominio in italiano

### Note Tecniche
- La configurazione di Storybook è stata semplificata
- Rimossi riferimenti circolari tra i moduli
- Migliorata la type safety attraverso l'uso di interfacce ben definite
