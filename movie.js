async function main(searchQuery = 'galaxy') { // here we are adding a searcHQuery parameter (by default it will be galaxy you can change this) 
    const movies = await fetch(`https://www.omdbapi.com/?apikey=c1daa9fc&s=${searchQuery}`); // we are passing the searchQuery onto the API so we can get the results
    const moviesData = await movies.json();
    
    if (moviesData.Response === "True") {
        const movieListEl = document.querySelector(".movies");
        movieListEl.innerHTML = moviesData.Search.map((movie) => movieHTML(movie)).join("");
    } else {
        console.error("Error fetching movies:", moviesData.Error);
    }
  }
  
  function movieHTML(movie) {
    return `<div class="movies">
    <div class="movie">
      <figure class="movie__img--wrapper">
        <img
          class="movie__img"
          src="${movie.Poster}"
          alt=""
        />
      </figure>
      <div class="info__description">
            <div class="movie__title">${movie.Title}</div>
            <div class="movie__ratings">Ratings</div>
            <div class="movie__year">Year released: ${movie.Year}</div>
            <div class="movie__Cast">Cast:</div>
            <div class="movie__director">Director: </div>
        </div>
    </div>
  </div>`
  }
  
   
  document.addEventListener('DOMContentLoaded', () => { // this is your button, we are targeting both input and button from your HTML and once we get a search from the HTML side we are going to enter that searchTerm onto the main function (searchQuery) and get the results and display i
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');
  
    // Handle search button click
    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            main(searchTerm);
        }
    });
  
    //here we are adding a enter keypress button so it works by clicking Enter key
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                main(searchTerm);
            }
        }
    });
  
    // Initial load with default search
    main();
  });