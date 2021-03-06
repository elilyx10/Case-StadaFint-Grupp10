import Cleaning from "./models/Cleaning.js";
import User from "./models/User.js";
import { ROLE } from "./models/Role.js";
import runHeader from "./header.js";

let currentCleanings = [];
let currentUsers = [];
let validInput = false;

window.onload = () => {
    currentCleanings = Cleaning.fetchCleanings();
    currentUsers = User.fetchUsers();
    runHeader();
    initializeForm();
    initializeModal();
    console.log("CLEANINGS: ", currentCleanings);
};

function initializeForm() {
    let cleaningForm = document.getElementById("new-cleaning-form");
    let confirmFormButton = document.getElementById("new-cleaning-confirm");
    confirmFormButton.addEventListener("click", () => {
        cleaningForm.reportValidity();
        validInput = false;
        if (cleaningForm.checkValidity()) {
            validInput = true;
            createNewCleaning();
        }
    });

    let selectCustomer = document.getElementById("customer");
    let selectCleaner = document.getElementById("cleaner");
    currentUsers.forEach((user) => {
        let optionTag = document.createElement("option");
        optionTag.value = user.username;
        optionTag.innerText = user.username;
        if (user.role === ROLE.CLEANER) {
            selectCleaner.appendChild(optionTag);
        } else if (user.role === ROLE.CUSTOMER) {
            selectCustomer.appendChild(optionTag);
        }
    });
}

function createNewCleaning() {
    let customerTag = document.getElementById("customer");
    let cleanerTag = document.getElementById("cleaner");
    let dateTag = document.getElementById("date");
    let timeTag = document.getElementById("time");
    let descriptionTag = document.getElementById("description");
    let newCleaning = new Cleaning({
        customer: customerTag.options[customerTag.selectedIndex].value,
        cleaner: cleanerTag.options[cleanerTag.selectedIndex].value,
        dateAndTimeString: new Date(
            dateTag.value + " " + timeTag.value
        ).toString(),
        description: descriptionTag.value,
        finished: false,
        acceptedByCustomer: null,
    });

    triggerModal(newCleaning);
}

function initializeModal() {
    let modalDeny = document.getElementById("modal-deny");
    let modal = document.getElementById("cleaning-modal");

    modalDeny.addEventListener("click", () => {
        validInput = false;
        modal.classList.remove("modal-in");
        modal.classList.add("modal-out");
        setTimeout(() => {
            modal.classList.remove("visible");
            modal.classList.add("hidden");
        }, 350);
    });
}

function triggerModal(newCleaning) {
    let modal = document.getElementById("cleaning-modal");

    modal.classList.remove("modal-out");
    modal.classList.add("modal-in");
    modal.classList.remove("hidden");
    modal.classList.add("visible");

    let innerModalContainer = document.getElementById("__inner-modal-content");
    innerModalContainer.innerHTML = "";

    let h3 = document.createElement("h3");
    h3.innerText = "Kontrollera informationen";
    innerModalContainer.appendChild(h3);

    let ul = document.createElement("ul");

    ul.appendChild(createLiEntry("Kund:", newCleaning.customer));
    ul.appendChild(
        createLiEntry(
            "Datum: ",
            new Date(newCleaning.dateAndTimeString).toLocaleDateString()
        )
    );
    ul.appendChild(
        createLiEntry(
            "N??r:",
            new Date(newCleaning.dateAndTimeString).toLocaleTimeString()
        )
    );
    ul.appendChild(createLiEntry("St??dare:", newCleaning.cleaner));
    innerModalContainer.appendChild(ul);

    let descriptionLabel = document.createElement("h4");
    descriptionLabel.innerText = "Beskrivning";
    descriptionLabel.className = "description";
    innerModalContainer.appendChild(descriptionLabel);

    let descriptionTag = document.createElement("span");
    descriptionTag.innerText = newCleaning.description;
    descriptionTag.className = "description";

    innerModalContainer.appendChild(descriptionTag);

    document.getElementById("modal-confirm").addEventListener("click", (e) => {
        e.preventDefault();

        if (validInput) {
            currentCleanings.push(newCleaning);
            Cleaning.storeCleanings(currentCleanings);
            localStorage.setItem("recipt", JSON.stringify(newCleaning));
            window.location.href = e.target.href;
        }
    });
}

function createLiEntry(label, text) {
    let li = document.createElement("li");
    let labelTag = document.createElement("span");
    let textTag = document.createElement("span");
    labelTag.innerText = label;
    textTag.innerText = text;
    li.appendChild(labelTag);
    li.appendChild(textTag);
    return li;
}
