const hoszt = "http://localhost:4000/";


function ugyfelekLista() {
    const url = hoszt + 'ugyfelek';
    let talalatok=0;
    const ugyfelekLista = document.getElementById("ugyfelekLista");
    const ugyfelekLista1 = document.getElementById("ugyfelekLista1");
    const talalat = document.getElementById("talalat");
    ugyfelekLista.innerHTML = "Nincs ügyfél még."
        reszlet = (document.getElementById("kereses").value).toUpperCase();
        fetch(url)
        .then((response) => response.json())
        .then(json => {
            ugyfelekLista.innerHTML = "<thead><td>Családnév</td><td>Keresztnév</td></thead>";
            ugyfelekLista1.innerHTML="<option value='0'>Válassz ügyfelet</option>";
            json.forEach(f => {
                if (reszlet=="" || ((f.csaladnev + " " + f.keresztnev).toUpperCase()).indexOf(reszlet)>-1) {
                    ugyfelekLista.innerHTML += "<tr><td>" + f.csaladnev + "</td><td>" + f.keresztnev + "</td></tr>"
                ugyfelekLista1.innerHTML +="<option value = '" + f.ugyfelid + "'>" + f.ugyfelid + " (" +f.csaladnev + " " + f.keresztnev + ")</option>"
                talalatok ++;
                talalat.innerHTML = ("" + talalatok + " találat");
                } 
            });
        })
        .catch(err => console.log(err));
       
}

function berlettipusokLista() {
    const url= hoszt + 'berlettipusok';
    const berlettipusokLista = document.getElementById("berlettipusokLista");
    const berlettipusokLista1 = document.getElementById("berlettipusokLista1");
    fetch(url)
        .then((response) => response.json())
        .then(json => {
            berlettipusokLista.innerHTML = 
            "<thead><tr><td>ID</td><td>Elnevezés</td><td>Leírás</td><td>Ár</td></tr></thead>"
            berlettipusokLista1.innerHTML ="<option value='0'>Válasszon bérlettípust</option>"
            json.forEach(f => {
                sor = "<tr>"
                sor += "<td>" + f.berlettipusid + "</td>"
                sor += "<td>" + f.berletnev + "</td>"
                sor += "<td>" + f.ervenynap + " napon belül felhasználható "
                if (f.ervenyalkalom != 999) 
                { sor += f.ervenyalkalom } 
                else
                { sor += "korlátlan" } 
                sor += " alkalomra </td>"
                sor += "<td>" + f.ar + " Ft </td></tr>"
                berlettipusokLista.innerHTML += sor 
                berlettipusokLista1.innerHTML +='<option value="' + f.berlettipusid + '">' + f.berlettipusid + ' ' + f.berletnev + '</option>'
                
            });
        })
        .catch(err => console.log(err));
}

function berletekLista() {
    url = hoszt + 'berletek';
    if (document.getElementById("ervenyes").checked) {
        url = hoszt + 'ervenyesberletek';
    }
    const berletekLista = document.getElementById("berletekLista");
    most = new Date();
    fetch(url)
        .then((response) => response.json())
        .then(json => {
            berletekLista.innerHTML="";
            berletekLista.innerHTML = 
            "<thead><tr><td>ID</td><td>Ügyfél</td><td>Bérletnév</td><td>Eladás ideje</td><td>Kezdet</td><td>Napok</td><td>Lejárat</td><td>Ár</td><td>Lehetőség</td></tr></thead>"
            
            json.forEach(f => {
                sor = "<tr>"
                sor += "<td>" + f.berletid + "</td>"
                sor += "<td>" + f.ugyfelid + " (" + f.csaladnev + " " + f.keresztnev + ") </td>"
                sor += "<td>" + f.berletnev + "</td>"
                sor += "<td>" + f.eladnap + "</td>"
                sor += "<td>" + f.ervkezdet + "</td>"
                sor += "<td>" + f.ervnapok + "</td>"
                sor += "<td>" + f.ervvege + "</td>"
                sor += "<td>" + f.ar + "</td>"
                if (f.lehetosegek == 999) {
                    sor += "<td>korlátlan</td>"    
                } else {
                sor += "<td>" + f.lehetosegek + "</td>"
                }
                if (f.lehetosegek == 0) //itt kérdés???
                { sor += "<td>felhasznált</td>" } 
                else if (Date.parse(f.ervkezdet) > most)
                { sor += "<td>még nem érvényes</td>"} 
                else if (Date.parse(f.ervvege) < most)
                { sor += "<td>már nem érvényes</td>"} 
                else
                { 
                    sor += "<td>" + "<button onClick='beleptet(" + f.berletid + ")'>beléptet</button></td>"
                } 
                sor += "</tr>"

                berletekLista.innerHTML += sor 
            });
        })
        .catch(err => console.log(err));
}

function belepesekLista() {
    url = hoszt + 'kileptetendo';
    if (!document.getElementById("kileptetendo").checked) {
        url = hoszt + 'belepesek';
    }
    const belepesekLista = document.getElementById("belepesekLista");
    fetch(url)
        .then((response) => response.json())
        .then(json => {
            belepesekLista.innerHTML = 
            "<thead><tr><td>ID</td><td>Bérlet</td><td>Ügyfél</td><td>Belépés</td><td>Kilépés</td></tr></thead>"
            json.forEach(f => {
                sor = "<tr>"
                sor += "<td>" + f.belepesid + "</td>"
                sor += "<td>" + f.berletid + "</td>"
                sor += "<td>" + f.csaladnev + " " + f.keresztnev + "</td>"
                sor += "<td>" + f.belepes + "</td>"
                if (f.kilepes != null) 
                { sor += "<td>" + f.kilepes + "</td>" } 
                else
                { 
                    sor += "<td>" + "<button onClick='kileptet(" + f.belepesid + ")'>kiléptet</button></td>"
                } 
                sor += "</tr>"
                belepesekLista.innerHTML += sor            
            });
        })
        .catch(err => console.log(err));
}
