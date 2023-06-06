const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280/";

const main = document.getElementById("karoo");
const similar = document.getElementById("similar");

const movie = localStorage.getItem("movie");
localStorage.setItem("movie", movie);
const movieData = JSON.parse(movie);

const myImage = document.getElementById("ls");
myImage.src = IMG_PATH + movieData.backdrop_path;

const movieDesc = document.createElement("div");
movieDesc.classList.add("container");

movieDesc.innerHTML = `
<!--  <img src="${IMG_PATH + movieData.backdrop_path}" >-->
<div class="movie-row">
    <img class="movie-img" src="${IMG_PATH + movieData.poster_path}"/>
    <div class="texts">
        <h1>${movieData.title}</h1>
        <p>${movieData.overview}</p>
        <p>${movieData.original_language}</p>
        <p class="${getClassByVote(movieData.vote_average)}">
        ${movieData.vote_average}
        </p>
      </div>
</div>
`;

main.appendChild(movieDesc);

getMovies(API_URL);

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();
  showMovies(data.results);
}
function showMovies(movies) {
  similar.innerHTML = " ";
  const smallMovies = (movies = movies
    .sort(() => Math.random() - Math.random())
    .slice(0, 3));
  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    movieEl.innerHTML = `
          <img class="kako"src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
            <h4>${title}</h4>
            <span class="${getClassByVote(vote_average)}">${vote_average}</span>
              </div>
              <div class="overview">
            <h3>Overview</h3>
            ${overview}
          </div>

      `;

    similar.appendChild(movieEl);
    movieEl.addEventListener("click", () => {
      localStorage.setItem("movie", JSON.stringify(movie));

      window.location = "movie.html";
    });
  });
}

function getClassByVote(vote) {
  if (vote >= 7) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

const container = document.querySelector(".container1");
const seats = document.querySelectorAll(".row1 .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
let ticketPrice = 10;

const selectedSeats = document.querySelectorAll(".row1 .seat.selected");

function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row1 .seat.selected");
  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    updateSelectedCount();
  }
});

btn.addEventListener("click", () => {
  const seats = document.querySelectorAll(".row1 .seat.selected");
  const seatnums = [];
  seats.forEach((s) => {
    seatnums.push(s.getAttribute("value"));
  });

  localStorage.setItem("seatnums", JSON.stringify(seatnums));

  window.location = "../checkout/checkout.html";
});
