import { BaseEntity } from './base.entities';

export type ActivityStatus = 'planned' | 'in-progress' | 'completed' | 'cancelled';

export interface Activity extends BaseEntity {
    zoneId: string;
    campoId: string;
    startDate: string;
    endDate?: string;
    status: ActivityStatus;
    notes?: string[];
}