// const consumerKey = 'EGzZa0Jvwm4AMHpN1AZK1ThqRMyMAp80';
// const consumerSecret = 'ZGaYZdP9PNrFnF6A';
// pagination.js
let accessToken = 'EGzZa0Jvwm4AMHpN1AZK1ThqRMyMAp80'; // Убедитесь, что accessToken правильно установлен

console.log('Access Token:', accessToken);

async function fetchEvents(page = 0) {
    try {
        const response = await fetch(`http://localhost:1234/api/events?page=${page}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data._embedded ? data._embedded.events : [];
    } catch (error) {
        console.error('Ошибка получения событий:', error);
        return [];
    }
}

document.getElementById('load-more-button').addEventListener('click', async () => {
    const page = parseInt(document.querySelector('meta[name="current-page"]').content) || 0;
    const events = await fetchEvents(page);
    renderEvents(events);
    document.querySelector('meta[name="current-page"]').content = page + 1;
});

function renderEvents(events) {
    const container = document.getElementById('data-container');
    events.forEach(event => {
        const eventElement = document.createElement('div');
        eventElement.className = 'item';
        eventElement.innerHTML = `
            <picture>
                <img class="picture__body" src="${event.imageUrl}" alt="${event.name}">
            </picture>
            <h2 class="picture___title">${event.name}</h2>
            <p class="picture____text">${event.date}</p>
            <svg class="location-icon">
                <use href="./svg/symbol-defs1.svg#icon-vector-11"></use>
            </svg>
            <p class="picture_____text-two">${event.location}</p>
        `;
        container.appendChild(eventElement);
    });
}


const credentials = Buffer.from('EGzZa0Jvwm4AMHpN1AZK1ThqRMyMAp80:ZGaYZdP9PNrFnF6A').toString('base64');
console.log(credentials);