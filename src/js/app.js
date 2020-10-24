const $ = require('jquery');

const categories = {
  meet: 'Meet Up',
  leap: 'Leap',
  recruiting: 'Recruiting Mission',
  hack: 'VanHackaton',
};

function generateEvent({
  id,
  container,
  image,
  category,
  title,
  location,
  date,
  time,
  description,
  premium,
  registered,
}) {
  const el = $(`<div class='event ${container}' data-id=${id}></div>`);
  el
    .append(
      `<div class="image">
        <img src="${image}" alt="event-image">
        <span class="label ${category}">${categories[category]}</span>
        ${container === 'popup' ? `<span class="share">
          <a href="" class="share-button">Share</a>
          <ul>
            <li class="share-link fb"><a href="#">Facebook</a></li>
            <li class="share-link tw"><a href="#">Twitter</a></li>
            <li class="share-link ig"><a href="#">Instagram</a></li>
          </ul>
        </span>` : ''}

      </div>

      <div class="event-details">
        ${container === 'hero' ? '<span class="up-next">Up next</span>' : ''}
        <h3 class="event-title">
          ${title}
        </h3>
        <div class="event-info-row">
          <div>
            <span class="event-info location">${location}</span>
            <span class="event-info date">${date}</span>
            ${container === 'popup' ? '<span class="event-info time">' : ''}
            ${container === 'popup' ? time : ''}
            ${container === 'popup' ? '</span>' : ''}
          </div>
          ${premium && container !== 'hero' ? '<span class="premium-label">Premium-only event</span>' : ''}
        </div>
        <div class="event-description">
          ${description}
        </div>
        <div class="attend-row">
          <button class="btn card">${container === 'popup' ? 'Apply' : 'View Details'}</button>
        </div>
      </div>`,
    );

  return el;
}

$(() => {
  $('.main').append(generateEvent({
    id: '001',
    container: 'popup',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Outdoors-man-portrait_%28cropped%29.jpg/440px-Outdoors-man-portrait_%28cropped%29.jpg',
    category: 'meet',
    title: 'Four steps to increase your chances to get hired',
    location: 'Vancouver',
    date: '20th November',
    time: '10am',
    description: 'Fernanda Reis will share valuable tips',
    premium: true,
    registered: true,
  }));
});
