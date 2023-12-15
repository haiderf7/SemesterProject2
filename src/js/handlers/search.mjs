// SEARCH MJS

import { renderSearchList } from "../views/posts/list.mjs";
import { searchListings } from "../api/posts/read.mjs";

export function handleSearch() {
    const form = document.querySelector("#searchForm");

    if (!form) {
        return;
    }
    form.addEventListener("submit", handleSubmitEvent);
}

async function handleSubmitEvent(event) {
    event.preventDefault();
    const tag = document.querySelector("#searchInput").value;
    if (tag.trim().length === 0) {
        return;
    }
    const listings = await searchListings(tag);
    console.log("search lsitings", listings);
    renderSearchList(listings);
}
