// LOGOUT MJS

import { remove } from "../js/stored/remove.mjs";

export function logOutSite() {
    const logOut = document.querySelector("#logOut");

    logOut.addEventListener("click", () => {
        remove("accessToken");
        window.location.assign("index.html");
    });
}
