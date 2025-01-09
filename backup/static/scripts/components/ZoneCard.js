/**
 * Classe che rappresenta una card di zona nel sistema di irrigazione
 * @class ZoneCard
 */
class ZoneCard {
    /**
     * Crea una nuova istanza di ZoneCard
     * @param {Object} zoneData - Dati della zona
     * @param {number} zoneData.number - Numero della zona
     * @param {string} zoneData.name - Nome della coltura
     * @param {string} [zoneData.status] - Stato corrente della zona
     * @param {boolean} [zoneData.hasAlarm] - Indica se la zona ha un allarme attivo
     */
    constructor(zoneData) {
        this.zoneData = zoneData;
        this.element = null;
        
        // Definizione degli stati possibili della zona
        this.possibleStates = [
            'irrigazione_zona',
            'lavorazione_terreno',
            'raccolta_frutto',
            'inizio_coltura'
        ];
        
        // Mappa dei colori per i diversi stati
        this.statusColors = {
            'irrigazione_zona': '#3785B1',    // Blu
            'lavorazione_terreno': '#8B4513', // Marrone
            'raccolta_frutto': '#28a745',     // Verde
            'inizio_coltura': '#FF8C00',      // Arancione
            'default': '#6c757d'              // Grigio per stati non mappati
        };

        // Mappa delle icone per i diversi stati
        this.statusIcons = {
            'irrigazione_zona': 'assets/icons/drop_icon.png',
            'lavorazione_terreno': 'assets/icons/tractor_icon.png',
            'raccolta_frutto': 'assets/icons/harvest_icon.png',
            'inizio_coltura': 'assets/icons/seed_icon.png',  // Assumiamo ci sia un'icona per questo stato
            'default': 'assets/icons/default_icon.png'
        };

        // Se non è stato fornito uno stato, ne generiamo uno casuale
        if (!this.zoneData.status) {
            this.zoneData.status = this.getRandomState();
        }
    }

    /**
     * Genera uno stato casuale per la zona
     * @returns {string} Uno stato casuale tra quelli possibili
     * @private
     */
    getRandomState() {
        const randomIndex = Math.floor(Math.random() * this.possibleStates.length);
        return this.possibleStates[randomIndex];
    }

    /**
     * Converte il codice stato nel testo da visualizzare
     * @param {string} status - Codice dello stato
     * @returns {string} Testo formattato dello stato
     * @private
     */
    getStatusText(status) {
        const statusMap = {
            'irrigazione_zona': 'Irrigazione Zona',
            'lavorazione_terreno': 'Lavorazione Terreno',
            'raccolta_frutto': 'Raccolta Frutto',
            'inizio_coltura': 'Inizio Coltura',
            'default': 'Stato Non Definito'
        };
        return statusMap[status] || statusMap.default;
    }

    /**
     * Aggiorna lo stato della zona
     * @param {string} newStatus - Nuovo stato da impostare
     * @public
     */
    updateStatus(newStatus) {
        if (this.element) {
            const statusBadge = this.element.querySelector('.status-badge');
            if (statusBadge) {
                // Aggiorna l'icona
                const statusIcon = statusBadge.querySelector('.status-icon');
                if (statusIcon) {
                    statusIcon.src = this.statusIcons[newStatus] || this.statusIcons.default;
                    statusIcon.alt = this.getStatusText(newStatus);
                }
                
                // Aggiorna il testo
                const statusText = statusBadge.querySelector('span');
                if (statusText) {
                    statusText.textContent = this.getStatusText(newStatus);
                }
                
                // Aggiorna il colore di sfondo
                const statusColor = this.statusColors[newStatus] || this.statusColors.default;
                statusBadge.style.backgroundColor = statusColor;
            }
        }
    }

    /**
     * Simula un cambio di stato casuale
     * Questo metodo è solo per demo e dovrebbe essere rimosso in produzione
     * @public
     */
    simulateRandomStatusChange() {
        const newStatus = this.getRandomState();
        this.updateStatus(newStatus);
    }

    render() {
        const card = document.createElement('div');
        card.className = 'zone-card';
        card.dataset.zone = this.zoneData.number;

        // Header
        card.appendChild(this.createHeader());

        // Immagine con titolo
        card.appendChild(this.createImageSection());

        // Weather data
        card.appendChild(this.createWeatherData());

        // Footer
        card.appendChild(this.createFooter());

        this.element = card;

        // TODO: Solo per demo - Aggiorna lo stato casualmente ogni 5 secondi
        // In produzione, questo dovrebbe essere sostituito con gli aggiornamenti dal backend
        setInterval(() => this.simulateRandomStatusChange(), 5000);

        return card;
    }

