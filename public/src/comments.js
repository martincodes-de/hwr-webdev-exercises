const ourComments = document.querySelector("");// idk what to put in the String
const loadComments = async () => {
    const data = await fetch(""); //idk what to fetche
    const response = await data.json();
    let item = "";
    try{
        for(let index = 0; index < response.length; index++){
            item +=
                '<div class="comment"><h3>${response[index].filmtitle}</h3> | <h4>${response[index].userID}</h4> <p>${response[index].comment}</p></div>';
        }
        ourComments.innerHTML = item;
    }catch(error){
        console.log("error while loading Comments => ", error);
    }
};

window.addEventListener("load", () => (loadComments));


var comment = { //JSON Format
    Name: $userID,
    Kommentar: "kommentar" + $kommentar
}

var movies = {
    Title: $movieTitle
    comments: $comment
}