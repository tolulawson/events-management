const { $ } = window;

const categories = {
  meet: 'Meet Up',
  leap: 'Leap',
  recruiting: 'Recruiting Mission',
  hack: 'VanHackaton',
};

const eventData = [
  {
    id: '001',
    image: 'https://joblandingacademy.com/wp-content/uploads/2018/05/2-simple-ways-persuade-hiring-managers-hire-you-700x420.png',
    category: 'meet',
    title: 'Four steps to increase your chances to get hired',
    location: 'Vancouver',
    date: 'October 27, 2020',
    time: '9AM (PST)',
    description: 'She has reviewed tons of profiles before and will share all the insights that work EVERY TIME. VanHack allows you to make specific searches to match you with a job that you would enjoy and succeed at. The results will point you to available positions much closer aligned to your desires. Don’t waste time filling out a bunch of applications to places you are only semi-interested in. Instead, take the time to figure out the type of position you would really enjoy.',
    premium: false,
  },
  {
    id: '002',
    image: 'https://www.jobberman.com/blog/wp-content/uploads/sites/8/2020/09/Jobberman_How_Can_You_Get_Hired_with_No_Experience_Cover.png',
    category: 'leap',
    title: 'How Can You Get Hired with No Experience',
    location: 'Online',
    date: 'October 29, 2020',
    time: '11AM (PST)',
    description: 'You need experience to get a job, but you need a job to get experience, sounds Ludacris right? Maybe you just graduated and you’re out in the market looking for your first real job. Or perhaps you’re looking for a career change and ready to try something totally new. But either way, you’re probably facing a major challenge for job seekers – trying to get a job without experience.',
    premium: false,
  },
  {
    id: '003',
    image: 'https://vanhackblobstorageprod.blob.core.windows.net/img/events/cover/5d632363-4930-4806-9993-0adba0adc64f.jpg',
    category: 'recruiting',
    title: 'Virtual Hiring Event - DevOps',
    location: 'Online',
    date: 'November 3, 2020',
    time: '4PM (PST)',
    description: "VanHack is doing a Virtual Hiring Event to connect the best DevOps professionals with some of Canada and Europe's fastest-growing companies. If you are a DevOps looking to get hired abroad, that's the opportunity you were looking for.",
    premium: true,
  },
  {
    id: '004',
    image: 'https://joblandingacademy.com/wp-content/uploads/2018/05/2-simple-ways-persuade-hiring-managers-hire-you-700x420.png',
    category: 'hack',
    title: 'Four steps to increase your chances to get hired',
    location: 'Vancouver',
    date: 'November 6, 2020',
    time: '9AM (PST)',
    description: 'She has reviewed tons of profiles before and will share all the insights that work EVERY TIME. VanHack allows you to make specific searches to match you with a job that you would enjoy and succeed at. The results will point you to available positions much closer aligned to your desires. Don’t waste time filling out a bunch of applications to places you are only semi-interested in. Instead, take the time to figure out the type of position you would really enjoy.',
    premium: true,
  },
  {
    id: '005',
    image: 'https://joblandingacademy.com/wp-content/uploads/2018/05/2-simple-ways-persuade-hiring-managers-hire-you-700x420.png',
    category: 'meet',
    title: 'Four steps to increase your chances to get hired',
    location: 'Vancouver',
    date: 'November 6, 2020',
    time: '9AM (PST)',
    description: 'She has reviewed tons of profiles before and will share all the insights that work EVERY TIME. VanHack allows you to make specific searches to match you with a job that you would enjoy and succeed at. The results will point you to available positions much closer aligned to your desires. Don’t waste time filling out a bunch of applications to places you are only semi-interested in. Instead, take the time to figure out the type of position you would really enjoy.',
    premium: false,
  },
];

