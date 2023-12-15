// RENDER LISTS

export function renderLists(listsToRender) {
    const listsContent = document.querySelector(".listsContent");
    const testFilter = document.querySelector("#testFilter");

    if (testFilter.checked) {
        listsToRender.sort(function (a, b) {
            if (a.title < b.title) {
                return -1;
            }
            if (a.title > b.title) {
                return 1;
            }
            return 0;
        });
    }

    listsContent.innerHTML = "";

    listsToRender.forEach(function (json) {
        listsContent.innerHTML += `<div class="postsStyle">
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
    });
}
