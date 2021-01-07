document.addEventListener("DOMContentLoaded", function() {
    let elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
    loadNav();
    let page = window.location.hash.substr(1);
    if (page === "") page = "teams";
    loadPage(page);

    function loadNav() {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4) {
                if (this.status !== 200) return;
                document.querySelectorAll(".topnav, .sidenav").forEach(function(elm) {
                    elm.innerHTML = xhttp.responseText;
                });
                document.querySelectorAll(".sidenav a, .topnav a").forEach(function(elm) {
                    elm.addEventListener("click", function(event) {
                        let sidenav = document.querySelector(".sidenav");
                        M.Sidenav.getInstance(sidenav).close();
                        page = event.target.getAttribute("href").substr(1);
                        loadPage(page);
                    });
                });
            }       
        };
        xhttp.open("GET", "nav.html", true);
        xhttp.send();
    }

    function loadPage(page) {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4) {
                let content = document.querySelector("#content");
                if (page === "teams") {
                    getAllTeams();
                    document.getElementById("pooter").innerHTML = `
                        <h5 style="padding-top: 0; padding-bottom: 100px">Teams</h5>
                    `;
                } if (page === "tables") {
                    getAllTables();
                    document.getElementById("splashS").style.display = 'none';
                    document.getElementById("pooter").innerHTML = `
                        <h5 style="padding-top: 0; padding-bottom: 100px">Tables</h5>
                    `;
                } if (page === "saved") {
                    savedTeams();
                    document.getElementById("splashS").style.display = 'none';
                    document.getElementById("pooter").innerHTML = `
                        <h5 style="padding-top: 0; padding-bottom: 100px">Saved</h5>
                    `;
                }
                
                if (this.status === 200) {
                    content.innerHTML = xhttp.responseText;
                } else if (this.status === 404) {
                    content.innerHTML = `
                        <div class="card">
                            <div class="card-image" style="padding-left: 24px; padding-right: 24px; margin-top: 30px;">
                                <img src="/not_found.png" alt="logo" />
                            </div>
                            <div class="card-content blue-grey darken-4">
                                <h3 class="container white-text" style="text-align:center;">Halaman tidak ditemukan</h3>
                            </div>
                        </div>
                    `;
                } else {
                    content.innerHTML = `
                        <div class="card" style="height: 500px;">
                            <div class="card-content blue-grey darken-4">
                                <h3 class="container white-text" style="text-align:center;">Server Error</h3>
                            </div>
                        </div>
                    `;
                }
            }
        };
        xhttp.open("GET", "pages/" + page + ".html", true);
        xhttp.send();
    }
});