export default function runHeader() {
    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser == null) render(null);
    else render(loggedInUser);
}

function render(user) {
    document.getElementById("logout-link").addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("loggedInUser");
        window.location.href = e.target.href;
    });

    if (user == null) {
        document.getElementById("profile-link").style.display = "none";
        document.getElementById("login-link").style.display = "block";
        document.getElementById("logout-link").style.display = "none";
    } else {
        document.getElementById("profile-link").style.display = "block";
        document.getElementById("login-link").style.display = "none";
        document.getElementById("logout-link").style.display = "block";
    }
}
