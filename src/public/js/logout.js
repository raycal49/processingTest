const logoutButton = document.querySelector("#logout_button");

async function sendLogout() {
    try {
        const response = await fetch("/auth/logout", {
            method: "POST",
        });

        // cookie is cleared server-side; send the user back to the login page
        window.location.href = "login.html";
    } catch (e) {
        console.error(e);
    }
}

logoutButton.addEventListener("click", async (event) => {
    event.preventDefault();
    await sendLogout();
});
