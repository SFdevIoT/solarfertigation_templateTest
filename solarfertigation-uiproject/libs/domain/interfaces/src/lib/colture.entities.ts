import { BaseEntity } from './base.entities';

export type CultureType = 'SA' | 'SB' | 'TA' | 'TB' | 'P';

export interface Coltura extends BaseEntity {
    name: string;
    type: CultureType;
    typeName: string;
    icon: string;
    variety: string;
    campoId: string;
    zoneId: string;
    density: string;
    plantingDate: string;  // Data di semina/trapianto
    harvestDate?: string;  // Data prevista di raccolta (opzionale)
    metadata?: Record<string, unknown>;
}