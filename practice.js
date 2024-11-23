// const featuredMovies = [
//     {
//         title: "Inception",
//         year: "2010",
//         plot: "A thief who steals corporate secrets through dream-sharing technology is given a chance to erase his criminal history.",
//         poster: "https://m.media-amazon.com/images/I/81p+xe8cbnL._AC_SL1500_.jpg",
//     },
//     {
//         title: "Interstellar",
//         year: "2014",
//         plot: "A group of explorers travel through a wormhole in space in an attempt to save humanity.",
//         poster: "https://m.media-amazon.com/images/M/MV5BYzdjMDAxZGItMjI2My00ODA1LTlkNzItOWFjMDU5ZDJlYWY3XkEyXkFqcGc@._V1_SX300.jpg",
//     },
//     {
//         title: "The Dark Knight",
//         year: "2008",
//         plot: "Batman faces the Joker, a criminal mastermind bent on creating chaos in Gotham City.",
//         poster: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg",
//     },
// ];

// let currentIndex = 0;

// function updateFeaturedMovie() {
//     const movie = featuredMovies[currentIndex];
//     document.querySelector(".featured__movie--img").src = movie.poster;
//     document.querySelector("#featuredMovieTitle").textContent = movie.title;
//     document.querySelector("#featuredMovieYear").textContent = `Year: ${movie.year}`;
//     document.querySelector("#featuredMoviePlot").textContent = movie.plot;

//     currentIndex = (currentIndex + 1) % featuredMovies.length; // Loop through movies
// }

// // Update movie every 5 seconds
// setInterval(updateFeaturedMovie, 5000);

// // Initialize the first movie
// document.addEventListener("DOMContentLoaded", updateFeaturedMovie);



// To change the initial view from "fast" to random movies, you can modify your main function to use an array of random movie keywords or titles. Here's how to do it:

// Updated Code:
// javascript
// Copy code
// async function main(searchQuery) {
//     // Array of random movie search keywords
//     const randomSearchQueries = ['action', 'comedy', 'drama', 'horror', 'adventure', 'thriller', 'romance', 'sci-fi'];
    
//     // If no specific searchQuery is provided, pick a random one
//     if (!searchQuery) {
//         const randomIndex = Math.floor(Math.random() * randomSearchQueries.length);
//         searchQuery = randomSearchQueries[randomIndex];
//     }

//     // Fetch movies based on the (random) search query
//     const movies = await fetch(`https://www.omdbapi.com/?apikey=c1daa9fc&s=${searchQuery}`);
//     const moviesData = await movies.json();

//     if (moviesData.Response === "True") {
//         const movieListEl = document.querySelector(".movies");
//         movieListEl.innerHTML = moviesData.Search.map((movie) => movieHTML(movie)).join("");
//     } else {
//         console.error("Error fetching movies:", moviesData.Error);
//     }
// }
  
//   function movieHTML(movie) {
//     return `<div class="movies">
//     <div class="movie">
//       <figure class="movie__img--wrapper">
//         <img
//           class="movie__img"
//           src="${movie.Poster}"
//           alt=""
//         />
//       </figure>
//       <div class="info__description">
//             <div class="movie__title">${movie.Title}</div>
//             <div class="movie__year">Year released: ${movie.Year}</div>
//              <div> 
//                 <a href="https://www.imdb.com/title/${movie.imdbID}" target="_blank" class="movie__imdb"><i class="fa-brands fa-imdb"></i></a>
//             </div>
//         </div>
//     </div>
//   </div>`
//   }
  
   
//   document.addEventListener('DOMContentLoaded', () => { // this is your button, we are targeting both input and button from your HTML and once we get a search from the HTML side we are going to enter that searchTerm onto the main function (searchQuery) and get the results and display i
//     const searchButton = document.getElementById('searchButton');
//     const searchInput = document.getElementById('searchInput');
  
//     // Handle search button click
//     searchButton.addEventListener('click', () => {
//         const searchTerm = searchInput.value.trim();
//         if (searchTerm) {
//             main(searchTerm);
//         }
//     });
  
//     //here we are adding a enter keypress button so it works by clicking Enter key
//     searchInput.addEventListener('keypress', (e) => {
//         if (e.key === 'Enter') {
//             const searchTerm = searchInput.value.trim();
//             if (searchTerm) {
//                 main(searchTerm);
//             }
//         }
//     });
  
//     // Initial load with default search
//     main();
//   });