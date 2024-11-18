async function main() {
    const movies = await fetch("https://www.omdbapi.com/?i=tt3896198&apikey=c1daa9fc&s=galaxy");
    const moviesData = await movies.json();
    // console.log(movieData)
    if (moviesData.Response === "True") {
        const movieListEl = document.querySelector(".movies");
        movieListEl.innerHTML = moviesData.Search.map((movie) => movieHTML(movie)).join("");
    } else {
        console.error("Error fetching movies:", moviesData.Error);
    }
}

main()

function movieHTML(movie) {
    return  `<div class="movies">
    <div class="movie">
      <figure class="movie__img--wrapper">
        <img
          class="movie__img"
          src="${movie.Poster}"
          alt=""
        />
      </figure>
      <div class="movie__title">${movie.Title}</div>
      <div class="movie__ratings">Ratings</div>
      <div class="movie__year">Year released: ${movie.Year}</div>
      <div class="movie__Cast">Cast:</div>
      <div class="movie__director">Director: </div>
    </div>
  </div>`
}