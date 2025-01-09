import { BaseEntity } from './base.entities';

export interface Zone extends BaseEntity {
    name: string;
    type: string;
    description?: string;
}