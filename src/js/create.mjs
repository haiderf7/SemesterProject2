// CREATE MJS

import { API_BASE_URL_LIST } from "./stored/constants.mjs";

import { updateUrl } from "./stored/constants.mjs";

import {
    validateTitle,
    validateDeadlineDate,
    validateMedia,
    validateDescription,
} from "./validation.mjs";

import { authFetch } from "./authFetch.mjs";

const API_GET_LISTINGS = "/api/v1/auction/listings";

const form = document.querySelector("#form");

const title = document.querySelector("#titleId");

const deadlineDate = document.querySelector("#deadlineDateId");

const media = document.querySelector("#mediaId");

const description = document.querySelector("#descriptionId");

const titleError = document.querySelector("#titleError");

const deadlineDateError = document.querySelector("#deadlineDateError");

const mediaError = document.querySelector("#mediaError");

const descriptionError = document.querySelector("#descriptionError");

const method = "post";

export async function createPost(e) {
    e.preventDefault();
    const updateUrl = API_BASE_URL_LIST + 'auction/listings';
    const accessToken = localStorage.getItem('accessToken');

    try {
        if (validatePost());
        {
            const payload = JSON.stringify({
                title: title.value,
                endsAt: deadlineDate.value,
                media: [media.value],
                description: description.value,
            });

            const response = await authFetch(updateUrl, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: payload,
            });
            const data = await response.json();
            location.reload();
        }
    } catch (error) {
        console.error(error, 'list----');
    }
}


function validatePost() {
    if (validateTitle(title.value)) {
        titleError.style.display = 'none';
    } else {
        titleError.style.display = 'block';
    }

    if (validateDeadlineDate(deadlineDate.value)) {
        deadlineDateError.style.display = 'none';
    } else {
        deadlineDateError.style.display = 'block';
    }

    if (validateMedia(media.value)) {
        mediaError.style.display = 'none';
    } else {
        mediaError.style.display = 'block';
    }

    if (validateDescription(description.value)) {
        descriptionError.style.display = 'none';
    } else {
        descriptionError.style.display = 'block';
    }

    return true;
}


form.addEventListener('submit', createPost);
