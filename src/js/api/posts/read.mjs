// READ MJS

import { API_BASE_URL_LIST, API_GET_LISTINGS } from "../constants.mjs";

export async function getAllListings() {
    const url = API_BASE_URL_LIST + API_GET_LISTINGS;
    const token = localStorage.getItem("accessToken");

    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await fetch(url, options);
    const json = await response.json();
    return json;
}

export async function searchListings(tag) {
    const url = API_BASE_URL_LIST + API_GET_LISTINGS + "&_tag=" + tag;
    const response = await fetch(url);
    const json = await response.json();
    return json;
}
