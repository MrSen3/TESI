/**
 * Funzione per il caricamento a-sincrono di una risorsa
 * tramite una XML HTTP Request.
 *
 * @param {String} url - URL della risorsa da caricare
 * @param {loadCallback} success - funzione di callback invocata con il contenuto
 */
//Uguale a quella scritta dal prof sulle slide
function loadASync(url, success, n) {
    let xhr = new XMLHttpRequest();
    //url e' il file json che ho scelto di leggere
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
        if (this.readyState === 4)
            if (okStatus(this.status)) {
                //in caso di successo, passa alla funzione visualizza(che coincide con succeess) il testo contenente nell'URL
                success(this.responseText, n);
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

//Flag che mi servono a stampare i grafici nell'ordine corretto
var scatter=false;
var histogram=false;
var bubble=false;
var wordcloud=false;

function visualizza (data, n) {
    console.log(n+" "+data);
    let json = JSON.parse(data);

    if(n==1){
        let base=document.getElementById("profilo");
        let el=document.createElement("div");
        el.setAttribute("id", "scatterplot");
        base.appendChild(el);
        vegaEmbed("#scatterplot", json);
        scatter=true;
        console.log(scatter);
    }
    console.log(scatter);
    if(n==2 && scatter==true){
        console.log(scatter);
        let base=document.getElementById("scatterplot");
        let el=document.createElement("div");
        el.setAttribute("id", "histogram");
        base.appendChild(el);
        vegaEmbed("#histogram", json);
        histogram=true;
    }
    if(n==3 && histogram==true){
        let base=document.getElementById("histogram");
        let el=document.createElement("div");
        el.setAttribute("id", "bubbleplot");
        base.appendChild(el);
        vegaEmbed("#bubbleplot", json);
        bubble=true;
    }
    if(n==4 && bubble==true){
        let base=document.getElementById("bubbleplot");
        let el=document.createElement("div");
        el.setAttribute("id", "wordcloud");
        base.appendChild(el);
        vegaEmbed("#wordcloud", json);
        wordcloud=true;
    }


    //se il json ha l'indicazione 'update' allora creo un paragrafo <p>, ci scrivo l'update e lo attacco(append) dopo la tabella
    if (json.update) {
        let p = document.createElement("p");
        let text = document.createTextNode("Aggiornata al: " + json.update);
        p.appendChild(text);

        el.appendChild(p);
    }

//    base.appendChild(el);
}


function visualizza (data) {
    console.log(data);
    let json = JSON.parse(data);

        vegaEmbed("#grafico", json);


}


window.onload = function () {
    //Gli passo i numeri per capire dove deve andare a inserire i vari grafici
    //for(var i=0; i<5; ++i){
    loadASync("scatterPlot.json", visualizza, 1);
    //significa che come file deve prendere quello nella stessa cartella di 'funzioni.js' e che in caso di 'success'===true allora deve entrare in visualizza
    loadASync("histogram1.json", visualizza, 2);
    loadASync("bubblePlot.json", visualizza, 3);
    loadASync("wordCloud.json", visualizza, 4);
    //}
};