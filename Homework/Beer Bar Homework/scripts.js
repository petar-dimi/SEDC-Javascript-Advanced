document.addEventListener("DOMContentLoaded", () => {
  const beerListEl = document.getElementById("beerList");
  const beersContainer = document.getElementById("beersContainer");
  const beerDetailsEl = document.getElementById("beerDetails");
  const randomBeerEl = document.getElementById("randomBeer");
  const itemsPerPageInput = document.getElementById("itemsPerPage");
  const sortBySelect = document.getElementById("sortBy");
  const searchInput = document.getElementById("search");
  const pageInfo = document.getElementById("pageInfo");

  let currentPage = 1;
  let beersPerPage = 10;
  let sortCriteria = "name-asc";
  let searchTerm = "";

  
  document.getElementById("beersLink").addEventListener("click", showBeers);
  document.getElementById("randomBeerLink").addEventListener("click", showRandomBeer);
  document.getElementById("applySort").addEventListener("click", applySort);

  async function fetchBeers(page = 1, perPage = 10, sort = "name-asc", query = "") {
      let url = `https://api.punkapi.com/v2/beers?page=${page}&per_page=${perPage}`;
      if (query) url += `&beer_name=${query}`;

      const response = await fetch(url);
      let beers = await response.json();

      beers = sortBeers(beers, sort);
      displayBeers(beers);
  }

  function sortBeers(beers, sort) {
      switch (sort) {
          case "name-asc":
              return beers.sort((a, b) => a.name.localeCompare(b.name));
          case "name-desc":
              return beers.sort((a, b) => b.name.localeCompare(a.name));
          case "abv-asc":
              return beers.sort((a, b) => a.abv - b.abv);
          case "abv-desc":
              return beers.sort((a, b) => b.abv - a.abv);
          case "ibu-asc":
              return beers.sort((a, b) => a.ibu - b.ibu);
          case "ibu-desc":
              return beers.sort((a, b) => b.ibu - a.ibu);
          default:
              return beers;
      }
  }

  function displayBeers(beers) {
      beersContainer.innerHTML = beers.map(beer => `
          <div class="beer-item">
              <h2>${beer.name}</h2>
              <p>${beer.tagline}</p>
              <button onclick="showBeerDetails(${beer.id})">More Details</button>
          </div>
      `).join("");
  }

  async function showBeerDetails(id) {
      const response = await fetch(`https://api.punkapi.com/v2/beers/${id}`);
      const [beer] = await response.json();

      beerDetailsEl.innerHTML = `
          <h2>${beer.name}</h2>
          <img src="${beer.image_url}" alt="${beer.name}" style="width: 100px;">
          <p><strong>Tagline:</strong> ${beer.tagline}</p>
          <p><strong>First Brewed:</strong> ${beer.first_brewed}</p>
          <p><strong>Description:</strong> ${beer.description}</p>
          <p><strong>ABV:</strong> ${beer.abv}%</p>
          <p><strong>IBU:</strong> ${beer.ibu}</p>
          <p><strong>Food Pairing:</strong> ${beer.food_pairing.join(", ")}</p>
      `;
      toggleDisplay("beerDetails");
  }

  async function showRandomBeer() {
      const response = await fetch(`https://api.punkapi.com/v2/beers/random`);
      const [beer] = await response.json();

      randomBeerEl.innerHTML = `
          <h2>${beer.name}</h2>
          <img src="${beer.image_url}" alt="${beer.name}" style="width: 100px;">
          <p><strong>Tagline:</strong> ${beer.tagline}</p>
          <p><strong>First Brewed:</strong> ${beer.first_brewed}</p>
          <p><strong>Description:</strong> ${beer.description}</p>
          <p><strong>ABV:</strong> ${beer.abv}%</p>
          <p><strong>IBU:</strong> ${beer.ibu}</p>
          <p><strong>Food Pairing:</strong> ${beer.food_pairing.join(", ")}</p>
      `;
      toggleDisplay("randomBeer");
  }

  function toggleDisplay(section) {
      beerListEl.classList.add("hidden");
      beerDetailsEl.classList.add("hidden");
      randomBeerEl.classList.add("hidden");

      document.getElementById(section).classList.remove("hidden");
  }

  function showBeers() {
      toggleDisplay("beerList");
      fetchBeers(currentPage, beersPerPage, sortCriteria, searchTerm);
  }

  function applySort() {
      beersPerPage = parseInt(itemsPerPageInput.value) || 10;
      sortCriteria = sortBySelect.value;
      searchTerm = searchInput.value;
      fetchBeers(currentPage, beersPerPage, sortCriteria, searchTerm);
  }
});
