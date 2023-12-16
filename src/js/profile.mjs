// PROFILE MJS

const API_BASE_URL = "https://nf-api.onrender.com";

const API_AUCTION_PROFILE = "/api/v1/auction/profiles/";

const content = document.querySelector(".apiProfile");

import { load } from "./storage.mjs";

async function fetchToken(profileName) {
    const profileURL = '/api/v1/auction/profiles/' + profileName;
    try {
        const response = await authFetch(API_BASE_URL + profileURL);

        const json = await response.json();
        // content.innerHTML += fetchToken(json);
        // console.log(json, 'profile');

        const profile = `<div class="imageContainer d-flex flex-row"> 
         <div >
         <img src=${`${json.avatar}`} alt="profile avatar" class="rounded-circle w-50 h-50"  id="user-profile-avatar"/>
         <h2>${json.name}</h2>
              <h3>${json.email}<h3>
              <h3>${json.credits}</h3>
              
          </div>
             
                </div>`;

        if (document.querySelector('.imageContainer') === null) {
            content.insertAdjacentHTML('beforeend', profile);
        }
    } catch (error) {
        console.log(error);
    }
}


const { name } = load("profile");
fetchToken(name);

// UPDATE AVATAR

const form = document.querySelector("#avatarForm");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    updateAvatar(name);
});

async function updateAvatar(userName) {
    const method = 'PUT';
    const avatar = document.querySelector('#avatarId');
    const updateURL = API_BASE_URL + API_AUCTION_PROFILE + `${userName}/media`;
    const profileAvatarElement = document.querySelector('#user-profile-avatar');

    const data = {
        avatar: avatar.value,
    };

    try {
        const response = await authFetch(updateURL, {
            method,
            body: JSON.stringify(data),
        });

        const json = await response.json();
        if (profileAvatarElement) {
            profileAvatarElement.src = json?.avatar;
        }
    } catch (error) {
        console.log(error, '---profile error');
    }
}

// TO THE LOGOUT

import { logOutSite } from "./logout.mjs";
import { authFetch } from "./authFetch.mjs";

logOutSite();
