const form = document.querySelector(#userinfo);

async function registerUser(form) {
    const body = new URLSearchParams(new FormData(form));

        try {
        const response = await fetch("/register", {
            method: form.method,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body,
        });

        const status = await response.ok;
        console.log("status has the value: " + status);

        const usernameError = document.querySelector(#username-error);
        const emailError = document.querySelector(#email-error);
        const passwordError = document.querySelector(#password-error);

        if (status === false)
        {
            const errParagraphElement = document.createElement("p");
            errParagraphElement.textContent = "Error: Username not found!";
            const subButton = document.getElementById("submit_button");
            const parentForm = subButton.parentNode
            parentForm.insertBefore(errParagraphElement, subButton);
        }
        else
        {
            const errParagraphElement = document.createElement("p");
            errParagraphElement.textContent = "Successfully logged in!";
            const subButton = document.getElementById("submit_button");
            const parentForm = subButton.parentNode
            parentForm.insertBefore(errParagraphElement, subButton);
        }

        // console.log(status);
    } catch (e) {
        console.error(e);
    }
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    await registerUser();
});