import { EventEmitter } from '@angular/core';

export interface Machine {
  id: string;
  name: string;
  isActive: boolean;
  statusText: string;
  fertilizers: {
    label: string;
    percentage: number;
    capacity: number;
    color: string;
  }[];
}

export interface CardMacchinaProps {
  machine: Machine;
  onSelect: EventEmitter<Machine>;
}