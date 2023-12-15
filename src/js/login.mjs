// LOGIN MJS

import { validateEmail, passwordValidation } from "./validation.mjs";
import { save } from "./storage.mjs";
import { logOutSite } from "./logout.mjs";

const API_BASE_URL = "https://nf-api.onrender.com";

const formLogin = document.querySelector("#formLogin");
const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError");
const password = document.querySelector("#password");
const passwordError = document.querySelector("#passwordError");

async function loginUser() {
    const loginUrl = `${API_BASE_URL}/api/v1/auction/auth/login`;

    try {
        const postData = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email.value, password: password.value }),
        };

        const response = await fetch(loginUrl, postData);
        const { accessToken, ...profile } = await response.json();

        if (response.status === 200) {
            // Login successful
            localStorage.setItem("accessToken", accessToken);
            save("profile", profile);
            alert("Login successful!");
            location.replace("profile.html");
        } else {
            // Login failed
            alert("Login failed. Please check your email and password.");
            validateForm();
        }
    } catch (error) {
        console.log(error);
    }
}

function validateLogin(submission) {
    submission.preventDefault();

    if (validateEmail(email.value) === true) {
        emailError.style.display = "none";
    } else {
        emailError.style.display = "block";
    }

    if (passwordValidation(password.value) === true) {
        passwordError.style.display = "none";
    } else {
        passwordError.style.display = "block";
    }

    if (validateEmail(email.value) && passwordValidation(password.value)) {
        loginUser();
    }
}

formLogin.addEventListener("submit", validateLogin);

// TO THE LOGOUT

logOutSite();
