// url buat football
const base_url = "https://api.football-data.org/v2/";

// token untuk akses api
const token_api = "9b7a015f09f346b089aacc95660ef41b";
const id_liga = "2014";

// fungsi fetch supaya sudah ada header tinggal panggil
var fetchData = (url_api) => {
  return fetch(url_api, {
    headers: {
      'X-Auth-Token': token_api,
    }
  });
}
// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}
// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}
// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}

// Blok kode untuk melakukan request data json
function getLeague() {
  fetchData(`${base_url}competitions/${id_liga}/standings`)
  .then(status)
  .then(json)
  .then(function(data){
    bodyLeague(data);
  });
}

function getListTeams() {
  fetchData(`${base_url}competitions/${id_liga}/standings`)
  .then(status)
  .then(json)
  .then(function(data){
    bodyListTeams(data);
  });
}

function getTeamById() {
  return new Promise(function(resolve, reject) {
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");
    fetchData(`${base_url}teams/${idParam}`)
    .then(status)
    .then(json)
    .then(function(data) {
      bodyTeamId(data);
      resolve(data);
    });
  });
}

function getFavoritedTeams() {
  getAll().then(function(teams) {
    console.log(teams);
    var detail = document.getElementById("favorite-teams");

    if(teams){
      teams.forEach(data => {
        detail.innerHTML += 
        `
          <div class="card card-detail" align="center">
            <h5>${data.name}</h5>
            <h6 class="sub-title">${data.shortName}</h6>
    
            <img src="${data.crestUrl}" class="image-detail">
    
            <div class="divider"></div>
    
            <div class="row">
              <div class="col s6 borderline waves-effect box-info" align="center">
                <a href="../detail_tim.html?id=${data.id}&favorited=true">
                  <div class="info-detail" align="center">
                    <h6><i class="material-icons icon-height">info_outline</i> Info Detail</h6>
                  </div>
                </a>
              </div>
              <div class="col s6 waves-effect box-delete" align="center">
                <a href="#modal2" class="modal-trigger" onclick="deleteFavTeam(${data.id})">
                  <div class="info-detail" align="center">
                    <h6><i class="material-icons icon-height">delete_forever</i> Hapus</h6>
                  </div>
                </a>
                <div id="modal2" class="modal">
                  <div class="modal-footer">
                    <a class="modal-close waves-effect waves-green btn-flat">Batalkan</a>
                    <a class="waves-effect waves-red btn-flat" id="btn-hapus">HAPUS</a>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
        `;
      });
    }
    else{
      detail.innerHTML += 
        `
          <h5>Belum ada tim yang kamu favoritkan!</h5>
        `;
    }
  });
}

function bodyLeague(data){
  var konten_liga = document.getElementById("body-content");
  konten_liga.innerHTML += 
  `
    <div class="cover-liga">
      <h4>Liga ${data.competition.area.name}</h4>
      <h6 class="sub-title">Selamat datang di informasi bola liga Spanyol</h6>
    </div>

    <div class="card">
      <div class="row">
        <img src="../images/spain.png" class="image-liga">
      </div>
      <div class="row card-liga">
        <h5>${data.competition.name} - ${data.season.currentMatchday} Pertandingan</h5>
        <table class="table">
          <thead>
            <tr>
              <th>
                Start Season
              </th>
              <th>
                End Season
              </th>
            </tr>
          </thead>
          <tr>
            <td>
              <i class="material-icons icon-height">date_range</i> ${data.season.startDate}
            </td>
            <td>
              <i class="material-icons icon-height">date_range</i> ${data.season.endDate}
            </td>
          </tr>
        </table>
      </div>
    </div>
  `;
}

function bodyListTeams(data){
  var list_teams = document.getElementById("list-teams");
  const teams = data.standings[0].table;

  teams.forEach(tim => {
  let check_team = tim.team;
  let crest_url = check_team.crestUrl;
  let team_name = check_team.name;
    if (crest_url) {
      list_teams.innerHTML += 
      `
      <div class="card">
        <div class="row card-team">
          <div class="col s2">
            <img src="${crest_url}" class="image-team">
          </div>
          <div class="col s10 title-liga">
            <div class="row">
              <div class="col s11">
                <h6>${team_name}</h6>
              </div>
              <div class="col s1" align="center">
                <h6>${tim.position}</h6>
              </div>
            </div>
            
            <div class="divider"></div>

            <h6 class="sub-title">Menang: ${tim.won}</h6>
            <h6 class="sub-title">Kalah: ${tim.lost}</h6>
          </div>
        </div>

        <a href="../detail_tim.html?id=${check_team.id}">
          <div class="info-lists box-info" align="center">
            <h6><i class="material-icons icon-height">info_outline</i> Info Detail</h6>
          </div>
        </a>
      </div>
      `;
    }
  });
}

function bodyTeamId(data){
  var detail = document.getElementById("body-content-detail-team");
  detail.innerHTML += 
  `
    <div class="card card-detail" align="center">
      <h5>${data.name}</h5>
      <h6 class="sub-title">${data.shortName}</h6>

      <img src="${data.crestUrl}" class="image-detail">

      <div class="divider"></div>

      <div class="row">
        <div class="col s6" align="right">
          <p>Ditemukan</p>
        </div>
        <div class="col s6" align="left">
          <p class="sub-title">${data.founded}</p>
        </div>
      
        <div class="col s6" align="right">
          <p>Kompetisi Aktif</p>
        </div>
        <div class="col s6" align="left">
          <p class="sub-title">${data.activeCompetitions.length}</p>
        </div>
        
        <div class="col s6" align="right">
          <p>Warna klub</p>
        </div>
        <div class="col s6" align="left">
          <p class="sub-title">${data.clubColors}</p>
        </div>

        <div class="col s6" align="right">
          <p>Venue</p>
        </div>
        <div class="col s6" align="left">
          <p class="sub-title">${data.venue}</p>
        </div>

        <div class="col s6" align="right">
          <p>Jumlah skuad</p>
        </div>
        <div class="col s6" align="left">
          <p class="sub-title">${data.squad.length}</p>
        </div>

      </div>
    </div>
  `;
}