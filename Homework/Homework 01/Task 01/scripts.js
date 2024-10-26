const movies = [
  "Reservoir Dogs",
  "The Matrix reloaded",
  "Baby driver",
  "Spiderman 2",
  "Titanic",
  "Batman"
];

const searchButton = document.getElementById('searchButton');
const movieInput = document.getElementById('movieInput');
const resultMessage = document.getElementById('resultMessage');

searchButton.addEventListener('click', function() {
  const input = movieInput.value.trim().toLowerCase();
  if (input) {
      const foundMovie = movies.some(movie => movie.toLowerCase() === input);
      if (foundMovie) {
          resultMessage.textContent = "The movie can be rented";
          resultMessage.style.color = "green";
      } else {
          resultMessage.textContent = "The movie can't be rented";
          resultMessage.style.color = "red";
      }
  } else {
      resultMessage.textContent = ""; // Clear message if input is empty
  }
});
