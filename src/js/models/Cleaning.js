export default class Cleaning {
    constructor(cleaningPrototype) {
        this.customer = cleaningPrototype.customer;
        this.dateAndTimeString = cleaningPrototype.dateAndTimeString;
        this.description = cleaningPrototype.description;
        this.finished = cleaningPrototype.finished;
        this.acceptedByCustomer = cleaningPrototype.acceptedByCustomer;
    }

    static fetchCleanings() {
        let storedCleanings = JSON.parse(localStorage.getItem("cleanings"));
        if (storedCleanings === null) return [];
        else {
            let cleaningObjects = [];
            storedCleanings.forEach((cleaning) => {
                cleaningObjects.push(new Cleaning(cleaning));
            });
            return cleaningObjects;
        }
    }

    static storeCleanings(currentCleanings) {
        localStorage.setItem("cleanings", JSON.stringify(currentCleanings));
    }
}
