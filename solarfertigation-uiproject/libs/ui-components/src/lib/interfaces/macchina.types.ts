import { Machine } from '@solarfertigation-uiproject/domain/interfaces';

export interface CardMacchinaProps {
  macchina: Machine;
  onSelect?: (macchina: Machine) => void;
  selezionata?: boolean;
}

export interface StatoMacchinaProps {
  stato: Machine['status'];
  dimensione?: 'small' | 'medium' | 'large';
}
