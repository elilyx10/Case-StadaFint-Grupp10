import User from "./models/User.js";
import { ROLE } from "./models/Role.js";

window.onload = () => {
    initialize();
};

function initialize() {
    let select = document.getElementById("register-select");
    for (const key in ROLE) {
        if (ROLE[key] !== ROLE.ADMIN) {
            let option = document.createElement("option");
            option.value = ROLE[key];
            option.innerText = ROLE[key];
            select.appendChild(option);
        }
    }

    document
        .getElementById("register-confirm")
        .addEventListener("click", (e) => {
            e.preventDefault();
            let form = document.getElementById("register-form");
            form.reportValidity();
            if (
                form.checkValidity() &&
                select.options[select.selectedIndex].value != "--"
            ) {
                if (checkRegister()) {
                    window.location.href = e.target.href;
                } else {
                    alert("Användarnamnet upptaget. Försök igen.");
                }
            }
        });
}

function checkRegister() {
    let username = document.getElementById("register-username").value;
    let password = document.getElementById("register-password").value;
    let confirmPassword = document.getElementById(
        "register-password-confirm"
    ).value;
    let roleSelect = document.getElementById("register-select");
    let role = roleSelect.options[roleSelect.selectedIndex].value;

    if (password !== confirmPassword) return false;

    let users = User.fetchUsers();
    let foundUsers = users.filter((e) => e.username == username);
    if (foundUsers.length > 0) return false;

    let newUser = new User({
        username: username,
        password: password,
        role: role,
    });

    users.push(newUser);
    User.storeUsers(users);
    localStorage.setItem("loggedInUser", JSON.stringify(newUser));
    return true;
}
