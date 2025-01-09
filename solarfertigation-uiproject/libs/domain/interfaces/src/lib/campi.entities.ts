import { BaseEntity } from './base.entities';

export interface Campo extends BaseEntity {
    name: string;          // es: Campo A3
    code: string;         // es: A3
    zoneId: string;
    area?: number;        // in metri quadri
    description?: string;
    density?: string;     // densità di default per il campo
    status: 'active' | 'inactive';
}