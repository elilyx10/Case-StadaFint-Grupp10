import Cleaning from "./models/Cleaning.js";
import User from "./models/User.js";
import runHeader from "./header.js";
import { ROLE } from "./models/Role.js";

window.onload = () => {
    runHeader();
    // Ta in cleanings och user objekt från localstorage
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (loggedInUser === null) console.log("INVALID DATA IN LOCAL STORAGE");
    else {
        console.log(loggedInUser);
        document.getElementById("user__name").textContent =
            loggedInUser.username;
        document.getElementById("user__role").textContent = loggedInUser.role;

        const cleanings = Cleaning.fetchCleanings();
        render(cleanings, loggedInUser);
    }
};

function render(cleaningsList, loggedInUser) {
    const bookedContainer = document.getElementById(
        "booked-cleaning__container"
    );
    const completedContainer = document.getElementById(
        "completed-cleaning__container"
    );
    bookedContainer.innerHTML = "";
    completedContainer.innerHTML = "";

    cleaningsList.forEach((cleaning, index) => {
        let cleaningDiv = createCleaning(cleaning);
        cleaningDiv = setStatusBorder(cleaning, cleaningDiv);
        if (
            loggedInUser.role === ROLE.CUSTOMER &&
            loggedInUser.username === cleaning.customer
        ) {
            if (cleaning.finished) {
                cleaningDiv.appendChild(
                    createApprovalButtons(cleaning, cleaningsList, index)
                );
                completedContainer.appendChild(cleaningDiv);
            } else {
                cleaningDiv.appendChild(
                    createRemoveButton(cleaningsList, index)
                );
                bookedContainer.appendChild(cleaningDiv);
            }
        } else if (
            loggedInUser.role === ROLE.CLEANER &&
            loggedInUser.username === cleaning.cleaner
        ) {
            if (cleaning.finished) {
                cleaningDiv.appendChild(createStatusDiv(cleaning));
                completedContainer.appendChild(cleaningDiv);
            } else {
                let buttonDiv = createRemoveButton(cleaningsList, index);

                let acceptButton = document.createElement("button");
                acceptButton.innerText = "Klar";
                acceptButton.className = "btn accept-btn";
                acceptButton.addEventListener("click", () => {
                    cleaning.finished = true;
                    Cleaning.storeCleanings(cleaningsList);
                    window.location.reload();
                });

                buttonDiv.appendChild(acceptButton);
                cleaningDiv.appendChild(buttonDiv);

                bookedContainer.appendChild(cleaningDiv);
            }
        }
    });

    document.getElementById("completedCleaningsCount").innerText =
        completedContainer.children.length;
    document.getElementById("bookedCleaningsCount").innerText =
        bookedContainer.children.length;
}

function createCleaning(cleaning) {
    // ========== UPPER ==========
    let divItemUpper = document.createElement("div");
    divItemUpper.className = "booked-cleaning__container__item__upper";
    let title = document.createElement("p");
    title.className = "booked-cleaning__container__item__upper__title";
    title.innerText = "Städning";
    let date = document.createElement("p");
    date.className = "booked-cleaning__container__item__upper__date";
    date.innerText = new Date(cleaning.dateAndTimeString).toLocaleString();
    divItemUpper.appendChild(title);
    divItemUpper.appendChild(date);

    // ========== LOWER ==========
    let divItemLower = document.createElement("div");
    divItemLower.className = "booked-cleaning__container__item__lower";
    let customer = document.createElement("p");
    customer.className = "booked-cleaning__container__item__lower__customer";
    customer.innerText = "Customer: " + cleaning.customer;
    let cleaner = document.createElement("p");
    cleaner.className = "booked-cleaning__container__item__lower__cleaner";
    cleaner.innerText = "Cleaner: " + cleaning.cleaner;
    let description = document.createElement("p");
    description.innerText = cleaning.description;
    description.className = "cleaning-description";
    divItemLower.appendChild(customer);
    divItemLower.appendChild(cleaner);
    divItemLower.appendChild(description);

    // ========== FINAL ==========
    let divItem = document.createElement("div");
    divItem.className = "booked-cleaning__container__item";
    divItem.appendChild(divItemUpper);
    divItem.appendChild(divItemLower);
    return divItem;
}

function createRemoveButton(cleaningsList, index) {
    let buttonDiv = document.createElement("div");
    buttonDiv.className = "button-container";
    let removeButton = document.createElement("button");
    removeButton.className = "deny-btn btn";
    removeButton.innerText = "Avboka";
    removeButton.addEventListener("click", () => {
        cleaningsList.splice(index, 1);
        Cleaning.storeCleanings(cleaningsList);
        window.location.reload();
    });
    buttonDiv.appendChild(removeButton);
    return buttonDiv;
}

function createApprovalButtons(cleaning, cleaningsList, index) {
    let buttonDiv = document.createElement("div");
    buttonDiv.className = "button-container";
    if (cleaning.acceptedByCustomer === null) {
        let denyButton = document.createElement("button");
        denyButton.className = "deny-btn btn";
        denyButton.innerText = "Icke godkänd";
        denyButton.addEventListener("click", () => {
            cleaningsList[index].acceptedByCustomer = false;
            Cleaning.storeCleanings(cleaningsList);
            window.location.reload();
        });
        buttonDiv.appendChild(denyButton);

        let acceptButton = document.createElement("button");
        acceptButton.className = "accept-btn btn";
        acceptButton.innerText = "Godkänd";
        acceptButton.addEventListener("click", () => {
            cleaningsList[index].acceptedByCustomer = true;
            Cleaning.storeCleanings(cleaningsList);
            window.location.reload();
        });
        buttonDiv.appendChild(acceptButton);
    }
    return buttonDiv;
}

function setStatusBorder(cleaning, cleaningDiv) {
    if (cleaning.acceptedByCustomer === true) {
        cleaningDiv.classList.add("accept-border");
    } else if (cleaning.acceptedByCustomer === false) {
        cleaningDiv.classList.add("deny-border");
    }
    return cleaningDiv;
}

function createStatusDiv(cleaning) {
    let status = document.createElement("p");
    status.className = "cleaning-status";

    if (cleaning.acceptedByCustomer === null)
        status.innerText = "Inte svarat än.";
    else {
        if (cleaning.acceptedByCustomer) {
            status.innerText = "Godkänd!";
        } else {
            status.innerText = "Kunden är inte nöjd med städningen.";
        }
    }
    return status;
}
