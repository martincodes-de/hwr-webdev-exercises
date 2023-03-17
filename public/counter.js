

window.onload = (event) => {

    var countlist = {}
    var listOfAllMovies = []

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
    addCountListener()

    function count(film){
        countlist[film]++
        console.log("hello " + film)
        console.log(countlist[film])
        document.cookie = film + "=" + countlist[film]
        console.log(getCookie(film))
        evaluate()
    }

    function evaluate(){
        
        var finStr = "";
        var prevMax = 0;

        for (let index = 0; index < listOfAllMovies.length; index++) {

            var currentMov = listOfAllMovies[index]
            if (countlist[currentMov]>=prevMax){
                finStr = currentMov
                prevMax = countlist[currentMov]
                
            }
        }
        setMostClickedMovie(finStr)
    }
    
    function setMostClickedMovie(filmName){
        //Display new most clicked movie
        console.log(filmName)
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
}