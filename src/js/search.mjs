// SEARCH MJS

import { renderLists } from "./render.mjs";

export function searchLists(lists) {
    const search = document.querySelector(".searchButton");

    search.onkeyup = function (event) {
        const searchValue = event.target.value.trim().toLowerCase();

        const filteredLists = lists.filter((list) => {
            if (list.title.toLowerCase().includes(searchValue)) {
                return true;
            }
        });
        renderLists(filteredLists);
    };
}

export function filterLists(lists) {
    search.onkeyup = function (event) {
        lists.sort(function (a, b) {
            if (a.firstname < b.firstname) {
                return -1;
            }
            if (a.firstname > b.firstname) {
                return 1;
            }
            return 0;
        });
        filterLists(search);
    };
}
