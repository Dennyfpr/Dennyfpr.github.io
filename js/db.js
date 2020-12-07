var dbPromised = idb.open("DEF-Sport", 2, function(upgradeDb) {
    var teamsObjectStore = upgradeDb.createObjectStore("teams", {
      keyPath: "id"
    });
    teamsObjectStore.createIndex("teams_name", "teams_name", { unique: false 
  });
});

function saveForLater(team) {
  dbPromised
    .then(function(db) {
      var tx = db.transaction("teams", "readwrite");
      var store = tx.objectStore("teams");
      console.log(team);
      store.put(team);
      return tx.complete;
    })
    .then(function() {
      console.log("Team added to watchlist successfully");
  });
}

function getAll() {
    return new Promise(function(resolve, reject) {
      dbPromised
      .then(function(db) {
        var tx = db.transaction("teams", "readonly");
        var store = tx.objectStore("teams");
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
        var tx = db.transaction("teams", "readonly");
        var store = tx.objectStore("teams");
        return store.get(id);
      })
      .then(function(article) {
        resolve(article);
      });
  });
}

function deleteTeamWatchlist(team) {
    dbPromised.then(function(db) {
        var tx = db.transaction("teams", 'readwrite');
        var store = tx.objectStore("teams");
        console.log(team.id);
        store.delete(team.id);
        return tx.complete;
      }).then(function() {
            console.log('Item deleted');
      })
}