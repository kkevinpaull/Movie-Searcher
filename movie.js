async function main() {
    const movie = await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=c1daa9fc&s=${title}`);
    const movieData = await movie.json();
    console.log(movieData)
}