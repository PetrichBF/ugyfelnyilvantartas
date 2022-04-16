const hoszt = "http://localhost:4000/";

//bejelentkezés nélkül megtekinthető a bérlettípusok táblázat
berlettipusokLista();

bejelentkezve = false;

//sikeres bejelentkezést követően láthatóak:
// - az ügyfél saját személyes adatai
// - belépéseinek listája
// - bérleteinek listája

function lekerdezes() {
    ugyfelAdatok();    
    belepesekLista();
    ugyfelBerletekLista();
} 

//ügyfél bejelentkezése és adatok alap ellenőrzése (legyen ID és jelszó is megadva)
document.getElementById("bejelentkezes").onclick = function(e) {
    e.preventDefault(); 
        if (bejelentkezve) {
            if (!confirm("Biztosan ki szeretne jelentkezni?")) {
                return}
            sessionStorage.clear();
            bejelentkezve = false;
            
            ugyfelid1.value = "";
            password.value = "";
            bejelentkezes.innerHTML = "Belépés";
            alert("Sikeres kijelentkezés")
            lekerdezes();
            return;
        }
        if (document.getElementById("ugyfelid1").value=="" || 
            document.getElementById("password").value=="") {
            alert("Üres ügyfélazonosító vagy jelszó!")
            return
        }

        fetch(hoszt+'users/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                "ugyfelid": document.getElementById("ugyfelid1").value,
                "password": document.getElementById("password").value
            })
        })
            .then((response) => response.json())
            .then(json => {
                alert(json.message)
                console.log(json.token)
                if (json.token) //ellenőrzés, hogy sikeres bejelentkezés volt-e
                    sessionStorage.token = json.token;
                    sessionStorage.ugyfel = document.getElementById("ugyfelid1").value;
                    bejelentkezve = true;
                    bejelentkezes.innerHTML = "Kilépés";
                    lekerdezes();
            })
            .catch(err => console.log(err))    
}


function ugyfelAdatok() {
    const ugyfelAdatok = document.getElementById("ugyfelAdatok");
    if (!sessionStorage.ugyfel && !sessionStorage.token) {
        ugyfelAdatok.innerHTML = "Kérem, jelentkezzen be!";
        return;
    }
    const url= hoszt + 'azonositottugyfel/' + sessionStorage.ugyfel;
    
    const token = "Bearer: " + sessionStorage.token;
    fetch(url, {
        method: 'GET',
        headers: {
            'Authorization' : token
        }
    })
        .then((response) => response.json())
        .then(json => {
            console.log(json);
            ugyfelAdatok.innerHTML="";
            json.forEach(f => {
        sor ='Ügyfél azonosítóm: ' + f.ugyfelid +'<br>';
        sor +='Nevem: ' + f.csaladnev +' '  + f.keresztnev +'<br>';
        sor +='Születési időm: ' + f.szulido.split("T")[0].toString() +'<br>';
        sor +='Nemem: '
        if (f.neme == "F") {sor += 'férfi'};
        if (f.neme == "N") {sor += 'nő'};
        sor+='<br>';
        sor +='E-mail címem: ' + f.email +'<br>';
        sor +='Címem: ' + f.iranyitoszam +' ';
        sor +='' + f.telepules + ', ' + f.lakcim +'<br>';
        sor +='Telefonom: ' + f.telefon +'<br>';
        sor +='Hírlevelet '
        if (f.hirlevel == 0) {sor += 'nem '};
        sor += 'kérek <br>';
        ugyfelAdatok.innerHTML += sor;
            });
        })
        .catch(err => console.log(err));
}

//bejelentkezés nélkül is látható
function berlettipusokLista() {
    const url= hoszt + 'berlettipusok';
    const berlettipusokLista = document.getElementById("berlettipusokLista");
    fetch(url)
        .then((response) => response.json())
        .then(json => {
            berlettipusokLista.innerHTML = 
            "<thead><tr><td>ID</td><td>Elnevezés</td><td>Leírás</td><td>Ár</td></tr></thead>"
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
            });
        })
        .catch(err => console.log(err));
}

//csak bejelentkezést követően látható:

function ugyfelBerletekLista() {
    if (!sessionStorage.ugyfelid) {
        return;
    }
    const ugyfelBerletekLista = document.getElementById("ugyfelBerletekLista");
    const token = "Bearer: " + sessionStorage.token;
 
    ma0 = new Date();
    ma0.setHours(0);
    ma0.setMinutes(0);
    ma0.setSeconds(0);

    ma24 = new Date();
    ma24.setHours(23);
    ma24.setMinutes(59);
    ma24.setSeconds(59);
  
    url= hoszt + 'azonositottberletek/' + sessionStorage.ugyfel;
    if (document.getElementById("ugyfelervenyes").checked) {
        url = hoszt + 'azonositottervenyesberletek/' + sessionStorage.ugyfel;
    }
    fetch(url, {
        method: 'GET',
        headers: {
            'Authorization' : token
        }
    })
        .then((response) => response.json())
        .then(json => {
            ugyfelBerletekLista.innerHTML = 
            "<thead><tr><td>ID</td><td>Bérletnév</td><td>Vásárlás ideje</td><td>Kezdet</td><td>Napok</td><td>Lejárat</td><td>Ár</td><td>Lehetőség</td><td>Állapot</td></tr></thead>"
            
            json.forEach(f => {
                sor = "<tr>"
                sor += "<td>" + f.berletid + "</td>"
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
                if (lehetoseg = 0) 
                { sor += "<td>felhasznált</td>" } 
                else if (Date.parse(f.ervkezdet) > Date.parse(ma24))
                { sor += "<td>még nem érvényes</td>"} 
                else if (Date.parse(f.ervvege) < Date.parse(ma0))
                { sor += "<td>már nem érvényes</td>"} 
                else
                { 
                    sor += "<td>érvényes</td>"
                } 
                sor += "</tr>"

              ugyfelBerletekLista.innerHTML += sor 
                                
            }); 
        })
        .catch(err => console.log(err));
}

function belepesekLista() {
    if (!sessionStorage.ugyfelid) {
        return;
    }
    url= hoszt + 'azonositottugyfelbelepesek/' + sessionStorage.ugyfel;
    if (document.getElementById("utolsok").checked) {
        url = hoszt + 'azonositottugyfelbelepesek5/' + sessionStorage.ugyfel;
    }

    const ugyfelbelepesekLista = document.getElementById("ugyfelbelepesekLista");
    const token = "Bearer: " + sessionStorage.token;


    fetch(url, {
        method: 'GET',
        headers: {
            'Authorization' : token
        }
    })
        .then((response) => response.json())
        .then(json => {
            ugyfelbelepesekLista.innerHTML = 
            "<thead><tr><td>ID</td><td>Bérlet</td><td>Belépés</td><td>Kilépés</td></tr></thead>"
            json.forEach(f => {
                sor = "<tr>"
                sor += "<td>" + f.belepesid + "</td>"
                sor += "<td>" + f.berletid + "</td>"
                sor += "<td>" + f.belepes + "</td>"
                if (f.kilepes != null) 
                { sor += "<td>" + f.kilepes + "</td>" } 
                else
                { 
                    sor += "<td>még bent vagyok</td>"
                } 
                sor += "</tr>"
                ugyfelbelepesekLista.innerHTML += sor            
            });
        })
        .catch(err => console.log(err));
}

