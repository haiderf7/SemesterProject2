// SPECIFIC MJS

const postSpecific = document.querySelector(".postSpecific");

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

console.log(id);

const API_BASE_URL_SPECIFIC = "https://nf-api.onrender.com/";

const API_GET_LISTINGS = "api/v1/auction/listings/" + id + `?_bids=true`;

specificPostWithId(API_BASE_URL_SPECIFIC + API_GET_LISTINGS);

async function specificPostWithId(API_ALL_LISTINGS) {
    try {
        const token = localStorage.getItem("accessToken");
        const getAllData = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await fetch(API_ALL_LISTINGS, getAllData);
        console.log(response);
        const json = await response.json();
        console.log(json);

        function bidsTemplate(bids = []) {
            return bids.map(bidTemplate).join("");
        }

        function bidTemplate(bid) {
            return `<div class="bid">${bid.amount}</div>`;
        }

        postSpecific.innerHTML = `<section class="mt-5 container">
            <div class="row">
                <div class="postStyle">
                    <div class="col-lg-4">
                        <div>
                            <div class="card-body text-center">
                                <div class="mt-5 col-12">
                                    <div>
                                        <img src="${json.media}" class=" w-100">
                                    </div>
                                    <h2>${json.title}</h2>
                                    <h4>${json.created}</h4>
                                    <h4>${json.id}</h4>
                                </div>
                                <div>${bidsTemplate(json.bids)}</div>
                                <div>
                                    <form id="formBid">
                                        <input class="form-control" placeholder="Bid....." name="inputName" id="bidButton" required>
                                        <button type="submit" class="btn btn-outline-success shadow-lg  border rounded text-dark mt-2">Place bid</button>
                                    </form>
                                    <div id="bidMessage"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>`;

        const bidInput = document.querySelector("#bidButton");
        const bidMessage = document.querySelector("#bidMessage");

        async function bidToSpecificListing(listID) {
            try {
                const token = localStorage.getItem("accessToken");
                const getSpecificData = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        amount: Number(bidInput.value),
                    }),
                };
                const url = `api/v1/auction/listings/${listID}/bids`;
                const response = await fetch(API_BASE_URL_SPECIFIC + url, getSpecificData);
                console.log(response);

                if (response.ok) {
                    // Bid successfully placed
                    alert("Bid placed successfully!");
                    // Update the site with the latest data (you might want to reload the whole page or update specific elements)
                    specificPostWithId(API_BASE_URL_SPECIFIC + API_GET_LISTINGS);
                } else {
                    // Failed to place bid
                    alert("Failed to place bid. Please try again.");
                }
            } catch (error) {
                console.log(error);
                // Failed to place bid
                alert("Failed to place bid. Please try again.");
            }
        }

        const form = document.querySelector("#formBid");
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            bidToSpecificListing(id);
        });
    } catch (error) {
        console.log(error);
        // Failed to place bid
        alert("Failed to place bid. Please try again.");
    }
}

// TO THE LOGOUT

import { logOutSite } from "./logout.mjs";

logOutSite();
