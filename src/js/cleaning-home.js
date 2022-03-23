import Cleaning from "./models/Cleaning.js";
import User from "./models/User.js";
import { ROLE } from "./models/Role.js";

let currentCleanings = [];
let currentUsers = [];

window.onload = () => {
    currentCleanings = Cleaning.fetchCleanings();
    currentUsers = User.fetchUsers();
    initializeForm();
    console.log("CLEANINGS: ", currentCleanings);
    console.log("USERS: ", currentUsers);

    // let testUser = new User({
    //     username: "Kalle",
    //     password: "123",
    //     role: ROLE.CUSTOMER,
    // });

    // let testCleaner = new User({
    //     username: "Albert",
    //     password: "123",
    //     role: ROLE.CLEANER,
    // });

    // currentUsers.push(testUser);
    // currentUsers.push(testCleaner);
    // User.storeUsers(currentUsers);
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

function addNewCleaning() {
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
        acceptedByCustomer: false,
    });
    currentCleanings.push(newCleaning);
    Cleaning.storeCleanings(currentCleanings);

    let aTagHome = document.getElementById("home-a-tag");
    aTagHome.click();
}
