var dbPromised = idb.open("liga-bola", 1, function(upgradeDb) {
  var teamsObjectStore = upgradeDb.createObjectStore("teams", {
    keyPath: "id"
  });
  teamsObjectStore.createIndex("name", "name", { unique: false });
});

function saveTeam(team) {
  dbPromised
    .then(function(db) {
      var tx = db.transaction("teams", "readwrite");
      var store = tx.objectStore("teams");
      var item = {
        id: team.id,
        name: team.name,
        shortName: team.shortName,
        founded: team.founded,
        crestUrl: team.crestUrl,
        clubColors: team.clubColors,
        activeCompetitions: team.activeCompetitions.length,
        venue: team.venue,
        squad: team.squad.length,
        website: team.website 
      }
      console.log(item);

      store.put(item);
      return tx.complete;
    })
    .then(function() {
      console.log("Team berhasil di simpan.");
    }).catch(function() {
      console.log("Team gagal di simpan");
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

function deleteFavTeam(team_id) {
  conf = confirm("Hapus tim?");
  if (conf){
    dbPromised.then((db) => {
      var tx = db.transaction('teams', 'readwrite');
      var store = tx.objectStore('teams');
  
      // console.log('Delete');
      // console.log(team_id);
      store.delete(team_id);
      return tx.complete;
    }).then(()=>{
      console.log('Team berhasil dihapus dari favorite');
      location.reload();
    })
  }
}