class FertilizerCard {
    constructor(machineData) {
        this.machineData = machineData;
        this.element = null;
        this.fertilizers = [];
    }

    /**
     * Crea l'elemento DOM della card
     * @returns {HTMLElement}
     */
    render() {
        const card = document.createElement('div');
        card.className = 'card';

        // Header
        card.appendChild(this.createHeader());

        // Body
        card.appendChild(this.createBody());

        // Footer
        card.appendChild(this.createFooter());

        this.element = card;
        return card;
    }

    /**
     * Crea l'header della card
     * @returns {HTMLElement}
     */
    createHeader() {
        const header = document.createElement('div');
        header.className = 'card-header';

        const headerLeft = document.createElement('div');
        headerLeft.className = 'header-left';

        const title = document.createElement('span');
        title.className = 'machine-title';
        title.textContent = `${this.machineData.name} (${this.machineData.id})`;

        const statusContainer = document.createElement('div');
        statusContainer.className = 'status-container';

        const status = document.createElement('span');
        status.className = `machine-status ${this.machineData.isActive ? 'active' : 'inactive'}`;
        status.textContent = this.machineData.statusText;

        const alarmIcon = document.createElement('img');
        alarmIcon.className = 'alarm-icon';
        alarmIcon.src = this.machineData.isActive ? 'assets/icons/alarm_active_icon.png' : 'assets/icons/alarm_inactive_icon.png';
        alarmIcon.alt = this.machineData.isActive ? 'Allarme Attivo' : 'Allarme Inattivo';

        const machineIcon = document.createElement('img');
        machineIcon.className = 'machine-icon';
        machineIcon.src = 'assets/icons/icona-macchina.png';
        machineIcon.alt = 'Icona Macchina';

        statusContainer.appendChild(status);
        statusContainer.appendChild(alarmIcon);
        headerLeft.appendChild(title);
        headerLeft.appendChild(statusContainer);

        header.appendChild(headerLeft);
        header.appendChild(machineIcon);

        return header;
    }

    /**
     * Crea il body della card con i fertilizzanti
     * @returns {HTMLElement}
     */
    createBody() {
        const body = document.createElement('div');
        body.className = 'card-body';

        const fertilizers = document.createElement('div');
        fertilizers.className = 'fertilizers';

        // Header fertilizzanti
        const fertHeader = document.createElement('div');
        fertHeader.className = 'fertilizers-header';

        const title = document.createElement('span');
        title.className = 'fertilizers-title';
        title.textContent = 'Fertilizzanti';

        const configBtn = document.createElement('button');
        configBtn.className = 'fertilizers-config';
        configBtn.title = 'Gestione fertilizzanti';

        const configIcon = document.createElement('img');
        configIcon.src = 'assets/icons/settings_icon.png';
        configIcon.alt = 'Configurazione fertilizzanti';

        configBtn.appendChild(configIcon);
        fertHeader.appendChild(title);
        fertHeader.appendChild(configBtn);
        fertilizers.appendChild(fertHeader);

        // Aggiunta fertilizzanti
        this.machineData.fertilizers.forEach(fert => {
            const fertItem = this.createFertilizerItem(fert);
            fertilizers.appendChild(fertItem);
        });

        body.appendChild(fertilizers);
        return body;
    }

    /**
     * Crea un singolo elemento fertilizzante
     * @param {Object} fertData 
     * @returns {HTMLElement}
     */
    createFertilizerItem(fertData) {
        const item = document.createElement('div');
        item.className = 'fert-item';

        // Creazione barra di progressione
        const progressBar = new ProgressBar(
            fertData.color,
            fertData.percentage,
            fertData.capacity
        );
        this.fertilizers.push(progressBar);
        
        const progressElement = progressBar.render();
        
        const label = document.createElement('span');
        label.className = 'fert-label';
        label.textContent = fertData.label;

        item.appendChild(progressElement);
        item.appendChild(label);

        return item;
    }

    /**
     * Crea il footer della card
     * @returns {HTMLElement}
     */
    createFooter() {
        const footer = document.createElement('div');
        footer.className = 'card-footer';

        const buttons = [
            { title: 'Dettaglio', icon: 'assets/icons/detail_Icon.png' },
            { title: 'Configurazione', icon: 'assets/icons/config_icon.png' },
            { title: 'Report', icon: 'assets/icons/report_icon.png' }
        ];

        buttons.forEach(btn => {
            const button = document.createElement('button');
            button.className = 'btn';
            button.title = btn.title;

            const icon = document.createElement('img');
            icon.src = btn.icon;
            icon.alt = btn.title;

            button.appendChild(icon);
            footer.appendChild(button);
        });

        return footer;
    }

    /**
     * Aggiorna lo stato della macchina
     * @param {Object} newStatus 
     */
    updateStatus(newStatus) {
        const statusElement = this.element.querySelector('.machine-status');
        const alarmIcon = this.element.querySelector('.alarm-icon');

        statusElement.className = `machine-status ${newStatus.isActive ? 'active' : 'inactive'}`;
        statusElement.textContent = newStatus.statusText;
        
        alarmIcon.src = newStatus.isActive ? 'assets/icons/alarm_active_icon.png' : 'assets/icons/alarm_inactive_icon.png';
        alarmIcon.alt = newStatus.isActive ? 'Allarme Attivo' : 'Allarme Inattivo';
    }

    /**
     * Aggiorna i valori di un fertilizzante
     * @param {number} index 
     * @param {Object} newData 
     */
    updateFertilizer(index, newData) {
        if (this.fertilizers[index]) {
            if (newData.percentage !== undefined) {
                this.fertilizers[index].updateProgress(newData.percentage);
            }
            if (newData.capacity !== undefined) {
                this.fertilizers[index].updateCapacity(newData.capacity);
            }
        }
    }
}
