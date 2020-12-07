var base_url = "https://api.football-data.org/v2/";
var fetchApi = url => {
  return fetch(url, {
    headers: {
      'X-Auth-Token': 'c63d90f78d6a49a5b76afc17277656d4'
    }
  });
}

function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    return Promise.reject(new Error(response.statusText));
  } else {
    return Promise.resolve(response);
  }
}
function json(response) {
  return response.json();
}
function error(error) {
  console.log("Error : " + error);
}

function getUefaTeams() {
  if ('caches' in window) {
    caches.match(base_url + "competitions/2001/teams").then(function(response) {
      if (response) {
        response.json().then(function (data) {
          var teamsHTML = "";
          data.teams.forEach(function(teams) {
            teamsHTML += `
              <div class="col s12 m3">
                <div class="card">
                  <a href="./uefaTeam.html?id=${teams.id}">
                    <div class="card-image waves-effect waves-block waves-light" style='height: 200px; padding-top: 20px;'>
                      <img style='height: 100%; width: 100%; object-fit: contain;' src="${teams.crestUrl}" />
                    </div>
                  </a>
                  <div class="card-content center-align">
                     <span class="card-title truncate">${teams.shortName}</span>
                    <p class="truncate">${teams.name}</p>
                  </div>
                </div>
              </div>
              `;
            });
        document.getElementById("uefaTeams").innerHTML = teamsHTML;
        })
      }
    })
  }

  fetchApi(base_url + "competitions/2001/teams")
    .then(status)
    .then(json)
    .then(function(data) {
      var teamsHTML = "";
      data.teams.forEach(function(teams) {
        teamsHTML += `
            <div class="col s12 m3">
              <div class="card">
                <a href="./uefaTeam.html?id=${teams.id}">
                  <div class="card-image waves-effect waves-block waves-light" style='height: 200px; padding-top: 20px;'>
                    <img style='height: 100%; width: 100%; object-fit: contain;' src="${teams.crestUrl}" />
                  </div>
                </a>
                <div class="card-content center-align">
                  <span class="card-title truncate">${teams.shortName}</span>
                  <p class="truncate">${teams.name}</p>
                </div>
              </div>
            </div>
            `;
        });
      document.getElementById("uefaTeams").innerHTML = teamsHTML;
    })
  .catch(error);
}

function getUefaTeamById() {
  return new Promise(function(resolve, reject) {

  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");

  if ('caches' in window) {
    caches.match(base_url + "teams/" + idParam).then(function(response) {
      if (response) {
        response.json().then(function (data) {
                var teamHTML = `
                <div class="center-align">
                  <h3 class="cyan-text text-darken-2">Club Detail</h3>
                  <img style='height: 25%; width: 25%; object-fit: contain; padding-top: 15px; padding-bottom: 40px' src="${data.crestUrl}" />
                  <table class="centered responsive-table">
                    <tr>
                      <th class="center-align">Club Name</th>
                      <th class="center-align">Venue</th>
                      <th class="center-align">Founded</th>
                      <th class="center-align">Address</th>
                      <th class="center-align">Country</th>
                      <th class="center-align">Website</th>
                    </tr>
                    <tr>
                      <td class="center-align">${data.name}</td>
                      <td class="center-align">${data.venue}</td>
                      <td class="center-align">${data.founded}</td>
                      <td class="center-align">${data.address}</td>
                      <td class="center-align">${data.area.name}</td>
                      <td class="center-align">${data.website}</td>
                    </tr>
                  </table>
                </div>`;
          document.getElementById("body-content").innerHTML = teamHTML;
          resolve(data);
        })
      }
    })
  }

  fetchApi(base_url + "teams/" + idParam)
    .then(status)
    .then(json)
    .then(function(data) {
      console.log(data);
      var teamHTML = `
            <div class="center-align">
              <h3 class="cyan-text text-darken-2">Club Detail</h3>
              <img style='height: 25%; width: 25%; object-fit: contain; padding-top: 15px; padding-bottom: 40px' src="${data.crestUrl}" />
              <table class="centered responsive-table">
                <tr>
                  <th class="center-align">Club Name</th>
                  <th class="center-align">Venue</th>
                  <th class="center-align">Founded</th>
                  <th class="center-align">Address</th>
                  <th class="center-align">Country</th>
                  <th class="center-align">Website</th>
                </tr>
                <tr>
                  <td class="center-align">${data.name}</td>
                  <td class="center-align">${data.venue}</td>
                  <td class="center-align">${data.founded}</td>
                  <td class="center-align">${data.address}</td>
                  <td class="center-align">${data.area.name}</td>
                  <td class="center-align">${data.website}</td>
                </tr>
              </table>
            </div>
        `;
      document.getElementById("body-content").innerHTML = teamHTML;
      resolve(data);
    });
  });
}

function getSavedClubs() {
  getAll().then(function(teams) {
    console.log(teams);
    // Menyusun komponen card artikel secara dinamis
    var teamsHTML = "";
    teams.forEach(function(teams) {
      teamsHTML += `
                  <div class="col s12 m3">
                  <div class="card">
                    <a href="./uefaTeam.html?id=${teams.id}&saved=true">
                      <div class="card-image waves-effect waves-block waves-light" style='height: 200px; padding-top: 20px;'>
                        <img style='height: 100%; width: 100%; object-fit: contain;' src="${teams.crestUrl}" />
                      </div>
                    </a>
                    <div class="card-content center-align">
                      <span class="card-title truncate">${teams.shortName}</span>
                      <p class="truncate">${teams.name}</p>
                    </div>
                  </div>
                </div>
              `;
    // Sisipkan komponen card ke dalam elemen dengan id #body-content
    document.getElementById("body-content").innerHTML = teamsHTML;
    });
  });
}

function getSavedClubById() {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");
  
  getById(parseInt(idParam)).then(function(data) {
    console.log(data)
    clubHTML = '';
    var clubHTML = `
                    <div class="center-align">
                    <h3 class="cyan-text text-darken-2">Club Detail</h3>
                    <img style='height: 25%; width: 25%; object-fit: contain; padding-top: 15px; padding-bottom: 40px' src="${data.crestUrl}" />
                    <table class="centered responsive-table">
                    <thead>
                      <tr>
                        <th class="center-align">Club Name</th>
                        <th class="center-align">Venue</th>
                        <th class="center-align">Founded</th>
                        <th class="center-align">Address</th>
                        <th class="center-align">Country</th>
                        <th class="center-align">Website</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                        <td class="center-align">${data.name}</td>
                        <td class="center-align">${data.venue}</td>
                        <td class="center-align">${data.founded}</td>
                        <td class="center-align">${data.address}</td>
                        <td class="center-align">${data.area.name}</td>
                        <td class="center-align">${data.website}</td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                  `;
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("body-content").innerHTML = clubHTML;
  });
}
