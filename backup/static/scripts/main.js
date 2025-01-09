// Dati di esempio
const machinesData = [
    {
        id: 'SFUC01',
        name: 'Macchina 1',
        isActive: true,
        statusText: 'Irrigazione in corso',
        fertilizers: [
            {
                label: 'F1',
                color: 'green',
                percentage: 75,
                capacity: 100
            },
            {
                label: 'Azoto',
                color: 'yellow',
                percentage: 45,
                capacity: 50
            },
            {
                label: 'F3',
                color: 'orange',
                percentage: 10,
                capacity: 10
            }
        ]
    },
    {
        id: 'SFUC02',
        name: 'Macchina 2',
        isActive: false,
        statusText: 'Mancato collegamento',
        fertilizers: [
            {
                label: 'Potassio',
                color: 'blue',
                percentage: 65,
                capacity: 120
            },
            {
                label: 'F2',
                color: 'red',
                percentage: 5,
                capacity: 100
            },
            {
                label: 'Magnesio',
                color: 'green',
                percentage: 100,
                capacity: 200
            }
        ]
    }
];

// Inizializzazione dell'applicazione
document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.card-container');
    const cards = [];

    // Creazione delle card
    machinesData.forEach(machineData => {
        const card = new FertilizerCard(machineData);
        container.appendChild(card.render());
        cards.push(card);
    });

    // Esempio di aggiornamento dinamico
    // Simula l'aggiornamento dei dati ogni 5 secondi
    setInterval(() => {
        cards.forEach((card, index) => {
            // Simula cambiamenti random nei valori
            card.machineData.fertilizers.forEach((fert, fertIndex) => {
                const newPercentage = Math.floor(Math.random() * 100);
                card.updateFertilizer(fertIndex, { percentage: newPercentage });
            });
        });
    }, 5000);
});
