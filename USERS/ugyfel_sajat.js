const hoszt = "http://localhost:4000/"

berlettipusokLista();
//ugyfelBerletekLista();





function lekerdezes() {
    ugyfelid = document.getElementById("ugyfelid1").value;
    password = document.getElementById("password").value;
    ugyfelAdatok();
    
    belepesekLista();
    ugyfelBerletekLista();

} 
ugyfelBerletekLista();

document.getElementById("bejelentkezes").onclick = function(e) {
    e.preventDefault(); 

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
                if (json.token)
                    props.beallit({ name:data.name, token:json.token })
            })
            .catch(err => console.log(err))
    
    lekerdezes();
}


function ugyfelAdatok() {
    const ugyfelAdatok = document.getElementById("ugyfelAdatok");
    const url= hoszt + 'azonositottugyfel/' + ugyfelid;
    fetch(url)
        .then((response) => response.json())
        .then(json => {
            ugyfelAdatok.innerHTML="";
            json.forEach(f => {
        sor ='<label>Ügyfél azonosító: <input type="hidden" id="ugyfelid" value=' + f.ugyfelid +'></label>' + f.ugyfelid +' ';
        sor +='<label>Családnév: <input type="text" id="csaladnev" value=' + f.csaladnev +'></label>';
        sor +='<label>Keresztnév: <input type="text" id="keresztnev" value=' + f.keresztnev +'></label>';
        sor +='<label>Születési idő: <input type="date" id="szulido" value=' + f.szulido.split("T")[0].toString() +'></label>';
        sor +='<label>Neme: <input type="radio" name="neme" id="nemef" value="F"'
        if (f.neme == "F") {sor += 'checked'};
        sor+='> Férfi ';
        sor +='    <input type="radio" id="nemen" name="neme" value="N"'
        if (f.neme == "N") {sor += 'checked'};
        sor+='> Nő </label>';
        sor +='<label>E-mail: <input type="email" id="email" value=' + f.email +'></label>';
        sor +='<label>Irányítószám: <input type="text" id="iranyitoszam" value=' + f.iranyitoszam +'></label>';
        sor +='<label>Telefon: <input type="text" id="telefon" value=' + f.telefon +'></label>';
        sor +='<label>Település: <input type="text" id="telepules" value=' + f.telepules +'></label>';
        sor +='<label>Lakcím: <input type="text" id="lakcimm" value=' + f.lakcim +'></label>';
        sor +='<label>Hírlevél: <input type="checkbox" name="hirlevel" id="hirlevel" value="0"'
        if (f.hirlevel == 1) {sor += 'checked'};
        sor += '></label>';
        sor +=' <label>Jelszó: <input type="text" id="jelszo"  value=' + f.jelszo +'></label>';
        ugyfelAdatok.innerHTML += sor;
            });
        })
        .catch(err => console.log(err));
}


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


function ugyfelBerletekLista() {
    const ugyfelBerletekLista = document.getElementById("ugyfelBerletekLista");
    most = Date.now();
    url= hoszt + 'azonositottberletek/' + ugyfelid;
    if (document.getElementById("ugyfelervenyes").checked) {
        url = hoszt + 'azonositottervenyesberletek/' + ugyfelid;;
    }
    fetch(url)
        .then((response) => response.json())
        .then(json => {
            ugyfelBerletekLista.innerHTML = 
            "<thead><tr><td>ID</td><td>Ügyfél</td><td>Bérletnév</td><td>Eladás ideje</td><td>Kezdet</td><td>Napok</td><td>Lejárat</td><td>Ár</td><td>Lehetőség</td></tr></thead>"
            
            json.forEach(f => {
                sor = "<tr>"
                sor += "<td>" + f.berletid + "</td>"
                sor += "<td>" + f.ugyfelid + "</td>"
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
                else if (Date.parse(f.ervkezdet) > most)
                { sor += "<td>még nem érvényes</td>"} 
                else if (Date.parse(f.ervvege) < most)
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
        url = hoszt + 'azonositottugyfelbelepesek/' + ugyfelid;
    const ugyfelbelepesekLista = document.getElementById("ugyfelbelepesekLista");
    fetch(url)
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

