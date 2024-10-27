const API_URL = 'https://api.punkapi.com/v2/beers';

// Fetch beers data
async function fetchBeers() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching beer data:', error);
    }
}

// Display beers with pagination, sorting, and search
async function displayBeers() {
    const beers = await fetchBeers();
    const perPageSelect = document.getElementById('per-page');
    const sortSelect = document.getElementById('sort');
    const searchInput = document.getElementById('search');
    const beerList = document.getElementById('beer-list');
    const pagination = document.getElementById('pagination');

    let currentPage = 1;
    let beersPerPage = parseInt(perPageSelect.value);
    let filteredBeers = beers;

    function renderBeers() {
        beerList.innerHTML = '';
        const start = (currentPage - 1) * beersPerPage;
        const end = start + beersPerPage;
        const paginatedBeers = filteredBeers.slice(start, end);

        paginatedBeers.forEach(beer => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <h2>${beer.name}</h2>
                <p><strong>Tagline:</strong> ${beer.tagline}</p>
                <p><strong>First Brewed:</strong> ${beer.first_brewed}</p>
                <p><strong>Description:</strong> ${beer.description}</p>
                <p><strong>ABV:</strong> ${beer.abv}%</p>
                <p><strong>IBU:</strong> ${beer.ibu} IBU</p>
                <a href="#" onclick="showDetails(${beer.id})">More Details</a>
            `;
            beerList.appendChild(listItem);
        });
        renderPagination();
    }

    function renderPagination() {
        pagination.innerHTML = '';
        const totalPages = Math.ceil(filteredBeers.length / beersPerPage);
        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement('button');
            button.innerText = i;
            button.onclick = () => {
                currentPage = i;
                renderBeers();
            };
            pagination.appendChild(button);
        }
    }

    perPageSelect.onchange = () => {
        beersPerPage = parseInt(perPageSelect.value);
        currentPage = 1;
        renderBeers();
    };

    sortSelect.onchange = () => {
        const sortValue = sortSelect.value.split('-');
        const sortBy = sortValue[0];
        const order = sortValue[1];

        filteredBeers = [...beers].sort((a, b) => {
            if (sortBy === 'name') {
                return order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
            } else if (sortBy === 'abv') {
                return order === 'asc' ? a.abv - b.abv : b.abv - a.abv;
            } else if (sortBy === 'ibu') {
                return order === 'asc' ? a.ibu - b.ibu : b.ibu - a.ibu;
            }
            return 0;
        });
        currentPage = 1;
        renderBeers();
    };

    searchInput.oninput = () => {
        const searchTerm = searchInput.value.toLowerCase();
        filteredBeers = beers.filter(beer => beer.name.toLowerCase().includes(searchTerm));
        currentPage = 1;
        renderBeers();
    };

    renderBeers();
}

// Show beer details in an alert
function showDetails(id) {
    fetch(`${API_URL}/${id}`)
        .then(response => response.json())
        .then(data => {
            const beer = data[0];
            alert(`
                Name: ${beer.name}
                Tagline: ${beer.tagline}
                First Brewed: ${beer.first_brewed}
                Description: ${beer.description}
                ABV: ${beer.abv}%
                IBU: ${beer.ibu} IBU
                Food Pairing: ${beer.food_pairing.join(', ')}
            `);
        });
}

// Fetch and display a random beer
async function fetchRandomBeer() {
    try {
        const response = await fetch(`${API_URL}/random`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const beer = await response.json();
        displayRandomBeer(beer[0]);
    } catch (error) {
        console.error('Error fetching random beer:', error);
    }
}

// Display random beer details
function displayRandomBeer(beer) {
    const randomBeerDiv = document.getElementById('random-beer');
    randomBeerDiv.innerHTML = `
        <h2>${beer.name}</h2>
        <p><strong>Tagline:</strong> ${beer.tagline}</p>
        <p><strong>First Brewed:</strong> ${beer.first_brewed}</p>
        <p><strong>Description:</strong> ${beer.description}</p>
        <p><strong>ABV:</strong> ${beer.abv}%</p>
        <p><strong>IBU:</strong> ${beer.ibu} IBU</p>
        <p><strong>Food Pairing:</strong> ${beer.food_pairing.join(', ')}</p>
        <img src="${beer.image_url}" alt="${beer.name}" style="max-width: 200px;">
    `;
}

// Event listener for the Random Beer button
document.getElementById('get-random-beer')?.addEventListener('click', fetchRandomBeer);

// Initialize the beer list and random beer on page load
if (document.getElementById('beer-list')) {
    displayBeers();
} else if (document.getElementById('random-beer')) {
    fetchRandomBeer();
}
