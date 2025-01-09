import { BaseEntity } from './base.entities';

export type MachineStatus = 'active' | 'inactive' | 'alarm';

export interface Machine extends BaseEntity {
    code: string;           // es: SFUC01
    name: string;          // es: Macchina 1
    status: MachineStatus;
    zoneId: string;
    hasAlarm: boolean;
    icon?: string;
}

export interface Fertilizer extends BaseEntity {
    name: string;          // es: NPK
    currentLevel: number;  // percentuale attuale (0-100)
    machineId: string;    // riferimento alla macchina
    color?: string;       // colore per la visualizzazione
}
