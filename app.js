const byId = (id) => document.getElementById(id);
const currency = new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 0 });
const dateLabel = (date, options) => new Date(date + 'T12:00:00+02:00').toLocaleDateString('en-ZA', { ...options, timeZone: 'Africa/Johannesburg' });
const shortDate = (date) => dateLabel(date, { weekday: 'short', day: 'numeric', month: 'short' });
const fullDate = (date) => dateLabel(date, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
const priceLabel = (price) => price ? currency.format(price) : 'Free';
const picture = (event) => '<img src="assets/' + event.image + '.jpg" alt="' + event.alt + '">';
const months = [...new Set(events.map((event) => event.date.slice(0, 7)))];
const categories = ['All events', ...new Set(events.map((event) => event.category))];
const storageKey = 'outthere.confirmation';
const view = byId('view');
let category = categories[0];
let latestBooking;

byId('categories').innerHTML = categories.map((item, index) =>
  '<button type="button" class="chip" aria-pressed="' + (index === 0) + '">' + item + '</button>'
).join('');
byId('month').insertAdjacentHTML('beforeend', months.map((month) =>
  '<option value="' + month + '">' + dateLabel(month + '-01', { month: 'long', year: 'numeric' }) + '</option>'
).join(''));

function renderCards() {
  const search = byId('query').value.trim().toLowerCase();
  const month = byId('month').value;
  const type = byId('type').value;
  const matches = events.filter((event) =>
    event.name.toLowerCase().includes(search) &&
    (category === categories[0] || event.category === category) &&
    (!month || event.date.startsWith(month)) &&
    (!type || event.type === type)
  );
  byId('result-count').textContent = matches.length + (matches.length === 1 ? ' event' : ' events');
  byId('cards').innerHTML = matches.map((event) => `
    <article class="card">
      ${picture(event)}
      <div class="card-body">
        <p class="eyebrow">${event.category} · ${event.type}</p>
        <h3>${event.name}</h3>
        <p><strong>${shortDate(event.date)} · ${event.time}</strong><br>${event.venue} · ${priceLabel(event.price)}</p>
        <p class="muted">${event.summary}</p>
        <a class="button small" href="#event/${event.id}" aria-label="View details for ${event.name}">View details ↗</a>
      </div>
    </article>`
  ).join('') || '<div class="panel empty">No events match those filters. <button class="chip" id="clear" type="button">Clear filters</button></div>';
}

function selectCategory(selected) {
  category = selected;
  byId('categories').querySelectorAll('button').forEach((button) =>
    button.setAttribute('aria-pressed', String(button.textContent === category))
  );
  renderCards();
}

byId('categories').addEventListener('click', ({target}) => {
  if (target.matches('button')) selectCategory(target.textContent);
});
byId('query').addEventListener('input', renderCards);
byId('month').addEventListener('change', renderCards);
byId('type').addEventListener('change', renderCards);
byId('cards').addEventListener('click', ({target}) => {
  if (target.id !== 'clear') return;
  for (const id of ['query', 'month', 'type']) byId(id).value = '';
  selectCategory(categories[0]);
  byId('query').focus();
});

const back = '<a class="text-link" href="#events">← All events</a>';

function showEvent(event) {
  view.innerHTML = `${back}
    <h1 tabindex="-1">${event.name}</h1><p class="eyebrow">${event.category} · ${event.type}</p>
    <div class="detail-grid">
      <article>
        ${picture(event)}
        <h2>About this event</h2><p>${event.description}</p>
        <h2>Schedule</h2><ul>${event.schedule.map(([time, activity]) => `<li><strong>${time}</strong> · ${activity}</li>`).join('')}</ul>
        <h2>Organizer</h2><p>${event.organizer}<br><a href="mailto:${event.email}">${event.email}</a></p>
      </article>
      <aside class="panel">
        <h2>When and where</h2><p>${fullDate(event.date)} · ${event.time} SAST<br><strong>${event.venue}</strong><br>${event.address}</p>
        <hr><h2>Tickets</h2><p>${priceLabel(event.price)} · General admission<br>Up to 8 tickets per request</p>
        <a class="button" href="#book/${event.id}">${event.price ? 'Book tickets' : 'Register'} ↗</a>
      </aside>
    </div>`;
}

function showBooking(eventId) {
  view.innerHTML = `${eventId ? '<a class="text-link" href="#event/' + eventId + '">← Event details</a>' : back}
    <h1 tabindex="-1">Book tickets</h1>
    <div class="panel booking"><form id="booking-form">
      <label>Event<select name="event" required><option value="">Choose an event</option>
      ${events.map((event) => `<option value="${event.id}" ${event.id === eventId ? 'selected' : ''}>${event.name} · ${priceLabel(event.price)}</option>`).join('')}
      </select></label>
      <label>Full name<input name="fullName" autocomplete="name" minlength="2" maxlength="100" required></label>
      <label>Email address<input name="email" type="email" autocomplete="email" maxlength="254" required></label>
      <label>Phone number<input name="phone" type="tel" autocomplete="tel" maxlength="24" required></label>
      <label>Number of tickets<input name="quantity" type="number" min="1" max="8" step="1" value="1" required></label>
      <p id="total" role="status"></p>
      <p class="muted">Demo booking. Your confirmation is saved in this browser.</p>
      <button class="button" type="submit">Submit booking request ↗</button>
    </form></div>`;
  // Validate phone length by digits so spaces and separators cannot satisfy the field.
  const form = byId('booking-form');
  const {fullName, phone, event, quantity} = form.elements;
  function updateTotal() {
    const selected = events.find((item) => item.id === event.value);
    const count = quantity.valueAsNumber;
    byId('total').textContent = selected && Number.isInteger(count) && count >= 1 && count <= 8
      ? 'Ticket total: ' + priceLabel(selected.price * count) : '';
  }

  function validateContact() {
    fullName.setCustomValidity(fullName.value.trim().length >= 2 ? '' : 'Enter your full name.');
    const digits = phone.value.replace(/\D/g, '');
    const validPhone = /^\+?[\d ()-]+$/.test(phone.value.trim()) && digits.length >= 7 && digits.length <= 15;
    phone.setCustomValidity(validPhone ? '' : 'Enter a phone number with 7 to 15 digits.');
  }

  form.addEventListener('input', () => { validateContact(); updateTotal(); });
  form.addEventListener('submit', (submit) => {
    submit.preventDefault();
    validateContact();
    if (!form.reportValidity()) return;
    const selected = events.find((item) => item.id === event.value);
    if (!selected) return;
    const random = new Uint32Array(1);
    crypto.getRandomValues(random);
    latestBooking = { eventId: selected.id, quantity: quantity.valueAsNumber, reference: random[0].toString(16).padStart(8, '0').toUpperCase() };
    try {
      sessionStorage.setItem(storageKey, JSON.stringify(latestBooking));
    } catch {
      // A browser with storage disabled can still display the in-memory receipt.
    }
    location.hash = 'confirmation';
  });
  updateTotal();
}

function showConfirmation() {
  let booking = latestBooking;
  if (!booking) {
    try { booking = JSON.parse(sessionStorage.getItem(storageKey)); } catch { booking = null; }
  }
  const event = events.find((item) => item.id === booking?.eventId);
  if (!event || !/^[0-9A-F]{8}$/.test(booking.reference) ||
      !Number.isInteger(booking.quantity) || booking.quantity < 1 || booking.quantity > 8) {
    showMissing('No booking confirmation available');
    return;
  }
  view.innerHTML = `${back}<h1 tabindex="-1">Booking request received</h1>
    <div class="panel booking"><p class="eyebrow">DEMO CONFIRMATION</p>
    <h2>${event.name}</h2><p>${fullDate(event.date)} · ${event.time} SAST<br>${event.venue}</p>
    <p>${booking.quantity} ${booking.quantity === 1 ? 'ticket' : 'tickets'} · ${priceLabel(event.price * booking.quantity)}</p>
    <p>Reference <span class="ref">OT-${booking.reference}</span></p>
    <p class="muted">This confirmation is for your demo request. No payment was taken.</p>
    <a class="button" href="#events">Explore more events ↗</a></div>`;
}

function showMissing(message) {
  view.innerHTML = `${back}<h1 tabindex="-1">${message}</h1>`;
}

function route() {
  const hash = location.hash.slice(1);
  const [page, id] = hash.split('/');
  const isHome = ['', 'home', 'events', 'main'].includes(hash);
  const event = events.find((item) => item.id === id);
  const wasHome = !byId('home').hidden;
  byId('home').hidden = !isHome;
  view.hidden = isHome;

  if (isHome) {
    document.title = 'OutThere | Cape Town events';
    if (hash === 'events') byId('events').scrollIntoView();
    else if (hash === 'home' || !wasHome) window.scrollTo({top: 0, behavior: 'instant'});
    if (!wasHome) {
      const heading = document.querySelector(hash === 'events' ? '#events h2' : '#home h1');
      heading.tabIndex = -1;
      heading.focus({preventScroll: true});
    }
    return;
  }

  if (page === 'event' && event) showEvent(event);
  else if (page === 'book' && (!id || event)) showBooking(id);
  else if (page === 'confirmation' && !id) showConfirmation();
  else showMissing('Event page unavailable');

  const heading = view.querySelector('h1');
  document.title = heading.textContent + ' | OutThere';
  window.scrollTo({top: 0, behavior: 'instant'});
  heading.focus({preventScroll: true});
}

window.addEventListener('hashchange', route);
renderCards();
route();
