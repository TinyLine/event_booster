import Handlebars from 'handlebars';

const API_KEY = 'EGzZa0Jvwm4AMHpN1AZK1ThqRMyMAp80';
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/events.json';
let offset = 0;
const LIMIT = 4;


async function fetchEvents(city, offset) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        apikey: API_KEY,
        city: city,
        size: LIMIT,
        offset: offset,
      },
    });

    if (response.data?._embedded?.events) {
      const events = response.data._embedded.events;
      displayEvents(events);
    } else {
      console.error('No events found.');
      document.getElementById('events-container').textContent = 'No events found.';
    }
  } catch (error) {
    console.error('Error fetching events:', error);
    document.getElementById('events-container').textContent = 'Failed to load events.';
  }
}

function displayEvents(events) {
  const container = document.getElementById('events-container');
  if (!events || events.length === 0) {
    if (offset === 0) {
      container.textContent = 'No events found.';
    }
    return;
  }

  const transformedEvents = events.map(event => {
    const imageUrl = event.images.find(img => img.width > 600)?.url || 'default-image.jpg';

    return {
      name: event.name,
      date: new Date(event.dates.start.dateTime).toLocaleDateString(),
      venue: event._embedded.venues[0]?.name || 'Unknown venue',
      image: imageUrl,
      itemClass: 'item',
    };
  });

  const source = document.getElementById('event-template').innerHTML;
  const template = Handlebars.compile(source);
  const html = template({ events: transformedEvents });
  container.innerHTML += html;
}

function loadMoreEvents() {
  offset += LIMIT;
  fetchEvents('', offset);
}

document.getElementById('load-more-btn').addEventListener('click', loadMoreEvents);

