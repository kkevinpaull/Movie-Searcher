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

    currentIndex = (currentIndex + 1) % featuredMovies.length; // Loop through movies
}

// Update movie every 5 seconds
setInterval(updateFeaturedMovie, 5000);

// Initialize the first movie
document.addEventListener("DOMContentLoaded", updateFeaturedMovie);
