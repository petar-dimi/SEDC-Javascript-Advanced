const fetchButton = document.getElementById('fetchButton');
const personName = document.getElementById('personName');
const statsTableBody = document.getElementById('statsTableBody');

fetchButton.addEventListener('click', async function() {
    try {
        const response = await fetch('https://swapi.dev/api/people/1');
        const data = await response.json();

        
        personName.textContent = data.name;

        
        statsTableBody.innerHTML = '';

        
        const stats = [
            { stat: 'Height', value: data.height },
            { stat: 'Weight', value: data.mass },
            { stat: 'Eye Color', value: data.eye_color },
            { stat: 'Hair Color', value: data.hair_color },
        ];

        
        stats.forEach(item => {
            const row = document.createElement('tr');
            const statCell = document.createElement('td');
            const valueCell = document.createElement('td');

            statCell.textContent = item.stat;
            valueCell.textContent = item.value;

            row.appendChild(statCell);
            row.appendChild(valueCell);
            statsTableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        personName.textContent = 'Failed to fetch data.';
        statsTableBody.innerHTML = '';
    }
});