$(() => {
  const model = {
    events: eventData,
    eventsApplied: new Set(),
  };

  const cardsView = {
    init() {
      this.cardsContainer = $('.events-container');
      this.events = controller.getAllEvents().slice(1);
      this.render();
    },

    render() {
      appendEvents(this.events, this.cardsContainer, 'cards');
    },
  };

  const heroView = {
    init() {
      this.heroContainer = $('.hero');
      this.events = controller.getSingleEvent('001');
      this.render();
      $('.btn.hero').click((event) => {
        controller.applyForEvent($(event.target).parents('.event').data('id'));
      });
    },

    markRegisteredEvents() {
      controller.getAppliedEvents()
        .forEach((eventId) => {
          $(`[data-id="${eventId}"]`);
        })
    },

    render() {
      appendEvents(this.events, this.heroContainer, 'hero');
    },
  };

  const popupView = {
    init() {
      this.popupContainer = $('.event-modal');
    },
    render(id) {
      this.popupContainer.empty();
      const event = controller.getSingleEvent(id);
      appendEvents(event, this.popupContainer, 'popup', controller.isEventApplied(id));
      $('.share-button').click((e) => {
        e.preventDefault();
      })
      $('.apply-btn.popup').click((e) => {
        e.preventDefault();
        if (controller.getSingleEvent(id)[0].premium) {
          $('.premium-modal').append(`
            <div class="modal-content">
              <div class="logo-row">
                <img src="https://vanhack.com/platform/7fefa6b1dc9802203f976c49b68a47bf.svg" alt="VanHack logo">
                <span class="premium-label">Premium Event</span>
              </div>
              <div>
                This event is open to only Premium members of VanHack. Premium members enjoy an impressive array of benefits.
              </div>
              <button type="button" name="button" class="apply-btn premium">Subscribe to Premium</button>
            </div>
            `)
            .modal({
              closeExisting: false,
            });
        } else {
          controller.applyForEvent(id, e);
        }
      });
    },
  };

  const controller = {
    init() {
      heroView.init();
      cardsView.init();
      popupView.init();
      $('.apply-btn.hero')
        .add('.apply-btn.cards')
        .click((event) => {
          event.preventDefault();
          const eventId = $(event.target).parents('.event').data('id');
          popupView.render(eventId);
          $('.event-modal').modal({
            fadeDuration: 60,
          });
        });
    },
    getAllEvents() {
      return model.events;
    },
    getSingleEvent(id) {
      return model.events.filter((event) => event.id === id);
    },
    applyForEvent(id, e) {
      model.eventsApplied.add(id);

      $(e.target).parents('.attend-row')
        .append('<span class="attending">Registration successful! Check your email for details</span>');

      $(`*[data-id="${id}"]`)
        .not('.popup')
        .find('.attend-row')
        .append('<span class="attending">Attending</span>');
    },
    getAppliedEvents() {
      return model.eventsApplied;
    },
    isEventApplied(id) {
      return model.eventsApplied.has(id);
    },
  };

  controller.init();
});

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
          <a href="#" class="share-button">
            <svg width="27" height="27" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M31.6667 12.6667C35.1645 12.6667 38 9.83114 38 6.33333C38 2.83553 35.1645 0 31.6667 0C28.1689 0 25.3333 2.83553 25.3333 6.33333C25.3333 6.59826 25.3496 6.85939 25.3812 7.11578L10.73 14.4414C9.59088 13.3425 8.04104 12.6667 6.33333 12.6667C2.83553 12.6667 0 15.5022 0 19C0 22.4978 2.83553 25.3333 6.33333 25.3333C8.04104 25.3333 9.59088 24.6575 10.73 23.5586L25.3812 30.8842C25.3496 31.1406 25.3333 31.4017 25.3333 31.6667C25.3333 35.1645 28.1689 38 31.6667 38C35.1645 38 38 35.1645 38 31.6667C38 28.1689 35.1645 25.3333 31.6667 25.3333C29.959 25.3333 28.4091 26.0092 27.27 27.1081L12.6188 19.7824C12.6504 19.5261 12.6667 19.2649 12.6667 19C12.6667 18.7351 12.6504 18.4739 12.6188 18.2176L27.27 10.8919C28.4091 11.9908 29.959 12.6667 31.6667 12.6667Z" fill="#213757"/>
            </svg>
          </a>
          <ul>
            <p>Share</p>
            <li class="share-link"><a href="" class="fb" target="_blank">Facebook</a></li>
            <li class="share-link"><a href="#" class="tw" target="_blank">Twitter</a></li>
            <li class="share-link"><a href="#" class="li" target="_blank">LinkedIn</a></li>
          </ul>
        </span>` : ''}

      </div>

      <div class="event-details">
        ${container === 'hero' ? '<span class="up-next">Up next</span>' : ''}
        <h3 class="event-title">
          ${title}
        </h3>
        <div class="event-info-row">
          <div class='date-time'>
            <span class="event-info location">${location}</span>
            <span class="event-info date">${date}</span>
            ${container === 'popup' ? '<span class="event-info time">' : ''}
            ${container === 'popup' ? time : ''}
            ${container === 'popup' ? '</span>' : ''}
          </div>
          ${premium && container !== 'hero' ? '<span class="premium-label">Premium Event</span>' : ''}
        </div>
        <div class="event-description">
          ${container === 'popup' ? description : ''}
        </div>
        <div class="attend-row">
          <button ${container === 'popup' && registered ? 'disabled' : ''} class="apply-btn ${container}" rel="modal:open">${container === 'popup' ? 'Apply' : 'View Details'}</button>
          ${registered && container === 'popup' ? '<span class="attending">You’re registered to attend this event</span>' : ''}
        </div>
      </div>`,
    );

  return el;
}

function appendEvents(eventList, el, container, registered) {
  eventList.forEach((event) => {
    el.append(generateEvent({
      container,
      registered,
      ...event,
    }));
  });
}
