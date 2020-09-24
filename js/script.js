// Ciao Ragazzi!! Milestone 3 di Boolflix!! :star::star::star:
// In questa milestone come prima cosa aggiungiamo la copertina del film o della serie al nostro elenco.
// Ci viene passata dall’API solo la parte finale dell’URL, questo perché poi potremo generare da quella porzione di URL tante dimensioni diverse.
// Dovremo prendere quindi l’URL base delle immagini di TMDB: https://image.tmdb.org/t/p/ per poi aggiungere la dimensione che vogliamo generare (troviamo tutte le dimensioni possibili a questo link: https://www.themoviedb.org/talk/53c11d4ec3a3684cf4006400) per poi aggiungere la parte finale dell’URL passata dall’API.
// Esempio di URL che torna la copertina di PEPPA PIG:
// https://image.tmdb.org/t/p/w185/tZgQ76hS9RFIwFyUxzctp1Pkz0N.jpg
// Finita la Milestone fate un po' di refactoring mi raccomando :wink:
// Buon lavoro! :slightly_smiling_face:


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
function renderFilm(showObj, source){
    var template = Handlebars.compile($("#template").html());
    var rating = showObj.vote_average;

    //converting language into a flag to be displayed
    showObj.original_language = imgPath(showObj.original_language);

    if(showObj.poster_path != null){
        showObj.poster_path = "https://image.tmdb.org/t/p/w342" + showObj.poster_path;;
    }

    $("." + source + "-list").append(template(showObj));
    starRendering(rating, source);
    
}

//convfert number rating into star 1 to 5
function starRendering(nStar, source){
    var star = document.createElement("i");
    var emptyStar = document.createElement("i");
    var ratingDomObj;
    star.classList.add("fas");
    star.classList.add("fa-star");

    emptyStar.classList.add("far");
    emptyStar.classList.add("fa-star");

    if(source == "movie"){
        ratingDomObj = $(".movie-list .show:last-child .vote_average");
    }else {
        ratingDomObj = $(".tv-list .show:last-child .vote_average");
    }

    for(var i = 1; i <= 5; i++){
        if(i > nStar){
            ratingDomObj.append(emptyStar.cloneNode())
        }else{
            ratingDomObj.append(star.cloneNode());
        }
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