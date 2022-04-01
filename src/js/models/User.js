export default class User {
    constructor(userPrototype) {
        this.username = userPrototype.username;
        this.password = userPrototype.password;
        this.role = userPrototype.role;
    }

    static fetchUsers() {
        let storedUsers = JSON.parse(localStorage.getItem("users"));
        if (storedUsers === null) return [];
        else {
            let users = [];
            storedUsers.forEach((user) => {
                users.push(new User(user));
            });
            return users;
        }
    }

    static storeUsers(currentUsers) {
        localStorage.setItem("users", JSON.stringify(currentUsers));
    }
}
