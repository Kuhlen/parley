if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
        navigator.serviceWorker
        .register("/service-worker.js")
        .then(function() {
            console.log("Pendaftaran ServiceWorker berhasil");
        })
        .catch(function() {
            console.log("Pendaftaran ServiceWorker gagal");
        });
    });
} else {
    console.log("ServiceWorker belum didukung browser ini.");
}

function confirm_delete() {
    return confirm('Apakah Anda Ingin Menghapus Data?');
}

document.addEventListener("DOMContentLoaded", function() {
    let urlParams = new URLSearchParams(window.location.search);
    let isFromSaved = urlParams.get("saved");
    let item = getTeamsById();

    let btnIBack = document.getElementById("index-back");
    let btnSBack = document.getElementById("saved-back");
    let btnSave = document.getElementById("save");
    let btnDel = document.getElementById("delete");

    if (isFromSaved) {
        btnSave.style.display = 'none';
        btnIBack.style.display = 'none';
        getSavedTeamsById();
    } else {
        let item = getTeamsById();
        btnDel.style.display = 'none';
        btnSBack.style.display = 'none';
    }

    btnSave.onclick = function() {
        item.then(function (player) {
            Favorite(player);
            alert("Data berhasil ditambah");
        });
    };

    btnDel.onclick = function() {
        item.then(function (player) {
            del(player);
        });
        return confirm_delete()
    };
});