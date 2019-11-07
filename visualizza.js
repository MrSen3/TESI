/**
 * Funzione per il caricamento a-sincrono di una risorsa
 * tramite una XML HTTP Request.
 *
 * @param {String} url - URL della risorsa da caricare
 * @param {loadCallback} success - funzione di callback invocata con il contenuto
 * @param {int} n - indica dove deve essere posizionato il grafico all'interno della pagina
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
//var scatter=false;
//var histogram1=false;
//var histogram2=true;
//var bubble=false;
//var wordcloud=false;

function visualizza (data, n) {
    console.log(n+" "+data);
    let json = JSON.parse(data);

    if(n==1){
        //let base=document.getElementById("appoggio");
        //let el=document.createElement("div");
        //el.setAttribute("id", "wordcloud");
        //base.appendChild(el);

        //vegaEmbed("#scatterplot", json);
        vegaEmbed("#scatterplot", json)
            .then(result => console.log("ciao"))
            .catch(console.warn);
        //wordcloud=true;
    }

    if(n==2){
    //if(n==2 && wordcloud==true){
        //let base=document.getElementById("wordcloud");
        //let el=document.createElement("div");
        //el.setAttribute("id", "scatterplot");
        //base.appendChild(el);

        //vegaEmbed('#histogram', json).then(res =>
          //  res.view
            //    .insert('pubblicazioni1.json', [
                    /* some data array */
              //  ])
                //.run()
        //);
        //
        //Se vegaEmbed ha esito positivo allora viene eseguito quello che c'e' dentro al then, altrimenti viene eseguito quello dentro al catch
        vegaEmbed("#wordcloud", json)
            .then(result => console.log("ciao"))
            .catch(console.warn);
        // scatterplot=true;
    }
    if(n==3){
    //if(n==3 && scatterplot==true){
    //     let base=document.getElementById("scatterplot");
    //     let el=document.createElement("div");
    //     el.setAttribute("id", "histogram1");
    //     base.appendChild(el);
        vegaEmbed("#histogram1", json)
            .then(result => console.log("ciao"))
            .catch(console.warn);
        // histogram1=true;
    }

    if(n==4){
    //if(n==4 && histogram1==true){
        //let base=document.getElementById("histogram1");
        //let el=document.createElement("div");
        //el.setAttribute("id", "histogram2");
        //base.appendChild(el);
        vegaEmbed("#bubbleplot1", json)
            .then(result => console.log("ciao"))
            .catch(console.warn);
        //histogram2=true;
    }

    if(n==5){
    //if(n==5 && histogram2==true){
        //let base=document.getElementById("histogram2");
        //let el=document.createElement("div");
        //el.setAttribute("id", "bubbleplot");
        //base.appendChild(el);
        vegaEmbed("#histogram2", json)
            .then(result => console.log("ciao"))
            .catch(console.warn);
        //bubble=true;
    }

    if (n==6){
    //if(n==6 && histogram2==true){
        //let base=document.getElementById("histogram2");
        //let el=document.createElement("div");
        //el.setAttribute("id", "bubbleplot");
        //base.appendChild(el);
        vegaEmbed("#bubbleplot2", json)
            .then(result => console.log("ciao"))
            .catch(console.warn);
        //bubble=true;
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


//Come dovro'modificare la funzione seguente?
// 1)non sara piu' window.onload, ma sara' onsubmit o onclick del bottone del form
// 2)per gestire diverse chiamate dovro' sostituire i div che creo durante la chiamata precedente, per farlo ho tre idee:
//      -replaceChild
//      -removeChild e poi ricreo gli stessi div
//      -oppure creo i div fissi gia'  nell'html e poi riempio e svuoto questi div in base all'autore scelto

//in jQuery sarebbe: $(document).ready(function()); oppure in maniera piu' compatta:  $(function(){
window.onload = function () {
    //Gli passo i numeri per capire dove deve andare a inserire i vari grafici
    //for(var i=0; i<5; ++i){
    loadASync("scatterPlot.json", visualizza, 1);
    loadASync("wordCloud.json", visualizza, 2);
    //significa che come file deve prendere quello nella stessa cartella di 'funzioni.js' e che in caso di 'success'===true allora deve entrare in visualizza
    loadASync("histogramLegendaInterattiva.json", visualizza, 3);
    loadASync("bubblePlot.json", visualizza, 4);
    loadASync("histogram2.json", visualizza, 5);
    loadASync("bubblePlotRiviste.json", visualizza, 6);



    //}
};