// SEARCH LISTS

import { API_BASE_URL_LIST } from "./stored/constants.mjs";

form.addEventListener("submit", handleSearchListings);

function handleSearchListings(event) {
    // const search = document.querySelector(".searchInputId");
    const tag = document.querySelector("#searchInputId").value;
    const url = API_BASE_URL_LIST + "/auction/listings?_tag=" + tag;
    searchListings(url);
}

async function searchListings() {
    try {
        const getAllData = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await fetch(url, getAllData);
        console.log(response);
        const json = await response.json();
        console.log(json);
        for (let i = 0; i < json.length; i++) {
            console.log(json[i]);
            console.log(json[i].media);
            tag.innerHTML += `<div class="postsStyle">
      <div class="col-xl-3 col-lg-4 col-md-6 mb-4 mt-5"><a href="specific.html?id=${json[i].id}" class="text-decoration-none">
        <div>
          <img src="${json[i].media}" class="img-fluid"/>
          <div class="mt-1">
            <div><h2>${json[i].title}</h2></div>
              <span class="text-dark"><i class="fa-solid fa-user fa-1x me-2 my-1"></i>${json[i].id}</span>
              <div class="d-flex align-items-center justify-content-between">
                <p class=" mb-0"><span class="text-dark">Current: ${json[i]._count.bids}</span></p>
                <div class="px-4 text-danger">${json[i].endsAt}</div> 
              </div>
            </div>
        </div>
      </div></a>
      </div>`;
        }
    } catch (error) {
        console.log(error);
    }
}
