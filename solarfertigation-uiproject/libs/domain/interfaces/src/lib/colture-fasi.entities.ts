import { BaseEntity } from './base.entities';

export type PhaseStatus = 'completed' | 'active' | 'pending';

export interface CulturaFase extends BaseEntity {
    name: string;
    startDate: string | null;
    endDate: string | null;
    status: PhaseStatus;
    cultureId: string;
    notes?: string;
}