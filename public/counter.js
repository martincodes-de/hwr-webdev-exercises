

window.onload = async (event) => {

    var countlist = {}
    var listOfAllMovies = []
    var mostClickedMovie = "";
    var allLikedMovies = [];

    const ourFavorites = document.querySelector("#our_favorites .movieArea");
    const renderOurFavorites = async () => {
        try {
            const data = await fetch("http://localhost:8080/api/movies");
            const response = await data.json();
            let item = "";
            for (let index = 0; index < response.length; index++) {
                item +=
                    `<div class="movie" id="${response[index].title}">
                        <img src="${response[index].image}" alt="${response[index].title}"/>
                        <div class="movie_description">
                            <h3>${response[index].title}</h3>
                            <p>${response[index].short_description}</p>
                            <a href="" class="like_link" id="${response[index].title}_likethis" >❤️ Like This</a>
                        </div>
                    </div>`;
            }
            ourFavorites.innerHTML = item;
        } catch (error) {
            console.log("our favorites error ->", error)
        }
    };
    

    const addCountListener = async () => {
        try {
            const data = await fetch("http://localhost:8080/api/movies");
            const response = await data.json();
            for (let index = 0; index < response.length; index++) {
                if(getCookie(response[index].title) === ""){
                    countlist[response[index].title] = 0
                }else{
                    countlist[response[index].title] = getCookie(response[index].title)
                }
                document.getElementById(response[index].title).addEventListener("click", () => {
                    count(response[index].title);
                    onclick=window.location.href = new URL("http://localhost:8080/movie/"+ response[index].title);
                });
                listOfAllMovies.push(response[index].title)
                var titelLikedThis = response[index].title + "_likethis"
                document.getElementById(titelLikedThis).addEventListener("click", () => {
                    setLiked(response[index].title);
                });
                
            }
        } catch (error) {
            console.log("failed to add Eventlistener -> ", error)
        }
    };

    function count(film){
        countlist[film]++
        document.cookie = film + "=" + countlist[film]
        evaluate()
    }

    function evaluate(){
        var finStr = "";
        var prevMax = 0;
        for (let index = 0; index < listOfAllMovies.length; index++) {
            var currentMov = listOfAllMovies[index]
            if (countlist[currentMov]>=prevMax && countlist[currentMov] != 0){
                finStr = currentMov
                prevMax = countlist[currentMov]
            }
        }
        mostClickedMovie = finStr
        renderYourFavorites()
    }

    function setLiked(movieTitle){ 
        var movieLikedJson = {
            "userID": getCookie("userID"),
            "title": movieTitle
        }
        fetch("http://localhost:8080/api/setLiked", {
            method:"POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movieLikedJson)
        })
        renderYourLiked();
    }

    function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
    }

    const yourFavorites = document.querySelector("#your_favorites .movieArea")

    const renderYourFavorites = async () => {
    try {
        const data = await fetch("http://localhost:8080/api/movies");
        const response = await data.json();
        let item = `<p> no clicked movies yet </p>`;
        for (let index = 0; index < response.length; index++) {
            if(response[index].title == mostClickedMovie){
            item =
                `<div class="movie" id="${response[index].title}">
                    <img src="${response[index].image}" alt="${response[index].title}"/>
                    <div class="movie_description">
                        <h3>${response[index].title}</h3>
                        <p>${response[index].short_description}</p>
                    </div>
                </div>`;
            }
        }
        yourFavorites.innerHTML = item;
    } catch (error) {
        console.log("your favorites error ->", error)
    }
    };

    const yourLiked = document.querySelector("#your_liked .movieArea")

    const renderYourLiked = async () => {
        try {
            const data = await fetch("http://localhost:8080/api/movies");
            const response = await data.json();
            let item = ``;
            allLikedMovies.forEach(element =>{
                for (let index = 0; index < response.length; index++) {
                    if(response[index].title === element){
                        item +=
                        `<div class="movie" id="${response[index].title}">
                            <img src="${response[index].image}" alt="${response[index].title}"/>
                            <div class="movie_description">
                                <h3>${response[index].title}</h3>
                                <p>${response[index].short_description}</p>
                                <a href="" class="like_link" id="${response[index].title}_likethis" >❤️ Like This</a>
                            </div>
                        </div>`;
                    }
                }
                }
            )
            if(item === ``){
                item = "<p> no favorites movies yet </p>"
            }
            yourLiked.innerHTML = item;
        } catch (error) {
            console.log("liked favorites error -> ", error)
        }
    };

    async function getMovies(){ 
        const data =  await fetch("http://localhost:8080/api/getliked");
        var response

        if(data != null){
            response = await data.json();
        }else{
            response = []   
        }
        
        for (let index = 0; index < response.length; index++) {
            allLikedMovies.push(response[index])
        }
    }
    
    await renderOurFavorites();
    await addCountListener();
    evaluate();
    getMovies();
    await renderYourLiked();
    renderYourFavorites();  
}