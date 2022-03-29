import Cleaning from "./models/Cleaning.js";
import User from "./models/User.js";
import runHeader from "./header.js";

window.onload = () => {
  runHeader();
  // Ta in cleanings och user objekt från localstorage
  const cleanings = Cleaning.fetchCleanings();
  const users = User.fetchUsers();
  // Filtrera cleanings efter completed eller inte completed
  const completedCleanings = cleanings.filter((e) => e.finished === true);
  const bookedCleanings = cleanings.filter((e) => e.finished === false);

  // Give a number to total cleanings, (booked and completed)
  document.getElementById("bookedCleaningsCount").textContent =
    bookedCleanings.length;
  document.getElementById("completedCleaningsCount").textContent =
    completedCleanings.length;
  // Kallar funktionerna med de filtrerade arraysen
  createBookedCleanings(bookedCleanings);
  createCompletedCleanings(completedCleanings);

  // Kallar funktionen som populatar user med den första användaren i listan
  populateUser(users[0]);
};

// Funktion som skapar bookade cleanings kort
function createBookedCleanings(cleanings) {
  cleanings.forEach((cleaning) => {
    const html = `
    <div class="booked-cleaning__container__item" id='pre-card'>
    <div class="booked-cleaning__container__item__upper">
      <p class="booked-cleaning__container__item__upper__title">
        Städning
      </p>
      <p class="booked-cleaning__container__item__upper__date">
        ${new Date(cleaning.dateAndTimeString).toLocaleDateString()}
      </p>
    </div>
    <div class="booked-cleaning__container__item__lower">
      <p>${cleaning.description}</p>
    </div>
    <div class="button-container">
      <button class="deny-btn btn" id="cancel-btn" >Avboka</button>
    </div>
  </div>
    `;

    const BookedContainer = document.querySelector(
      ".booked-cleaning__container"
    );

    BookedContainer.insertAdjacentHTML("afterbegin", html);

    let cancelButton = document.getElementById('cancel-btn')
    if(cancelButton) {
      cancelButton.addEventListener('click', cancelHandeler)
    }

    function cancelHandeler() {
      document.getElementById('pre-card').remove()
    }
  });
}
// FÖR HÅRDKODADE KORTET +++++++++++++++++++++++
let cancelButton = document.getElementById('cancel-btn')
    if(cancelButton) {
      cancelButton.addEventListener('click', cancelHandeler)
    }

function cancelHandeler() {
  document.getElementById('pre-card').remove()
}
// FÖR HÅRDKODADE KORTET +++++++++++++++++++++++

// Funktion som skapar completed cleanings kort
function createCompletedCleanings(cleanings) {
  cleanings.forEach((cleaning) => {
    const html = `
        <div class="completed-cleaning__container__item" id="card">
        <div class="completed-cleaning__container__item__upper">
          <p class="completed-cleaning__container__item__upper__title">
            Städning
          </p>
          <p class="completed-cleaning__container__item__upper__date">
          ${new Date(cleaning.dateAndTimeString).toLocaleDateString()}
          </p>
        </div>
        <div class="completed-cleaning__container__item__lower">
          <p>${cleaning.description}</p>
        </div>
          <div class="accept-deny-container">
            <button class="accept-btn btn" id="accept-btn" >Godkänn 👍</button>
            <button class="deny-btn btn" id="deny-btn">Underkänn 👎</button>
          </div>
      </div>
        `;

    const CompletedContainer = document.querySelector(
      ".completed-cleaning__container"
    );
    CompletedContainer.insertAdjacentHTML("afterbegin", html);

    let acceptButton = document.getElementById('accept-btn')
    if(acceptButton) {
      acceptButton.addEventListener('click', acceptHandeler)
    }
    let denyButton = document.getElementById('deny-btn')
    if(denyButton) {
      denyButton.addEventListener('click', denyHandeler)
    }
    function acceptHandeler() {
      cleaning.acceptedByCustomer = 'accepted'
      document.getElementById('card').classList.add('accept-border')
      document.getElementById('accept-deny-container').remove()
    }
    function denyHandeler() {
      cleaning.acceptedByCustomer = 'denied'
      document.getElementById('card').classList.add('deny-border')
      document.getElementById('accept-deny-container').remove()
    }

  });
  // FÖR HÅRDKODADE KORTET +++++++++++++++++++++++
  let acceptButton = document.getElementById('accept-btn')
    if(acceptButton) {
      acceptButton.addEventListener('click', acceptHandeler)
    }
  let denyButton = document.getElementById('deny-btn')
    if(denyButton) {
      denyButton.addEventListener('click', denyHandeler)
    }

  function acceptHandeler() {
    document.getElementById('card').classList.add('accept-border')
    document.getElementById('accept-deny-container').remove()
  }
  function denyHandeler() {
    document.getElementById('card').classList.add('deny-border')
    document.getElementById('accept-deny-container').remove()
  }
  // FÖR HÅRDKODADE KORTET +++++++++++++++++++++++
}

function populateUser(user) {
  document.getElementById("user__name").textContent = user.username;
  document.getElementById("user__role").textContent = user.role;
}
