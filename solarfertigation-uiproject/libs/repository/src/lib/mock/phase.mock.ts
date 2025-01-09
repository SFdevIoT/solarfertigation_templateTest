import { CultureType, CulturaFase } from '@solarfertigation-uiproject/domain/interfaces';

// Definizione delle fasi per tipo di coltura
export const phaseMockData: Record<CultureType, string[]> = {
    'SA': [
        'Germinazione',
        'Emergenza',
        'Accrescimento vegetativo',
        'Induzione fiorale',
        'Fioritura',
        'Allegagione',
        'Accrescimento dei frutti/semi',
        'Maturazione',
        'Raccolta',
        'Senescenza'
    ],
    'SB': [
        'Germinazione',
        'Emergenza',
        'Accrescimento vegetativo iniziale',
        'Entrata in dormienza',
        'Ripresa vegetativa',
        'Induzione fiorale',
        'Fioritura',
        'Allegagione',
        'Accrescimento dei frutti/semi',
        'Maturazione',
        'Raccolta',
        'Senescenza'
    ],
    'TA': [
        'Trapianto',
        'Adattamento post-trapianto',
        'Accrescimento vegetativo',
        'Induzione fiorale e fioritura',
        'Allegagione e accrescimento dei frutti/semi',
        'Maturazione',
        'Raccolta',
        'Senescenza'
    ],
    'TB': [
        'Trapianto',
        'Accrescimento vegetativo iniziale',
        'Accumulo di riserve',
        'Entrata in dormienza',
        'Ripresa vegetativa',
        'Induzione fiorale e fioritura',
        'Allegagione e accrescimento dei semi',
        'Maturazione dei semi',
        'Raccolta',
        'Senescenza'
    ],
    'P': [
        'Riposo vegetativo',
        'Ripresa vegetativa',
        'Germogliamento',
        'Fioritura',
        'Allegagione',
        'Accrescimento frutti',
        'Invaiatura',
        'Maturazione',
        'Raccolta',
        'Caduta foglie'
    ]
};

// Mock delle istanze di fase con attività e note dettagliate
export const phaseInstanceMockData: Record<string, CulturaFase[]> = {
    'culture1': [
        {
            id: 'phase1',
            name: 'Trapianto',
            startDate: '2024-12-15',
            endDate: '2024-12-15',
            status: 'completed',
            cultureId: 'culture1',
            notes: 'Trapianto completato con successo. Piantine in ottimo stato.',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 'phase2',
            name: 'Accrescimento vegetativo',
            startDate: '2024-12-16',
            endDate: null,
            status: 'active',
            cultureId: 'culture1',
            notes: 'Crescita regolare. Monitorare irrigazione e concimazione.',
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
    ],
    'culture2': [
        {
            id: 'phase4',
            name: 'Trapianto',
            startDate: '2024-12-01',
            endDate: '2024-12-01',
            status: 'completed',
            cultureId: 'culture2',
            notes: 'Trapianto eseguito. Alcune piante mostrano stress.',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 'phase5',
            name: 'Adattamento post-trapianto',
            startDate: '2024-12-02',
            endDate: '2024-12-10',
            status: 'completed',
            cultureId: 'culture2',
            notes: 'Fase di adattamento completata. Recupero dallo stress iniziale.',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 'phase6',
            name: 'Accrescimento vegetativo',
            startDate: '2024-12-11',
            endDate: null,
            status: 'active',
            cultureId: 'culture2',
            notes: 'Crescita regolare. Aumentare irrigazione.',
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ],
    'culture3': [
        {
            id: 'phase7',
            name: 'Riposo vegetativo',
            startDate: '2024-11-15',
            endDate: '2024-12-31',
            status: 'completed',
            cultureId: 'culture3',
            notes: 'Fase di riposo completata. Eseguita potatura invernale.',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 'phase8',
            name: 'Ripresa vegetativa',
            startDate: '2025-01-01',
            endDate: null,
            status: 'active',
            cultureId: 'culture3',
            notes: 'Inizio germogliamento. Monitorare temperature notturne.',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 'phase9',
            name: 'Germogliamento',
            startDate: null,
            endDate: null,
            status: 'pending',
            cultureId: 'culture3',
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ]
};
