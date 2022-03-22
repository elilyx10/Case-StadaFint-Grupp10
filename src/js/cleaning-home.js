import Cleaning from "./models/Cleaning.js";

let currentCleanings = [];

window.onload = () => {
    initializeForm();
    currentCleanings = Cleaning.fetchCleanings();
    console.log(currentCleanings);
};

function initializeForm() {
    let cleaningForm = document.getElementById("new-cleaning-form");
    let confirmFormButton = document.getElementById("new-cleaning-confirm");
    confirmFormButton.addEventListener("click", () => {
        cleaningForm.reportValidity();
        if (cleaningForm.checkValidity()) {
            addNewCleaning();
        }
    });
}

function addNewCleaning() {
    let customerTag = document.getElementById("customer");
    let dateTag = document.getElementById("date");
    let timeTag = document.getElementById("time");
    let descriptionTag = document.getElementById("description");
    let newCleaning = new Cleaning({
        customer: customerTag.value,
        dateAndTimeString: new Date(
            dateTag.value + " " + timeTag.value
        ).toString(),
        description: descriptionTag.value,
        finished: false,
        acceptedByCustomer: false,
    });
    currentCleanings.push(newCleaning);
    Cleaning.storeCleanings(currentCleanings);
    console.log(currentCleanings);
}
