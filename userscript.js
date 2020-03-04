// ==UserScript==
// @name         CostAllocations
// @namespace    https://allocation-costs.my-ideas.it/
// @version      0.1
// @description  Semplifica la getione dei cost center e tags su fatture in cloud
// @author       Tommaso Doninelli
// @match        https://secure.fattureincloud.it/expenses*
// @grant        none
// ==/UserScript==

(function() {
    ///////////////////
    // CONFIGURATION //
    ///////////////////

    /*
       Serve a distinguere i costi fissi dai costi variabili
       Dai costi fissi scorporo il costo del personale **dipendente**, le consulezne esterne non continuative non sono dipendenti
    */
    const cost_categories = [
        '',
        'Other Fixed',
        'Personell',
        'COGS'          // Direct costs attributable to the sold goods: Packaging, Shipping, Direct Marketing costs (CAC).
    ];

    /* Mi serve a rispondere alla domanda "quanto ho speso" e lo uso per macro area di reportistica */
    const cost_centers = [
        '',
        'G&A',           // Travel Expenses, productivity tools, legals and accountants
        'Marketing',     // Online and offline. Add info to the notes
        'R&D'            // Tech equipment, Cloud and Services (if fixed), External Workforce
    ];

    /* TAGS per reportistica piu' di dettaglio "interna" */
    const tags = [
        '',
        'consulting',
        'productivity tools', // Office HubSpot, JIRA
        'office/rents/utilities',
        'cloud services - IAAS',
    ];


    pippo(cost_categories, 'Categoria:', 'category');
    pippo(cost_centers, 'costo (?):', 'cost_center');
    pippo(tags, 'Descrizione:', 'description');

    function pippo(values, labelText, targetId){
        const opions = values.map(tag => {
            return `<option value="${tag}">${tag}</option>`;
        });
        const id = `pippo_${parseInt(Math.random()*100000)}`;
        $(`label:contains("${labelText}")`).after(`<select id="${id}">${opions.join('')}</select>`)
        $(`#${id}`).change(function(e){
            $(`#${targetId}`).val("['" + $(`#${id}`).val() + "']");
        });
    }

})();