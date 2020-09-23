// Milestone 2:

// Trasformiamo il voto da 1 a 10 decimale in un numero intero da 1 a 5, così da permetterci di stampare a schermo un numero di stelle piene che vanno da 1 a 5, lasciando le restanti vuote (troviamo le icone in FontAwesome).

// Arrotondiamo sempre per eccesso all’unità successiva, non gestiamo icone mezze piene (o mezze vuote :P)
// Trasformiamo poi la stringa statica della lingua in una vera e propria bandiera della nazione corrispondente, gestendo il caso in cui non abbiamo la bandiera della nazione ritornata dall’API (le flag non ci sono in FontAwesome).
// Allarghiamo poi la ricerca anche alle serie tv. Con la stessa azione di ricerca dovremo prendere sia i film che corrispondono alla query, sia le serie tv, stando attenti ad avere alla fine dei valori simili (le serie e i film hanno campi nel JSON di risposta diversi, simili ma non sempre identici)
// Qui un esempio di chiamata per le serie tv:
// https://api.themoviedb.org/3/search/tv?api_key=e99307154c6dfb0b4750f6603256716d&language=it_IT&query=scrubs

var flag = {
    "path": "img/svg/selected/",
    "name": [
        {
            "img": "cs.svg",
            "original_language": "cs"
        },
        {
            "img": "da.svg",
            "original_language": "da"
        },
        {
            "img": "de.svg",
            "original_language": "de"
        },
        {
            "img": "en.svg",
            "original_language": "en"
        },
        {
            "img": "es.svg",
            "original_language": "es"
        },
        {
            "img": "fr.svg",
            "original_language": "fr"
        },
        {
            "img": "it.svg",
            "original_language": "it"
        },
        {
            "img": "pt.svg",
            "original_language": "pt"
        },
        {
            "img": "ru.svg",
            "original_language": "ru"
        },
        {
            "img": "th.svg",
            "original_language": "th"
        },
        {
            "img": "uk.svg",
            "original_language": "uk"
        }
    ]
};

$(document).ready(function(){

    console.log(flag.name.length);

    $(".search").keyup(function(e){
        if(e.which == 13){
            search($(".search").val(),"movie");
            search($(".search").val(),"tv");
        }
    })

    $(".searchButton").click(function(){
        search($(".search").val(),"movie");
        search($(".search").val(),"tv");
    })

});

//ajax enclosoure for calling the api
function search(keyword, category){
    $.ajax({
        url:"https://api.themoviedb.org/3/search/" + category,
        data: {
            "api_key": "3152f889c9071336ed974e61bf0dab9f",
            "language": "en-US",
            "query": keyword,
            "page": 1
        },
        success: function(data,state){
            var resultSet = data.results;
            // console.log(resultSet.length + " " + category);
            for(var i = 0; i < resultSet.length; i++){
                resultSet[i].vote_average = Math.ceil(resultSet[i].vote_average/2);
                renderFilm(resultSet[i],category);
            }
        },
        error: function(request, state, error){

        }
    });

}

//function to render html based on the template from the object recived from the api
function renderFilm(filmObj, source){
    var template = Handlebars.compile($("#template").html());
    var rating = filmObj.vote_average;
    //setuping api source to be displayed
    filmObj.source = source;

    console.log(imgPath(filmObj.original_language));

    filmObj.original_language = imgPath(filmObj.original_language);

    // console.log(filmObj);

    $(".film-list").append(template(filmObj));
    starRendering(rating);
}

//convfert number rating into star 1 to 5
function starRendering(nStar){
    var star = document.createElement("i");
    star.classList.add("fas");
    star.classList.add("fa-star");

    var ratingDomObj = $(".film:last-child .vote_average");

    for(var i = 0; i < nStar; i++){
        ratingDomObj.append(star.cloneNode());
    }
}


//scanning our array to get the flag image path
function imgPath(isoCode){
    var i = 0, imgPath = "";
    while(i < flag.name.length){
        if(flag.name[i].original_language == isoCode){
            imgPath = flag.path + flag.name[i].img;
            break;
        }
        i++;
    }    
    if(i == flag.name.length){
        imgPath = flag.path + "eu.svg";
    }
    return imgPath;
}