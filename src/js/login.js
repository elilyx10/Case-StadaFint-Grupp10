import User from "./models/User.js";

window.onload = () => {
    initialize();
};

function initialize() {
    document.getElementById("login-confirm").addEventListener("click", () => {
        let form = document.getElementById("login-form");
        form.reportValidity();
        if (form.checkValidity()) {
            let username = document.getElementById(
                "login-form__username"
            ).value;
            let password = document.getElementById(
                "login-form__password"
            ).value;
            if (checkLoginInfo(username, password)) {
                console.log("FOUND IN STORAGE");
            } else {
                console.log("INVALID");
                tryAgain();
            }
        }
    });
}

function checkLoginInfo(username, password) {
    if (username.length < 1) return false;
    if (password.length < 1) return false;

    let users = User.fetchUsers();
    let foundUsers = users.filter((e) => e.username == username);

    console.log(users);
    console.log(foundUsers);

    if (foundUsers.length < 1) return false;
    if (foundUsers.length > 1) return false;

    if (password != foundUsers[0].password) return false;
    return true;
}

function tryAgain() {}
