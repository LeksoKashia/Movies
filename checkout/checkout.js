const IMG_PATH = "https://image.tmdb.org/t/p/w1280/";
const movie = JSON.parse(localStorage.getItem("movie"));
const seatnums = JSON.parse(localStorage.getItem("seatnums"));
const kaka = document.querySelector(".container2");
const movie_title = document.createElement("h1");
movie_title.innerHTML = "Movie: " + movie.title;
kaka.appendChild(movie_title);

seatnums.forEach((seat) => {
  const s = document.createElement("div");
  s.classList.add("rows");
  s.innerHTML = `
  <div class="seat-info"> 

  <p>row - <strong>${seat[0]}</strong></p>
  <p>seat - <strong>${seat[2]}</strong></p>
  </div>
    <p class="price">Price: <strong>10 $</strong></p>`;
  kaka.appendChild(s);
});

const total_amount = document.createElement("h1");
total_amount.innerHTML = "Total amount: " + seatnums.length * 10 + " $";
kaka.appendChild(total_amount);
