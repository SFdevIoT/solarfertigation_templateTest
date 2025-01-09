/**
 * Carica un template HTML nel contenitore principale
 * @param {string} templateName - Nome del file template da caricare
 */
function loadTemplate(templateName) {
    const mainContent = document.getElementById('main-content');
    if (!mainContent) return;

    fetch(templateName)
        .then(response => response.text())
        .then(html => {
            // Estrai solo il contenuto del body
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;
            const bodyContent = tempDiv.querySelector('body');
            
            if (bodyContent) {
                mainContent.innerHTML = bodyContent.innerHTML;
                
                // Esegui gli script inclusi nel template
                bodyContent.querySelectorAll('script').forEach(script => {
                    const newScript = document.createElement('script');
                    Array.from(script.attributes).forEach(attr => {
                        newScript.setAttribute(attr.name, attr.value);
                    });
                    newScript.textContent = script.textContent;
                    document.body.appendChild(newScript);
                });
            }
        })
        .catch(error => {
            console.error('Errore nel caricamento del template:', error);
            mainContent.innerHTML = '<p>Errore nel caricamento del contenuto</p>';
        });
}
