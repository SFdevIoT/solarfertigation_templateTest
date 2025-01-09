import { Machine, Fertilizer } from '@solarfertigation-uiproject/domain/interfaces';

export const machineMockData: Record<string, Machine> = {
    'SFUC01': {
        id: 'machine1',
        code: 'SFUC01',
        name: 'Macchina 1',
        status: 'active',
        zoneId: 'zone1',
        hasAlarm: false,
        icon: 'assets/icons/machine.png',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    'SFUC02': {
        id: 'machine2',
        code: 'SFUC02',
        name: 'Macchina 2',
        status: 'inactive',
        zoneId: 'zone2',
        hasAlarm: true,
        icon: 'assets/icons/machine.png',
        createdAt: new Date(),
        updatedAt: new Date()
    }
};

export const fertilizerMockData: Record<string, Fertilizer> = {
    'fert1': {
        id: 'fert1',
        name: 'NPK',
        currentLevel: 75,
        machineId: 'machine1',
        color: '#28a745',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    'fert2': {
        id: 'fert2',
        name: 'Azoto',
        currentLevel: 45,
        machineId: 'machine1',
        color: '#007bff',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    'fert3': {
        id: 'fert3',
        name: 'Fosforo',
        currentLevel: 30,
        machineId: 'machine2',
        color: '#dc3545',
        createdAt: new Date(),
        updatedAt: new Date()
    }
};
