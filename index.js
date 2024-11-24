const featuredMovies = [
    {
        title: "Inception",
        year: "2010",
        plot: "A thief who steals corporate secrets through dream-sharing technology is given a chance to erase his criminal history.",
        poster: "https://m.media-amazon.com/images/I/81p+xe8cbnL._AC_SL1500_.jpg",
    },
    {
        title: "Interstellar",
        year: "2014",
        plot: "A group of explorers travel through a wormhole in space in an attempt to save humanity.",
        poster: "https://m.media-amazon.com/images/M/MV5BYzdjMDAxZGItMjI2My00ODA1LTlkNzItOWFjMDU5ZDJlYWY3XkEyXkFqcGc@._V1_SX300.jpg",
    },
    {
        title: "The Dark Knight",
        year: "2008",
        plot: "Batman faces the Joker, a criminal mastermind bent on creating chaos in Gotham City.",
        poster: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg",
    },
];

let currentIndex = 0;

function updateFeaturedMovie() {
    const movie = featuredMovies[currentIndex];
    document.querySelector(".featured__movie--img").src = movie.poster;
    document.querySelector("#featuredMovieTitle").textContent = movie.title;
    document.querySelector("#featuredMovieYear").textContent = `Year: ${movie.year}`;
    document.querySelector("#featuredMoviePlot").textContent = movie.plot;

    currentIndex = (currentIndex + 1) % featuredMovies.length;
}


setInterval(updateFeaturedMovie, 5000);


document.addEventListener("DOMContentLoaded", updateFeaturedMovie);


// Filter (Title and Year)
document.addEventListener('DOMContentLoaded', () => { 
    const applyFiltersButton = document.getElementById("applyFilters");
    const moviesContainer = document.querySelector(".movies");
  
    applyFiltersButton.addEventListener("click", async () => {
      const title = document.getElementById("title").value.trim();
      const year = document.getElementById("year").value.trim();
  
      if (!title) {
        alert("Please enter a keyword to search!");
        return;
      }
  
      let apiUrl = `https://www.omdbapi.com/?apikey=c1daa9fc&s=${encodeURIComponent(title)}`;
      if (year) {
        apiUrl += `&y=${year}`;
      }
  
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
  
        if (data.Response === "True") {
          displayMoviesWithPlots(data.Search);
        } else {
          moviesContainer.innerHTML = `<p class="error__message">No movies found. Try a different keyword!</p>`;
        }
      } catch (error) {
        console.error("Error fetching the movie data:", error);
        moviesContainer.innerHTML = `<p class="error__message">Error fetching data. Please try again later.</p>`;
      }
    });
  
    async function displayMoviesWithPlots(movies) {
      moviesContainer.innerHTML = ""; 
  
      for (const movie of movies) {
        try {
          const movieDetails = await fetch(
            `https://www.omdbapi.com/?apikey=c1daa9fc&i=${movie.imdbID}`
          ).then((res) => res.json());

          const movieElement = document.createElement("div");
          movieElement.classList.add("movie");
          movieElement.innerHTML = `
            <figure class="movie__img--wrapper">
            <img src="${movieDetails.Poster !== "N/A" ? movieDetails.Poster : "https://via.placeholder.com/200x300"}" class="movie__img" alt="${movieDetails.Title} Poster">
            </figure>
            <div class="movie__title">${movieDetails.Title}</div>
            <div class="movie__year">${movieDetails.Year}</div>
            <div class="movie__plot">${movieDetails.Plot}</div>
            <a href="https://www.imdb.com/title/${movieDetails.imdbID}" class="movie__imdb" target="_blank"><i class="fa-brands fa-imdb"></i></a>
          `;
          moviesContainer.appendChild(movieElement);
        } catch (error) {
          console.error("Error fetching detailed movie data:", error);
        }
      }
    }
  });

// INITIAL MOVIE
// async function main(searchQuery) {

//     const randomSearchQueries = ['action', 'comedy', 'drama', 'horror', 'adventure', 'thriller', 'romance', 'sci-fi'];
    
//     if (!searchQuery) {
//         const randomIndex = Math.floor(Math.random() * randomSearchQueries.length);
//         searchQuery = randomSearchQueries[randomIndex];
//     }

//     const movies = await fetch(`https://www.omdbapi.com/?apikey=c1daa9fc&s=${searchQuery}&plot=short`);
//     const moviesData = await movies.json();

//     if (moviesData.Response === "True") {
//         const movieListEl = document.querySelector(".movies");
//         movieListEl.innerHTML = moviesData.Search.map((movie) => movieHTML(movie)).join("");
//     } else {
//         console.error("Error fetching movies:", moviesData.Error);
//     }
// }

async function main(searchQuery) {
    const randomSearchQueries = ['action', 'comedy', 'drama', 'horror', 'adventure', 'thriller', 'romance', 'sci-fi'];

    // Random search if no query provided
    if (!searchQuery) {
        const randomIndex = Math.floor(Math.random() * randomSearchQueries.length);
        searchQuery = randomSearchQueries[randomIndex];
    }

    try {
        // Fetch movies based on search query
        const movies = await fetch(`https://www.omdbapi.com/?apikey=c1daa9fc&s=${searchQuery}`);
        const moviesData = await movies.json();

        if (moviesData.Response === "True") {
            const movieListEl = document.querySelector(".movies");

            // Fetch detailed info for each movie to include the short plot
            const detailedMovies = await Promise.all(
                moviesData.Search.map(async (movie) => {
                    const movieDetails = await fetch(`https://www.omdbapi.com/?apikey=c1daa9fc&i=${movie.imdbID}&plot=short`);
                    return await movieDetails.json();
                })
            );

            // Render the movies with detailed info (including plot)
            movieListEl.innerHTML = detailedMovies.map((movie) => movieHTML(movie)).join("");
        } else {
            console.error("Error fetching movies:", moviesData.Error);
        }
    } catch (error) {
        console.error("Error:", error);
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
            <div class="movie__year">${movie.Year}</div>
            <div class="movie__year">${movie.Plot}</div>
             <div> 
                <a href="https://www.imdb.com/title/${movie.imdbID}" target="_blank" class="movie__imdb"><i class="fa-brands fa-imdb"></i></a>
            </div>
        </div>
    </div>
  </div>`
  }
  
   
  document.addEventListener('DOMContentLoaded', () => { 
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');
    const title = document.getElementById('title');
    const year = document.getElementById('year');
  
    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            main(searchTerm);
        }
    });
  
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                main(searchTerm);
            }
        }
    });

    title.addEventListener('click', () => {
        const searchTerm = title.value.trim();
        if (searchTerm) {
            main(searchTerm);
        }
    });
  
    main();
  });