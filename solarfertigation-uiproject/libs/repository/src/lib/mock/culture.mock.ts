import { Coltura, CulturaFase } from '@solarfertigation-uiproject/domain/interfaces';

// Mock delle fasi per ogni coltura
export const culturePhaseMockData: Record<string, CulturaFase[]> = {
    'culture1': [
        {
            id: 'phase1',
            name: 'Trapianto',
            startDate: '15-12-2024',
            endDate: '15-12-2024',
            status: 'completed',
            cultureId: 'culture1',
            notes: 'Trapianto completato con successo',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 'phase2',
            name: 'Accrescimento vegetativo',
            startDate: '16-12-2024',
            endDate: null,
            status: 'active',
            cultureId: 'culture1',
            notes: 'Crescita regolare, monitorare irrigazione',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 'phase3',
            name: 'Induzione fiorale e fioritura',
            startDate: null,
            endDate: null,
            status: 'pending',
            cultureId: 'culture1',
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ]
};

// Mock delle colture
export const cultureMockData: Coltura[] = [
    {
        id: 'culture1',
        name: 'Pomodoro San Marzano',
        type: 'TA',
        typeName: 'Trapianto Annuale',
        icon: 'tomato',
        variety: 'San Marzano',
        campoId: 'campo1',
        zoneId: 'zone1',
        density: '3 piante/m²',
        plantingDate: '2024-12-15',
        harvestDate: '2025-07-30',
        createdAt: new Date(),
        updatedAt: new Date(),
        metadata: {
            irrigationNeeds: 'medium',
            fertilizationNeeds: 'high',
            phaseHistory: [
                {
                    phaseName: 'Trapianto',
                    completedAt: '2024-12-15',
                    notes: ['Trapianto eseguito in condizioni ottimali', 'Terreno ben preparato']
                }
            ],
            activities: [
                {
                    type: 'irrigazione',
                    date: '2024-12-16',
                    description: 'Irrigazione post-trapianto'
                },
                {
                    type: 'difesa',
                    date: '2024-12-20',
                    description: 'Trattamento preventivo fungicida'
                }
            ]
        }
    },
    {
        id: 'culture2',
        name: 'Lattuga Iceberg',
        type: 'TA',
        typeName: 'Trapianto Annuale',
        icon: 'lettuce',
        variety: 'Iceberg',
        campoId: 'campo2',
        zoneId: 'zone2',
        density: '8 piante/m²',
        plantingDate: '2024-12-01',
        harvestDate: '2025-02-15',
        createdAt: new Date(),
        updatedAt: new Date(),
        metadata: {
            irrigationNeeds: 'high',
            fertilizationNeeds: 'medium',
            phaseHistory: [
                {
                    phaseName: 'Trapianto',
                    completedAt: '2024-12-01',
                    notes: ['Alcune piante mostrano stress da trapianto']
                }
            ],
            activities: [
                {
                    type: 'irrigazione',
                    date: '2024-12-02',
                    description: 'Irrigazione abbondante post-trapianto'
                },
                {
                    type: 'lavorazioni',
                    date: '2024-12-05',
                    description: 'Sarchiatura interfilare'
                }
            ]
        }
    },
    {
        id: 'culture3',
        name: 'Vite Sangiovese',
        type: 'P',
        typeName: 'Coltura Pluriennale',
        icon: 'grape',
        variety: 'Sangiovese',
        campoId: 'campo3',
        zoneId: 'zone3',
        density: '2 piante/m²',
        plantingDate: '2023-02-15',
        harvestDate: '2024-09-15',
        createdAt: new Date(),
        updatedAt: new Date(),
        metadata: {
            irrigationNeeds: 'low',
            fertilizationNeeds: 'medium',
            phaseHistory: [
                {
                    phaseName: 'Potatura invernale',
                    completedAt: '2024-01-15',
                    notes: ['Potatura a Guyot semplice', 'Condizioni sanitarie ottimali']
                }
            ],
            activities: [
                {
                    type: 'lavorazioni',
                    date: '2024-01-20',
                    description: 'Legatura tralci'
                },
                {
                    type: 'difesa',
                    date: '2024-02-01',
                    description: 'Trattamento rameico'
                }
            ]
        }
    }
];
