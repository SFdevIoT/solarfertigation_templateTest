import { Campo } from '@solarfertigation-uiproject/domain/interfaces';

export const fieldMockData: Record<string, Campo> = {
    'A3': {
        id: 'field1',
        name: 'Campo A3',
        code: 'A3',
        zoneId: 'zone1',
        area: 5000,
        density: '3 piante/m²',
        status: 'active',
        description: 'Campo principale per pomodori',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    'B2': {
        id: 'field2',
        name: 'Campo B2',
        code: 'B2',
        zoneId: 'zone1',
        area: 7500,
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    'C1': {
        id: 'field3',
        name: 'Campo C1',
        code: 'C1',
        zoneId: 'zone2',
        area: 3000,
        density: '30 piante/m²',
        status: 'active',
        description: 'Campo per colture intensive',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    'ASEPA4': {
        id: 'field4',
        name: 'Campo Asepa - Zona 4',
        code: 'ASEPA4',
        zoneId: 'zone2',
        status: 'inactive',
        createdAt: new Date(),
        updatedAt: new Date()
    }
};
