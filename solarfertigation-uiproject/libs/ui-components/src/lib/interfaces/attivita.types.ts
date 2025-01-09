import { CulturaFase } from '@solarfertigation-uiproject/domain/interfaces';
import { EventEmitter } from '@angular/core';

export type CategoriaAttivita = 'irrigazione' | 'lavorazioni' | 'difesa' | 'fase-coltivazione' | 'altro';

export interface CategoriaAttivitaItem {
  id: CategoriaAttivita;
  nome: string;
  icona: string;
}

export interface SelettoreDataProps {
  dataSelezionata: Date;
  onChange: EventEmitter<Date>;
}

export interface ListaCategorieProps {
  categoriaSelezionata?: CategoriaAttivita;
  onSelect: EventEmitter<CategoriaAttivita>;
}

export interface DettaglioAttivitaProps {
  categoria: CategoriaAttivita;
  fasi?: CulturaFase[];
  faseSelezionata?: CulturaFase;
  onFaseSelect: EventEmitter<CulturaFase>;
}

// Costanti UI
export const CATEGORIE_ATTIVITA: CategoriaAttivitaItem[] = [
  {
    id: 'irrigazione',
    nome: 'Irrigazione',
    icona: 'water_drop'
  },
  {
    id: 'lavorazioni',
    nome: 'Lavorazioni',
    icona: 'agriculture'
  },
  {
    id: 'difesa',
    nome: 'Difesa',
    icona: 'medical_services'
  },
  {
    id: 'fase-coltivazione',
    nome: 'Fase Coltivazione',
    icona: 'eco'
  },
  {
    id: 'altro',
    nome: 'Altro',
    icona: 'more_horiz'
  }
];
