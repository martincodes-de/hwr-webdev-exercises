window.onload = async (event) => {
    currentURL = window.location.href;
    currentMovie = currentURL.substring(currentURL.lastIndexOf('/') + 1);

    // Spaces in URLs are written as "%20", so they have to be replaced back to spaces
    currentMovie = currentMovie.replaceAll("%20", " ")
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

    await renderMovieContent();
}

        