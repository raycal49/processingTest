const form = document.querySelector("#userinfo");

const grabPasswordErrors () => {

}


async function registerUser() {
    const body = new URLSearchParams(new FormData(form));

        try {
        const response = await fetch("/auth/register", {
            method: form.method,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body,
        });

        const responseBody = await response.json();

        // const responseStatus = JSON.stringify(responseBody.status, null, 2)

        // const responseErrors = JSON.stringify(responseBody.errors, null, 2)

        console.log("The result of the server-side validation is: " + JSON.stringify(responseBody, null, 2));
        console.log("The result of the server-side validation is: " + JSON.stringify(responseBody.errors.password, null, 2));
        console.log("Has the server-side validation failed? The answer is: " + (responseBody.status === "fail"));

        if (responseBody.status === "fail") {
            const passwordErrors = responseBody.errors.password;
            const passwordErrorSpan = document.querySelector("#password-error");

            if (passwordErrors) {
                passwordErrorSpan.hidden = false;
                passwordErrorSpan.textContent = JSON.stringify(passwordErrors, null, 2);
            }
        }

        // const validationErrors = {};

        // for (const item of items) {

        // }

        // const usernameError = document.querySelector(#username-error);
        // const emailError = document.querySelector(#email-error);
        // const passwordError = document.querySelector(#password-error);

        // if (status === false)
        // {
            
        // }
        // else
        // {
        //     const errParagraphElement = document.createElement("p");
        //     errParagraphElement.textContent = "Successfully logged in!";
        //     const subButton = document.getElementById("submit_button");
        //     const parentForm = subButton.parentNode
        //     parentForm.insertBefore(errParagraphElement, subButton);
        // }

        // console.log(status);
    } catch (e) {
        console.error(e);
    }
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    await registerUser();
});