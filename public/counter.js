

window.onload = async (event) => {

    var countlist = {}
    var listOfAllMovies = []
    var mostClickedMovie = "";

    

    const addCountListener = async () => {
        console.log("methode wird aufgerufen :D ")
        try {
            const data = await fetch("http://localhost:8080/api/movies");
            const response = await data.json();
            console.log(response);
            for (let index = 0; index < response.length; index++) {
                if(getCookie(response[index].title) === ""){
                    countlist[response[index].title] = 0
                }else{
                    countlist[response[index].title] = getCookie(response[index].title)
                }
                document.getElementById(response[index].title).addEventListener("click",() => count(response[index].title))
                console.log("added event listener ")
                listOfAllMovies.push(response[index].title)
                console.log(listOfAllMovies)
            }
        } catch (error) {
            console.log("failed to add Eventlistener -> ", error)
        }
    };

    function count(film){
        countlist[film]++
        console.log("clicked on " + film)
        console.log("Times it was clicked: " + countlist[film])
        document.cookie = film + "=" + countlist[film]
        console.log("moviecookie clicked times: " + getCookie(film))
        evaluate()
    }

    function evaluate(){
        
        var finStr = "";
        var prevMax = 0;
        console.log("evalute wird ausgeführt    :   " + listOfAllMovies.length)
        for (let index = 0; index < listOfAllMovies.length; index++) {

            var currentMov = listOfAllMovies[index]
            if (countlist[currentMov]>=prevMax && countlist[currentMov] != 0){
                finStr = currentMov
                prevMax = countlist[currentMov]
                
            }
            console.log( index + " .... " + currentMov)
        }
        mostClickedMovie = finStr
        renderYourFavorites()
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
        console.log(response);
        let item = `<p> no clicked movies yet </p>`;
        for (let index = 0; index < response.length; index++) {
            if(response[index].title == mostClickedMovie){
            item =
                `<div class="movie" id="${response[index].title}">
                    <img src="${response[index].image}" alt="${response[index].title}"/>
                    <div class="movie_description">
                        <h3>${response[index].title}</h3>
                        <p>${response[index].short_description}</p>
                        <a href="" class="like_link">❤️ Like This</a>
                    </div>
                </div>`;
            }
        }
        yourFavorites.innerHTML = item;
    } catch (error) {
        console.log("your favorites error ->", error)
    }
    };


    await addCountListener();
    console.log(countlist)
    evaluate();
    console.log(mostClickedMovie)
    renderYourFavorites();




}