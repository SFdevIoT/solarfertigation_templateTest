// Dati di esempio
const zonesData = [
    {
        number: 1,
        name: 'Pomodoro',
        status: 'In produzione',
        image: 'assets/img/colture/pomodoro.png',
        temperature: 15,
        humidity: 50,
        irrigation: 10
    },
    {
        number: 2,
        name: 'Fagiolino',
        status: 'In produzione',
        image: 'assets/img/colture/fagiolino.png',
        temperature: 15,
        humidity: 50,
        irrigation: 10
    },
    {
        number: 3,
        name: 'Cornaletto',
        status: 'In produzione',
        image: 'assets/img/colture/cornaletto.png',
        temperature: 15,
        humidity: 50,
        irrigation: 10
    }
];

// Inizializzazione dell'applicazione
document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.zones-container');
    const zoneCards = [];

    // Creazione delle card
    zonesData.forEach(zoneData => {
        const card = new ZoneCard(zoneData);
        container.appendChild(card.render());
        zoneCards.push(card);
    });

    // Esempio di aggiornamento dinamico
    // Simula l'aggiornamento dei dati ogni 10 secondi
    setInterval(() => {
        zoneCards.forEach(card => {
            // Simula cambiamenti random nei valori
            const newStatus = {
                temperature: Math.floor(Math.random() * 10 + 15),  // 15-25°
                humidity: Math.floor(Math.random() * 30 + 40),     // 40-70%
                irrigation: Math.floor(Math.random() * 5 + 8)      // 8-13 W/m
            };
            card.updateStatus(newStatus);
        });
    }, 10000);
});