    createHeader() {
        const header = document.createElement('div');
        header.className = 'zone-header';

        // Zona numero
        const number = document.createElement('div');
        number.className = 'zone-number';
        number.textContent = `Zona ${this.zoneData.number}`;

        // Status bar
        const statusBar = document.createElement('div');
        statusBar.className = 'zone-status-bar';

        const statusBadge = document.createElement('div');
        statusBadge.className = 'status-badge';
        
        // Crea l'icona di stato
        const statusIcon = document.createElement('img');
        statusIcon.className = 'status-icon';
        
        // Usa lo stato dalla zoneData o un valore di default
        const currentStatus = this.zoneData.status || 'default';
        
        // Imposta il testo dello stato
        const statusText = document.createElement('span');
        statusText.textContent = this.getStatusText(currentStatus);
        
        // Imposta l'icona dello stato
        statusIcon.src = this.statusIcons[currentStatus] || this.statusIcons.default;
        statusIcon.alt = this.getStatusText(currentStatus);
        
        // Applica il colore corrispondente allo stato
        const statusColor = this.statusColors[currentStatus] || this.statusColors.default;
        statusBadge.style.backgroundColor = statusColor;

        // Assembla il badge di stato
        statusBadge.appendChild(statusIcon);
        statusBadge.appendChild(statusText);

        const alarmIcons = document.createElement('div');
        alarmIcons.className = 'alarm-icons';
        
        const icon = document.createElement('img');
        icon.className = 'alarm-icon';
        
        const alarmStatus = this.zoneData.hasAlarm ? 'active' : 'inactive';
        icon.src = `assets/icons/alarm_${alarmStatus}_icon.png`;
        icon.alt = `Allarme ${alarmStatus === 'active' ? 'Attivo' : 'Inattivo'}`;
        
        alarmIcons.appendChild(icon);

        statusBar.appendChild(statusBadge);
        statusBar.appendChild(alarmIcons);

        header.appendChild(number);
        header.appendChild(statusBar);

        return header;
    }

    createImageSection() {
        const container = document.createElement('div');
        container.className = 'zone-image-container';

        const imageWrapper = document.createElement('div');
        imageWrapper.className = 'zone-image';

        const img = document.createElement('img');
        img.src = this.zoneData.image;
        img.alt = this.zoneData.name;

        const title = document.createElement('div');
        title.className = 'zone-title';
        title.textContent = this.zoneData.name;

        imageWrapper.appendChild(img);
        container.appendChild(imageWrapper);
        container.appendChild(title);

        return container;
    }

    createWeatherData() {
        const weather = document.createElement('div');
        weather.className = 'weather-data';

        // Temperatura
        const temp = this.createWeatherItem(
            'assets/icons/temperature_icon.png',
            `${this.zoneData.temperature}°`,
            'Temperatura'
        );

        // Umidità
        const humidity = this.createWeatherItem(
            'assets/icons/humidity_icon.png',
            `${this.zoneData.humidity}%`,
            'Umidità'
        );

        // Irrigazione
        const irrigation = this.createWeatherItem(
            'assets/icons/radiations_icon.png',
            `${this.zoneData.irrigation} W/m`,
            'Irrigazione'
        );

        weather.appendChild(temp);
        weather.appendChild(humidity);
        weather.appendChild(irrigation);

        return weather;
    }

    createWeatherItem(iconSrc, value, alt) {
        const item = document.createElement('div');
        item.className = 'weather-item';

        const icon = document.createElement('img');
        icon.className = 'weather-icon';
        icon.src = iconSrc;
        icon.alt = alt;

        const valueSpan = document.createElement('span');
        valueSpan.className = 'weather-value';
        valueSpan.textContent = value;

        item.appendChild(icon);
        item.appendChild(valueSpan);

        return item;
    }

    createFooter() {
        const footer = document.createElement('div');
        footer.className = 'zone-footer';

        const actions = [
            { icon: 'assets/icons/add_activity_icon.png', title: 'Aggiungi Attività' },
            { icon: 'assets/icons/detail_Icon.png', title: 'Dettaglio' },
            { icon: 'assets/icons/config_icon.png', title: 'Configurazione' },
            { icon: 'assets/icons/report_icon.png', title: 'Report' }
        ];

        actions.forEach(action => {
            const button = document.createElement('button');
            button.className = 'zone-action';
            button.title = action.title;

            const icon = document.createElement('img');
            icon.src = action.icon;
            icon.alt = action.title;

            button.appendChild(icon);
            footer.appendChild(button);
        });

        return footer;
    }

    updateWeatherData(newData) {
        if (this.element) {
            const values = this.element.querySelectorAll('.weather-value');
            
            if (newData.temperature !== undefined) {
                values[0].textContent = `${newData.temperature}°`;
            }
            if (newData.humidity !== undefined) {
                values[1].textContent = `${newData.humidity}%`;
            }
            if (newData.irrigation !== undefined) {
                values[2].textContent = `${newData.irrigation} W/m`;
            }
        }
    }
}
