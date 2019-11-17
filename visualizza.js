/**
 * Funzione per il caricamento a-sincrono di una risorsa
 * tramite una XML HTTP Request.
 *
 * @param {String} url - URL della risorsa da caricare
 * @param {loadCallback} success - funzione di callback invocata con il contenuto
 * @param {int} n - indica dove deve essere posizionato il grafico all'interno della pagina
 */
//Uguale a quella scritta dal prof sulle slide
function loadASync(url, success) {
    let xhr = new XMLHttpRequest();
    //url e' il file json che ho scelto di leggere
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
        if (this.readyState === 4)
            if (okStatus(this.status)) {
                //in caso di successo, passa alla funzione visualizza(che coincide con succeess) il testo contenente nell'URL
                success(this.responseText);
            } else {
                throw "Async request failed (response: " + this.status + ":" + this.statusText + ") for URL " + url;
            }
    };
    //viene mandata la richiesta, ma rimane attiva la funzione di callback che sta aspettando la risposta
    xhr.send();
}

/**
 * Una volta che readyState e' 'DONE', bisogna controllare se la risposta ricevuta e' corretta o senza modifiche.
 * In tal caso si prosegue, altrimenti c'e' stato un errore.
 * <ul>
 *    <li>{@code 200} : resource retrieved
 *    <li>{@code 304}: resource not modified  (this response is due to a conditional request)
 * </ul>
 *
 * @param {number} s - status code to be checked
 */
function okStatus(s) {
    return [200, 304].indexOf(s) >= 0;
}
var pubblicazioni;
var coautori;
var riviste;
function salvaPubblicazioni(data){
    pubblicazioni = JSON.parse(data);
    console.log(pubblicazioni);

    for (let i=0; i<pubblicazioni.length; i++){
        if(pubblicazioni[i].year===9999){
            pubblicazioni[i].year="In stampa"
        }
    }
    pubblicazioni.sort(function(a, b){
        if(typeof a.year == "string" && typeof b.year=="number"){
            return 1
        }
        if(typeof a.year == "number" && typeof b.year=="string"){
            return -1
        }
        return a.year-b.year
    });
}

function salvaCoautori(data){
    coautori = JSON.parse(data);

    for (let i=0; i<coautori.length; ++i) {
        if (coautori[i].year === 9999) {
            coautori[i].year = "In stampa"
        }
    }
    coautori.sort(function(a, b){
        if(typeof a.year == "string" && typeof b.year=="number"){
            return 1
        }
        if(typeof a.year == "number" && typeof b.year=="string"){
            return -1
        }
        return a.year-b.year
    });

}

function salvaRiviste(data){
    riviste = JSON.parse(data);
    console.log(riviste);
}

var opt={"actions": false};

function visualizza (data) {
    console.log(data);
    let json = JSON.parse(data);
    //console.log(json.title);

    if(json.id==1){
        vegaEmbed('#scatterplot', json, opt).then(res =>
            res.view
                .insert('myData',
                 //ci vuole  un array al posto delle quadre
           pubblicazioni)
                .run()
        );
    }

    if(json.id==2){
        vegaEmbed('#wordcloud', json, opt).then(res =>
            res.view
                .insert('table',
                 //ci vuole  un array al posto delle quadre
                    pubblicazioni)
                .run()
        );
    }
    if(json.id==3){
        vegaEmbed('#histogram1', json, opt).then(res =>
            res.view
                .insert('myData',
                    //ci vuole  un array al posto delle quadre
                    pubblicazioni)
                .run()
        );
    }

    if(json.id==4){
        vegaEmbed('#bubbleplot1', json, opt).then(res =>
            res.view
                .insert('myData', coautori)
                .run()
        );

    }

    if(json.id==5){
        vegaEmbed('#histogram2', json, opt).then(res =>
            res.view
                .insert('myData', riviste)
                .run()
        );
    }

    if (json.id==6){
        vegaEmbed('#bubbleplot2', json, opt).then(res =>
            res.view
                .insert('myData', riviste)
                .run()
        );
    }

}


//Come dovro'modificare la funzione seguente?
// 1)non sara piu' window.onload, ma sara' onsubmit o onclick del bottone del form
// 2)per gestire diverse chiamate dovro' sostituire i div che creo durante la chiamata precedente, per farlo ho tre idee:
//      -replaceChild
//      -removeChild e poi ricreo gli stessi div
//      -oppure creo i div fissi gia'  nell'html e poi riempio e svuoto questi div in base all'autore scelto

//in jQuery sarebbe: $(document).ready(function()); oppure in maniera piu' compatta:  $(function(){
window.onload = function () {

    loadASync("pubblicazioni1.json", salvaPubblicazioni);
    loadASync("coautoriProf1.json", salvaCoautori);
    loadASync("articoliInRivista1.json", salvaRiviste);

    setTimeout((


    loadASync("scatterPlot.json", visualizza),
    loadASync("wordCloud.json", visualizza),
    //significa che come file deve prendere quello nella stessa cartella di 'funzioni.js' e che in caso di 'success'===true allora deve entrare in visualizza
    loadASync("histogram1.json", visualizza),
    loadASync("bubblePlot.json", visualizza),
    loadASync("histogram2.json", visualizza),
    loadASync("bubblePlotRiviste.json", visualizza))
    , 5000);

};
