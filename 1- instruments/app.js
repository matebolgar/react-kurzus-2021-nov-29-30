const state = {
    hangszerek: [],
    folyamatban: false,
    singleItemPendingId: ""
};


window.onload = async function () {
    // State change
    state.folyamatban = true;
    render();
    
    state.hangszerek = await fetch("https://kodbazis.hu/api/instruments")
    .then(res => res.json())

    state.folyamatban = false;

    render();
}


function render() {
    let hangszerekHTML = ""
    for(let hangszer of state.hangszerek) {
        hangszerekHTML += `
        <div class="card d-inline-block" style="width: 200px">    
            <img
                class="card-img-top p-4"
                src="${hangszer.imageURL}"
            />

            <div class="card-body text-center">
                <h6 class="card-title">${hangszer.name}</h6>
                <h5 class="card-title">${hangszer.brand}</h5>
                <p class="card-text">Ár: ${hangszer.price} Ft -</p>
                <button class="btn btn-danger delete-button" data-hangszerid="${hangszer.id}">
                    Törlés
                </button>
            </div>
        </div>
        `;
    }

    document.getElementById("instrument-list-container").innerHTML = `
        ${state.folyamatban ? "Folyamatban..." : ""}
        ${hangszerekHTML}
    `;

    for(let deleteBtn of document.querySelectorAll(".delete-button")) {
        const id = deleteBtn.dataset.hangszerid;
        deleteBtn.onclick = async function () {
            state.folyamatban = true;
            await fetch("https://kodbazis.hu/api/instruments/" + id, {
                method: "DELETE",
                credentials: "include"
            });
    
            state.hangszerek = await fetch("https://kodbazis.hu/api/instruments", {
                credentials: "include"
            })
            .then(res => res.json())

            state.folyamatban = false;

            render();
        }
    }
}