// LIST MJS

import { getAllListings } from "../../api/posts/read.mjs";

export async function renderList() {
    try {
        const listings = await getAllListings();
        console.log("listings here", listings);
        createList(listings);
    } catch (error) {
        console.log(error);
        // display error to user don't just log it
    }
}

export async function renderSearchList(listings) {
    createList(listings);
}

function createList(items) {
    const container = document.querySelector(".apiListings");
    container.innerHTML = "";

    items.forEach((item) => {
        container.innerHTML += `<div class="postsStyle">
      <div class="col-xl-3 col-lg-4 col-md-6 mb-4 mt-5"><a href="specific.html?id=${item.id}" class="text-decoration-none">
        <div>
          <img src="${item.media}" class="img-fluid"/>
          <div class="mt-1">
            <div><h2>${item.title}</h2></div>
              <span class="text-dark"><i class="fa-solid fa-user fa-1x me-2 my-1"></i>${item.tags}</span>
              <div class="d-flex align-items-center justify-content-between">
                <p class=" mb-0"><span class="text-dark">Current: ${item._count.bids}</span></p>
                <div class="px-4 text-danger">${item.endsAt}</div> 
              </div>
            </div>
        </div>
      </div></a>
      </div>`;
    });
}
