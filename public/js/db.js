let dbPromised = idb.open("parley", 1, function(upgradeDb) {
    let teamsObjectStore = upgradeDb.createObjectStore("teams", {keyPath: "id"});
    teamsObjectStore.createIndex("team", "shortName", { unique: false });
});

function Favorite(player) {
    dbPromised
    .then(function(db) {
        let tx = db.transaction("teams", "readwrite");
        let store = tx.objectStore("teams", { keyPath: "id", autoIncrement:true });
        console.log(player);
        store.put(player);
        return tx.complete;
    })
    .then(function() {
        console.log("Team berhasil di simpan.");
    });
}

function getAll() {
    return new Promise(function(resolve, reject) {
        dbPromised
        .then(function(db) {
            let tx = db.transaction("teams", "readonly");
            let store = tx.objectStore("teams");
            return store.getAll();
        })
        .then(function(teams) {
            resolve(teams);
        });
    });
}

function getById(id) {
    return new Promise(function(resolve, reject) {
        dbPromised
        .then(function(db) {
            let tx = db.transaction("teams", "readonly");
            let store = tx.objectStore("teams");
            return store.get(id);
        })
        .then(function(teams) {
            resolve(teams);
        });
    });
}

function del(player) {
    return new Promise(function(resolve, reject) {
        dbPromised
        .then(function(db) {
            let tx = db.transaction("teams", "readwrite");
            let store = tx.objectStore("teams");
            store.delete(player.id);
            return tx.complete;
        })
        .then(function(player) {
            resolve(player);
            console.log("teams berhasil di hapus");
        });
    });
}