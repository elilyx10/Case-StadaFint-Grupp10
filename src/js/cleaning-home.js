let currentCleanings;

window.onload = () => {
    initializeModal();
    currentCleanings = fetchCleaning();
    console.log(currentCleanings);
};

function initializeModal() {
    let modal = document.getElementById("new-cleaning-modal");

    let modalForm = document.getElementById("new-cleaning-modal-form");
    let closeModalButton = document.getElementById("new-cleaning-modal-close");
    let confirmModalButton = document.getElementById(
        "new-cleaning-modal-confirm"
    );
    let openModalButton = document.getElementById("new-cleaning");

    openModalButton.addEventListener("click", () => {
        modal.classList.remove("hidden");
        modal.classList.add("visible");
    });

    closeModalButton.addEventListener("click", () => {
        modal.classList.remove("visible");
        modal.classList.add("hidden");
    });

    confirmModalButton.addEventListener("click", (e) => {
        modalForm.reportValidity();

        if (modalForm.checkValidity()) {
            console.log(true);
        } else {
            console.log(false);
        }
    });
}

function fetchCleaning() {
    let storedCleanings = JSON.parse(localStorage.getItem("cleanings"));
    if (storedCleanings === null) return [];
    return storedCleanings;
}
