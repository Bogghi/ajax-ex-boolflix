// MILESTONE 4:
// Trasformiamo quello che abbiamo fatto fino ad ora in una vera e propria webapp, creando un layout completo simil-Netflix:
// Un header che contiene logo e search bar
// Dopo aver ricercato qualcosa nella searchbar, i risultati appaiono sotto forma di “card” in cui lo sfondo è rappresentato dall’immagine di copertina (consiglio la poster_path con w342)
// Andando con il mouse sopra una card (on hover), appaiono le informazioni aggiuntive già prese nei punti precedenti più la overview


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
    });

    $(".searchButton").click(function(){
        search($(".search").val(),"movie");
        search($(".search").val(),"tv");
    });

    //adding blur to film backgraound
    $(document).mouseenter(function(){
        $(".show").hover(function(){
            $(this).find(".background").css("filter","blur(1px)");
        }, function(){
            $(this).find(".background").css("filter","none");
        });
    });

});

//    filter: blur(4px)

//ajax enclosoure for calling the api
function search(keyword, category){
    clear();
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

//clear the previous api result
function clear(){
    $(".movie-list .show").remove();
    $(".tv-list .show").remove();
}

//function to render html based on the template from the object recived from the api
function renderFilm(showObj, source){
    var template = Handlebars.compile($("#template").html());
    var rating = showObj.vote_average;

    //converting language into a flag to be displayed
    showObj.original_language = imgPath(showObj.original_language);

    var show = $("." + source + "-list").append(template(showObj));
    
    //convert the poster path into full path
    if(showObj.poster_path != null){
        showObj.poster_path = "https://image.tmdb.org/t/p/w342" + showObj.poster_path;;
        show.find(".show:last-child .background").css("background-image","url('"+showObj.poster_path+"')");
    }
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