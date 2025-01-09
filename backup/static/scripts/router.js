/**
 * Router semplice per gestire la navigazione
 */
class Router {
    constructor() {
        this.routes = new Map();
        this.currentRoute = null;

        // Gestione del pulsante back del browser
        window.addEventListener('popstate', (e) => {
            if (e.state && e.state.route) {
                this.navigate(e.state.route, false);
            }
        });
    }

    /**
     * Aggiunge una rotta
     * @param {string} path - Percorso della rotta
     * @param {Function} handler - Funzione da eseguire quando la rotta è attiva
     */
    addRoute(path, handler) {
        this.routes.set(path, handler);
    }

    /**
     * Naviga a una rotta specifica
     * @param {string} path - Percorso della rotta
     * @param {boolean} [addToHistory=true] - Se aggiungere la rotta alla history del browser
     */
    navigate(path, addToHistory = true) {
        const handler = this.routes.get(path);
        if (handler) {
            if (addToHistory) {
                history.pushState({ route: path }, '', path);
            }
            this.currentRoute = path;
            handler();
        }
    }

    /**
     * Inizializza il router con la rotta corrente
     */
    init() {
        const path = window.location.pathname;
        this.navigate(path, false);
    }
}

// Crea un'istanza globale del router
const router = new Router();
