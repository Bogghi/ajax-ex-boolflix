// Ciao ragazzi,
// esercizio di oggi: Boolflix
// repo: ajax-ex-boolflix
// Iscriviamoci al sito https://www.themoviedb.org. E’ completamente gratuito. 
// Richiediamo la nostra API_KEY che verrà utilizzata in tutte le nostre chiamate. Servirà all’API a capire chi sta effettuando la chiamata.
// Per richiederla clicchiamo sul nostro user, poi impostazioni, API e clicchiamo su “Richiedi una nuova API key”.
// Una volta generato, in Impostazioni / API avremo la nostra chiave, indispensabile per tutte le nostre chiamate.
// Qua https://developers.themoviedb.org/3 troveremo tutte le chiamate possibili all’API. Possiamo giocarci in un secondo momento, ma come prima cosa concentriamoci su Search / Movies.
// Milestone 1
// Creare un layout base con una searchbar (una input e un button) in cui possiamo scrivere completamente o parzialmente il nome di un film. Possiamo, cliccando il  bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente.
// Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni film trovato: 
// Titolo
// Titolo Originale
// Lingua
// Voto
// Buon lavoro! :slightly_smiling_face:

$(document).ready(function(){

    $(".search").keyup(function(e){
        if(e.which == 13){
            searchFilm($(".search").val());
        }
    })

    $(".searchButton").click(function(){
        searchFilm($(".search").val());
    })

});

//ajax enclosoure for calling the api
function searchFilm(keyword){

    $.ajax({
        url:"https://api.themoviedb.org/3/search/movie",
        data: {
            "api_key": "3152f889c9071336ed974e61bf0dab9f",
            "language": "en-US",
            "query": keyword,
            "page": 1
        },
        success: function(data,state){
            var resultSet = data.results;
            for(var i = 0; i < resultSet.length; i++){
                // console.log(resultSet[i]);
                renderFilm(resultSet[i]);
            }
        },
        error: function(request, state, error){

        }
    });

}

//function to render html based on the template from the object recived from the api
function renderFilm(filmObj){
    var template = Handlebars.compile($("#template").html());
    $(".film-list").append(template(filmObj));
}