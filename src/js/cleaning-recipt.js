import runHeader from "./header.js";

let recipt = null;

window.onload = () => {
    runHeader();
    recipt = JSON.parse(localStorage.getItem("recipt"));
    if (recipt === null) {
        render(null);
    } else {
        render(recipt);
    }
};

function render(recipt) {
    let reciptContainer = document.getElementById("recipt");
    if (recipt) {
        let h3 = document.createElement("h3");
        h3.innerText = "Kvitto";
        reciptContainer.appendChild(h3);

        let ul = document.createElement("ul");

        ul.appendChild(createLiEntry("Kund:", recipt.customer));
        ul.appendChild(
            createLiEntry(
                "Datum: ",
                new Date(recipt.dateAndTimeString).toLocaleDateString()
            )
        );
        ul.appendChild(
            createLiEntry(
                "När:",
                new Date(recipt.dateAndTimeString).toLocaleTimeString()
            )
        );
        ul.appendChild(createLiEntry("Städare:", recipt.cleaner));
        reciptContainer.appendChild(ul);

        let descriptionLabel = document.createElement("h4");
        descriptionLabel.innerText = "Beskrivning";
        descriptionLabel.className = "description";
        reciptContainer.appendChild(descriptionLabel);

        let descriptionTag = document.createElement("span");
        descriptionTag.innerText = recipt.description;
        descriptionTag.className = "description";

        reciptContainer.appendChild(descriptionTag);
    } else {
        let h2 = document.createElement("h2");
        h2.innerText = "Oj! Nått konstigt hände med kvittot!";
        reciptContainer.appendChild(h2);
    }
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
