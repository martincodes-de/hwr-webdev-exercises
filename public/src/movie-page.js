window.onload = async (event) => {
    currentURL = window.location.href;
    currentMovie = currentURL.substring(currentURL.lastIndexOf('/') + 1);

    // Spaces in URLs are written as "%20", so they have to be replaced back to spaces
    currentMovie = currentMovie.replaceAll("%20", " ")
    currentMovie = currentMovie.replaceAll("?", "");
    console.log(currentMovie);

    const movieContent = document.querySelector("#movie_content .movie_content");
    const renderMovieContent = async () => {
        try {
            const data = await fetch("http://localhost:8080/api/movies");
            const response = await data.json();
            console.log(response);
            let item = "";
            for (let index = 0; index < response.length; index++) {
                if (response[index].title == currentMovie) {
                    item =
                        `<div class="movie_page_description">
                        <div>
                            <h2>${response[index].title}</h2>
                            <p style="text-align: justify">${response[index].description.replaceAll("\n", "<br>")}</p>
                            <h4>Source:</h4>
                            <p>${response[index].source}</p>
                        </div>
                        </div>
                        <div class="movie_poster">
                            <img src="../${response[index].image}" alt="${response[index].title} - Poster">
                        </div>`;
                }
            }
            movieContent.innerHTML = item;
        } catch (error) {
            console.log("our favorites error ->", error)
        }
    };

    const renderComments = async () => {
        const commentsBlock = document.querySelector("#comments .chatlog");
        try {
            const data = await fetch(new URL("http://localhost:8080/api/comments/getcomments/" + currentMovie));
            const response = await data.json();
            let item = "";
            for(let index = 0; index<response.length; index++){
                item += response[index];
            }
            console.log("Item -> ",item);
            commentsBlock.innerHTML = item;
        }catch(e){
            console.log("Chatbox Error -> ",e);
        }
    }


    await renderMovieContent();
    await renderComments();

    document.getElementById("submitButton").addEventListener("click", async() => {
        console.log("send button was pressed");
        var userID =  getCookie("userID");  //Einfach nicht "" sein
        var comment = document.getElementById("contentOfComment").value;
        var title = currentMovie;

        var newComment = {
            "title": title,
            "userID": userID,
            "comment": comment
        }
        console.log(newComment);
        console.log(JSON.stringify(newComment));
        var res = await fetch("http://localhost:8080/api/comments/postcomment", {
            method:"POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newComment)
        })
        //await renderComments();
        window.location.href = new URL("http://localhost:8080");
    });

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

        