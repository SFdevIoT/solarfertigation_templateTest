/**
 * Gestione dello stato dell'applicazione
 */
class AppState {
    constructor() {
        this.state = {
            currentView: null,
            selectedZone: null,
            selectedMachine: null,
            currentActivity: null
        };
        this.listeners = new Set();
    }

    /**
     * Aggiorna lo stato
     * @param {Object} newState - Nuovo stato da applicare
     */
    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.notifyListeners();
    }

    /**
     * Aggiunge un listener per i cambiamenti di stato
     * @param {Function} listener - Funzione da chiamare quando lo stato cambia
     */
    addListener(listener) {
        this.listeners.add(listener);
    }

    /**
     * Rimuove un listener
     * @param {Function} listener - Listener da rimuovere
     */
    removeListener(listener) {
        this.listeners.delete(listener);
    }

    /**
     * Notifica tutti i listener del cambiamento di stato
     */
    notifyListeners() {
        this.listeners.forEach(listener => listener(this.state));
    }
}

// Crea un'istanza globale dello stato
const appState = new AppState();
