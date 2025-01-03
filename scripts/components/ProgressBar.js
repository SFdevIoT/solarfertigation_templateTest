class ProgressBar {
    constructor(color, percentage, capacity) {
        this.color = color;
        this.percentage = percentage;
        this.capacity = capacity;
    }

    /**
     * Crea l'elemento DOM della barra di progressione
     * @returns {HTMLElement}
     */
    render() {
        const barContainer = document.createElement('div');
        barContainer.className = `bar-container fert-${this.color}`;

        const verticalBar = document.createElement('div');
        verticalBar.className = 'vertical-bar';

        const verticalFill = document.createElement('div');
        verticalFill.className = 'vertical-fill';
        verticalFill.style.height = `${this.percentage}%`;

        const valuesContainer = document.createElement('div');
        valuesContainer.className = 'values-container';

        const percentageSpan = document.createElement('span');
        percentageSpan.className = 'fert-percentage';
        percentageSpan.textContent = `${this.percentage}%`;

        const capacitySpan = document.createElement('span');
        capacitySpan.className = 'fert-capacity';
        capacitySpan.textContent = `${this.capacity} L`;

        verticalBar.appendChild(verticalFill);
        valuesContainer.appendChild(percentageSpan);
        valuesContainer.appendChild(capacitySpan);
        
        barContainer.appendChild(verticalBar);
        barContainer.appendChild(valuesContainer);

        return barContainer;
    }

    /**
     * Aggiorna il valore della barra di progressione
     * @param {number} newPercentage 
     */
    updateProgress(newPercentage) {
        this.percentage = newPercentage;
        const bar = this.element.querySelector('.vertical-fill');
        const percentageSpan = this.element.querySelector('.fert-percentage');
        
        bar.style.height = `${newPercentage}%`;
        percentageSpan.textContent = `${newPercentage}%`;
    }

    /**
     * Aggiorna la capacità del fertilizzante
     * @param {number} newCapacity 
     */
    updateCapacity(newCapacity) {
        this.capacity = newCapacity;
        const capacitySpan = this.element.querySelector('.fert-capacity');
        capacitySpan.textContent = `${newCapacity} L`;
    }
}
