window.onload = () => {
    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser == null) render(null);
    else render(loggedInUser);
};

function render(user) {
    if (user == null) {
        document.getElementById("profile-link").style.display = "none";
        document.getElementById("login-link").style.display = "block";
    } else {
        document.getElementById("profile-link").style.display = "block";
        document.getElementById("login-link").style.display = "none";
    }

    console.log("USER: ", user);
}
