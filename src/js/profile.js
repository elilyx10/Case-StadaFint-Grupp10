import Cleaning from "./models/Cleaning.js";
import User from "./models/User.js";

window.onload = () => {
  // Ta in cleanings och user objekt från localstorage
  const cleanings = Cleaning.fetchCleanings();
  const users = User.fetchUsers();
  console.log(users);
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
    <div class="booked-cleaning__container__item">
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
  </div>
    `;

    const BookedContainer = document.querySelector(
      ".booked-cleaning__container"
    );

    BookedContainer.insertAdjacentHTML("afterbegin", html);
  });
}

// Funktion som skapar completed cleanings kort
function createCompletedCleanings(cleanings) {
  cleanings.forEach((cleaning) => {
    const html = `
        <div class="completed-cleaning__container__item">
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
            <button class="accept-btn btn">Godkänn 👍</button>
            <button class="deny-btn btn">Underkänn 👎</button>
          </div>
      </div>
        `;

    const CompletedContainer = document.querySelector(
      ".completed-cleaning__container"
    );

    CompletedContainer.insertAdjacentHTML("afterbegin", html);
  });
}

function populateUser(user) {
  document.getElementById("user__name").textContent = user.username;
  document.getElementById("user__role").textContent = user.role;
}
