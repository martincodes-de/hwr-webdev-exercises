const ourFavorites = document.querySelector("#our_favorites .movieArea");
const renderOurFavorites = async () => {
    try {
        const data = await fetch("http://localhost:8080/api/movies");
        const response = await data.json();
        console.log(response);
        let item = "";
        for (let index = 0; index < response.length; index++) {
            item +=
                `<div class="movie">
                    <img src="${response[index].image}" alt="${response[index].title}"/>
                    <div class="movie_description">
                        <h3>${response[index].title}</h3>
                        <p>${response[index].short_description}</p>
                        <a href="" class="like_link">❤️ Like This</a>
                    </div>
                </div>`;
        }
        ourFavorites.innerHTML = item;
    } catch (error) {
        console.log("our favorites error ->", error)
    }
};

window.addEventListener("load", () => {
    renderOurFavorites();
});