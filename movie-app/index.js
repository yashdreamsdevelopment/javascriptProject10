const APIURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const main = document.querySelector("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

getMovies(APIURL);

async function getMovies(url) {
  const response = await fetch(url);
  const data = await response.json();

  showMovies(data.results);
}

function getClassByRate(rating) {
  if (rating >= 8) {
    return "green";
  } else if (rating >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

function showMovies(movies) {
  main.innerHTML = "";

  if (movies.length > 0) {
    let count = 1;
    movies.forEach((movie) => {
      const { poster_path, title, vote_average, backdrop_path, overview } =
        movie;

      const movieEl = document.createElement("div");
      movieEl.classList.add("movie");

      movieEl.innerHTML = `
                    <img src="https://source.unsplash.com/random/200x200?sig=${count}" alt="${title}">
    
                    <div class="movie-info">
                        <h3>${title.substr(0, 10)}...</h3>
                        <span class="${getClassByRate(
                          vote_average
                        )}">${vote_average}</span>
                    </div>
                    <div class="overview">
                        <h4>Overview</h4>
                        ${overview}
                    </div>
                    `;

      main.appendChild(movieEl);

      count++;
    });
  } else {
    alert("no movies found");
    getMovies(APIURL);
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm) {
    getMovies(SEARCHAPI + searchTerm);
    search.value = "";
  }
});
