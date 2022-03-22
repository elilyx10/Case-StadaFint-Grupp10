export class Cleaning {
    constructor(customer, date, time, description) {
        this.customer = customer;
        this.date = date;
        this.time = time;
        this.description = description;
        this.finished = false;
        this.acceptedByCustomer = false;
    }
}
