const reminders = [];
const addButton = document.getElementById('addButton');
const showButton = document.getElementById('showButton');
const reminderTableBody = document.getElementById('reminderTableBody');

addButton.addEventListener('click', function() {
    const title = document.getElementById('titleInput').value.trim();
    const priority = document.getElementById('priorityInput').value.trim();
    const color = document.getElementById('colorInput').value;
    const description = document.getElementById('descriptionInput').value.trim();

    if (title && priority && color && description) {
        const reminder = { title, priority, color, description };
        reminders.push(reminder);
        clearInputs();
        alert('Reminder added!');
    } else {
        alert('Please fill in all fields.');
    }
});

showButton.addEventListener('click', function() {
    reminderTableBody.innerHTML = ''; 

    reminders.forEach(reminder => {
        const row = document.createElement('tr');
        const titleCell = document.createElement('td');
        const priorityCell = document.createElement('td');
        const descriptionCell = document.createElement('td');

        titleCell.textContent = reminder.title;
        titleCell.style.color = reminder.color; 
        priorityCell.textContent = reminder.priority;
        descriptionCell.textContent = reminder.description;

        row.appendChild(titleCell);
        row.appendChild(priorityCell);
        row.appendChild(descriptionCell);
        reminderTableBody.appendChild(row);
    });
});

function clearInputs() {
    document.getElementById('titleInput').value = '';
    document.getElementById('priorityInput').value = '';
    document.getElementById('colorInput').value = '#000000'; 
    document.getElementById('descriptionInput').value = '';
}
