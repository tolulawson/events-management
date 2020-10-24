(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
    premium: true,
    registered: false,
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
    registered: false,
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
    registered: false,
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
    registered: false,
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
    premium: true,
    registered: false,
  },
];

$(() => {
  const model = {
    events: eventData,
    eventsApplied: new Set(),
  };

  const cardsView = {
    init() {
      this.cardsContainer = $('.main');
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
      this.popupContainer = $('.modal');
    },
    render(id) {
      const event = controller.getSingleEvent(id);
      appendEvents(event, this.popupContainer, 'popup');
    },
  }

  const controller = {
    init() {
      heroView.init();
      cardsView.init();
      $('.apply-btn').click((event) => {
        $('#modal-toggle')[0].click();
        controller.applyForEvent($(event.target).parents('.event').data('id'));
      });
    },
    getAllEvents() {
      return model.events;
    },
    getSingleEvent(id) {
      return model.events.filter((event) => event.id === id)
    },
    applyForEvent(id) {
      model.eventsApplied.add(id);
    },
    getAppliedEvents() {
      return model.eventsApplied;
    }
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
          <button class="apply-btn ${container}" rel="modal:open">${container === 'popup' ? 'Apply' : 'View Details'}</button>
        </div>
      </div>`,
    );

  return el;
}

function appendEvents(eventList, el, container) {
  eventList.forEach((event) => {
    el.append(generateEvent({
      container,
      ...event,
    }));
  });
}

},{}]},{},[1]);
