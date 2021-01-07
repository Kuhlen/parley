const teamsURL = "https://api.football-data.org/v2/teams/";
const standingsURL = "https://api.football-data.org/v2/competitions/2021/standings"

const fetchAPI = url => {
    return fetch (url, {
        headers: {
            'X-Auth-Token': "e3062ed14b434bd688ca2e35de399dfa"
        }
    })
    .then(response => {
        if (response.status !== 200) {
            console.log("Error: " + response.status);
            return Promise.reject(new Error(response.statusText))
        } else {
            return Promise.resolve(response)
        }
    })
    .then(response => response.json())
    .catch(error => {
        console.log(error)
    })
};

function getAllTeams() {
    if ('caches' in window) {
        caches.match(`${teamsURL}`).then(function(response) {
            if (response) {
                response.json().then(function (data) {
                    theTEAMS(data);
                })
            }
        })
    }

    fetchAPI(`${teamsURL}`)
    .then(data => {
        theTEAMS(data)
    })
    .catch(error => {
        console.log(error)
    })
}

function theTEAMS(data) {
    let teamsHTML = "";
    data.teams.forEach(function(team) {
        let logo = "";
        if (team.crestUrl === null) {
            logo = `/src/${team.tla}.png`;
        } else {
            logo = team.crestUrl;
        }
        teamsHTML += `
            <div class="card">
                <a href="./data_teams.html?id=${team.id}">
                    <div class="card-image" style="padding-left: 24px; padding-right: 24px; margin-top: 30px;">
                        <img src="${logo}" alt="logo" />
                    </div>
                </a>
                <div class="card-content blue-grey darken-4">
                    <h3 class="container white-text" style="text-align:center;">${team.shortName}</h3>
                </div>
            </div>
        `;
    });
    document.getElementById("articles").innerHTML = teamsHTML;
}

function getTeamsById() {
    return new Promise(function(resolve, reject) {
        const urlParams = new URLSearchParams(window.location.search);
        let idParam = urlParams.get("id");

        if ("caches" in window) {
            caches.match(teamsURL + idParam).then(function(response) {
                if (response) {
                    response.json().then(function(data) {
                        players(data);
                    })
                }
            })
        }

        fetchAPI(teamsURL + idParam)
        .then(data => {
            players(data)
            resolve(data);
        })
        .catch(error => {
            console.log(error)
        });
    })
}

function players(data) {
    let teamsHTML = "";
    data.squad.forEach(function (player) {
        let Tshirt;
        let Coach;
        if (player.shirtNumber === null) {
            Tshirt = "-";
        } else {
            Tshirt = player.shirtNumber;
        }

        if (player.position === null) {
            Coach = "Coach";
        } else {
            Coach = player.position;
        }

        teamsHTML += `
            <tr>
                <td>${Tshirt}</td>
                <td>${player.name}</td>
                <td>${Coach}</td>
                <td>${player.nationality}</td>
            </tr>
        `;
    });
    document.getElementById("body-content").innerHTML = `
        <div class="card" style="padding-left: 15px; padding-right: 15px; margin-top: 30px;">
            <table class="striped">
                <thead>
                    <tr>
                        <th style="color:red;">No.</th>
                        <th>Player</th>
                        <th>Position</th>
                        <th>Nationality</th>
                    </tr>
                </thead>
                <tbody>
                    ${teamsHTML}
                </tbody>
            </table>
        </div>
    `;
}


function savedTeams() {
    getAll().then(function(teams) {
        console.log(teams);
        let teamsHTML = "";
        teams.forEach(function(team) {
            let logo = "";
            if (team.crestUrl == null) {
                logo = `/src/${team.tla}.png`;
            } else {
                logo = team.crestUrl;
            }
            teamsHTML += `
                <div class="card">
                    <a href="./data_teams.html?id=${team.id}&saved=true">
                        <div class="card-image" style="padding-left: 24px; padding-right: 24px; margin-top: 30px;">
                            <img src="${logo}" alt="logo" />
                        </div>
                    </a>
                    <div class="card-content blue-grey darken-4">
                        <h3 class="container white-text" style="text-align:center;">${team.shortName}</h3>
                    </div>
                </div>
            `;
        });
        if (teamsHTML == false) {
            document.getElementById("data-saved").innerHTML = `
                <div class="card">
                    <div class="card-image" style="padding-left: 24px; padding-right: 24px; margin-top: 30px;">
                        <img src="/not_found.png" alt="logo" />
                    </div>
                    <div class="card-content blue-grey darken-4">
                        <h3 class="container white-text" style="text-align:center;">Tidak ada data disimpan</h3>
                    </div>
                </div>
            `;
        } else {
            document.getElementById("data-saved").innerHTML = teamsHTML;
        }
    });
}

function getSavedTeamsById() {
    const urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");
    let teamsHTML = "";
    
    getById(idParam).then(function(player) {
        teamsHTML += `
            <tr>
                <td>${player.shirtNumber}</td>
                <td>${player.name}</td>
                <td>${player.position}</td>
                <td>${player.nationality}</td>
            </tr>
        `;
    });
    document.getElementById("body-content").innerHTML = `
        <div class="card" style="padding-left: 15px; padding-right: 15px; margin-top: 30px;">
            <table class="striped centered">
                <thead>
                    <tr>
                        <th style="color:red;">No.</th>
                        <th>Player</th>
                        <th>Position</th>
                        <th>Nationality</th>
                    </tr>
                </thead>
                <tbody>
                    ${teamsHTML}
                </tbody>
            </table>
        </div>
    `;
}

function getAllTables() {
    if ("caches" in window) {
        caches.match(`${standingsURL}`).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    tables(data);
                })
            }
        })
    }

    fetchAPI(`${standingsURL}`)
    .then(data => {
        tables(data);
    })
    .catch(error => {
        console.log(error)
    })
}

function tables(data) {
    let standings = "";
    data.standings[0].table.forEach(function (standing) {
        standings += `
            <tr>
                <td>${standing.position}</td>
                <td><a href="./data_teams.html?id=${standing.team.id}"><img src="${standing.team.crestUrl.replace(/^http:\/\//i, 'https://')}" width="30px" alt="badge"/></a></td>
                <td>${standing.team.name}</td>
                <td>${standing.playedGames}</td>
                <td>${standing.won}</td>
                <td>${standing.draw}</td>
                <td>${standing.lost}</td>
                <td>${standing.points}</td>
            </tr>
        `;
    });
    document.getElementById("data-tables").innerHTML = `
        <div class="card" style="padding-left: 15px; padding-right: 15px; margin-top: 30px;">
            <table class="striped">
                <thead>
                    <tr>
                        <th style="color:red;">No</th>
                        <th></th>
                        <th>Team Name</th>
                        <th>P</th>
                        <th>W</th>
                        <th>D</th>
                        <th>L</th>
                        <th>PTS</th>
                    </tr>
                </thead>
                <tbody id="standings">
                    ${standings}
                </tbody>
            </table>                
        </div>
    `;
}