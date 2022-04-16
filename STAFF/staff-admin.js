const hoszt = "http://localhost:4000/"
//szűrő törlése, adatok a táblázatban, frissítéseket az adatbevitel után 

function oldalFrissit()
{
    berlettipusokLista();
    belepesekLista();
    ugyfelekLista();
    berletekLista();
}

oldalFrissit();

function ugyfelFrissit() {
    ugyfelAdatok();
    ugyfelBerletekLista();
}

function ugyfelekLista() {
    const url = hoszt + 'ugyfelek';
    let talalatok=0;
    //const ugyfelekLista = document.getElementById("ugyfelekLista");
    const ugyfelekLista1 = document.getElementById("ugyfelekLista1");
    const talalat = document.getElementById("talalat");
    //ugyfelekLista.innerHTML = "Nincs ügyfél még."
        reszlet = (document.getElementById("kereses").value).toUpperCase();
        fetch(url)
        .then((response) => response.json())
        .then(json => {
            //ugyfelekLista.innerHTML = "<thead><td>Családnév</td><td>Keresztnév</td></thead>";
            ugyfelekLista1.innerHTML="<option value='0'>Válassz ügyfelet</option>";
            talalatok = 0;
            json.forEach(f => {
                if (reszlet=="" || ((f.csaladnev + " " + f.keresztnev).toUpperCase()).indexOf(reszlet)>-1) {
                    //ugyfelekLista.innerHTML += "<tr><td>" + f.csaladnev + "</td><td>" + f.keresztnev + "</td></tr>"
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
    ma0 = new Date();
    ma0.setHours(0);
    ma0.setMinutes(0);
    ma0.setSeconds(0);

    ma24 = new Date();
    ma24.setHours(23);
    ma24.setMinutes(59);
    ma24.setSeconds(59);

    fetch(url)
        .then((response) => response.json())
        .then(json => {
            berletekLista.innerHTML="";
            berletekLista.innerHTML = 
            "<thead><tr><td>ID</td><td>Ügyfél</td><td>Bérletnév</td><td>Eladás ideje</td><td>Kezdet</td><td>Napok</td><td>Lejárat</td><td>Ár</td><td>Lehetőség</td><td>Beléptetés</td></tr></thead>"
            
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
                if (f.lehetosegek == 0)
                { sor += "<td>felhasznált</td>" } 
                else if (Date.parse(f.ervkezdet) > Date.parse(ma24))
                { sor += "<td>még nem érvényes</td>"} 
                else if (Date.parse(f.ervvege) < Date.parse(ma0))
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

function beleptet(berletid) {
    //rögzítem a belépést
    const url = hoszt + "belepesek";
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                "berletid": berletid
            })
        })
        .then((response) => response.json())
        .then(json => console.log(json))
        .then(belepesekLista())
        .catch(err => console.log(err));
        //módosítom a lehetőségek számát
    const url0 = hoszt + "berletek";
        fetch(url0, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                "berletid": berletid
            })
        })
        .then((response) => response.json())
        .then(alert("Az ügyfél beléptetve"))
        .then(berletekLista())
        .then(ugyfelFrissit())
        .catch(err => console.log(err));
}


function kileptet(belepesid) {
    const url = hoszt + "belepesek";
            fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                    "belepesid": belepesid,
                })
            })
            .then((response) => response.json())
            .then(json => console.log(json))
            .then(oldalFrissit()) //elég lenne csak berletek, bentlevok???
            .catch(err => console.log(err));
    
}

function ugyfelBerletekLista() {
    const ugyfelBerletekLista = document.getElementById("ugyfelBerletekLista");
    const ugyfelid = document.getElementById("ugyfelekLista1").value;
    
    ma0 = new Date();
    ma0.setHours(0);
    ma0.setMinutes(0);
    ma0.setSeconds(0);

    ma24 = new Date();
    ma24.setHours(23);
    ma24.setMinutes(59);
    ma24.setSeconds(59);

    url= hoszt + 'berletek/' + ugyfelid;
    if (document.getElementById("ugyfelervenyes").checked) {
        url = hoszt + 'ervenyesberletek/' + ugyfelid;
    }
    fetch(url)
        .then((response) => response.json())
        .then(json => {
            ugyfelErvenyesBerletekLista1.innerHTML="<option value='0'>Válassz egy bérletet</option>";
            ugyfelBerletekLista.innerHTML = 
            "<thead><tr><td>ID</td><td>Ügyfél</td><td>Bérletnév</td><td>Eladás ideje</td><td>Kezdet</td><td>Napok</td><td>Lejárat</td><td>Ár</td><td>Lehetőség</td><td>Beléptetés</td></tr></thead>"
            
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
                if (f.lehetosegek == 0) 
                { sor += "<td>felhasznált</td>" } 
                else if (Date.parse(f.ervkezdet) > Date.parse(ma24))
                { sor += "<td>még nem érvényes</td>"} 
                else if (Date.parse(f.ervvege) < Date.parse(ma0))
                { sor += "<td>már nem érvényes</td>"} 
                else
                { 
                    sor += "<td>" + "<button onClick='beleptet(" + f.berletid + ")'>beléptet</button></td>"
                    ugyfelErvenyesBerletekLista1.innerHTML +="<option value='" + f.berletid + "'>" + f.berletid + " " + f.berletnev + "</option>"
                } 
                sor += "</tr>"

              ugyfelBerletekLista.innerHTML += sor 
                
                                 
            }); 
        })
        .catch(err => console.log(err));
}

function keres() {
    //reszlet = document.getElementById("kereses");
    ugyfelekLista();
}

function ugyfelAdatok() {
    const ugyfelAdatok = document.getElementById("ugyfelAdatok");
    const ugyfelid = document.getElementById("ugyfelekLista1").value;
    if (ugyfelid != 0 ) {
    const url= hoszt + 'ugyfelek/' + ugyfelid;
    fetch(url)
        .then((response) => response.json())
        .then(json => {
            ugyfelAdatok.innerHTML="";
            json.forEach(f => {
        sor ='<label>Ügyfél azonosító: <input type="hidden" id="ugyfelid" value="' + f.ugyfelid +'"></label>' + f.ugyfelid +' ';
        sor +='<label>Családnév: <input type="text" id="csaladnev" value="' + f.csaladnev +'"></label>';
        sor +='<label>Keresztnév: <input type="text" id="keresztnev" value="' + f.keresztnev +'"></label>';
        sor +='<label>Születési idő: <input type="date" id="szulido" value="' + f.szulido.split("T")[0].toString() +'"></label>';
        sor +='<label>Neme: <input type="radio" name="neme" id="nemef" value="F"'
        if (f.neme == "F") {sor += 'checked'};
        sor+='> Férfi ';
        sor +='    <input type="radio" id="nemen" name="neme" value="N"'
        if (f.neme == "N") {sor += 'checked'};
        sor+='> Nő </label>';
        sor +='<label>E-mail: <input type="email" id="email" value="' + f.email +'"></label>';
        sor +='<label>Irányítószám: <input type="text" id="iranyitoszam" value="' + f.iranyitoszam +'"></label>';
        sor +='<label>Telefon: <input type="text" id="telefon" value="' + f.telefon +'"></label>';
        sor +='<label>Település: <input type="text" id="telepules" value="' + f.telepules +'"></label>';
        sor +='<label>Lakcím: <input type="text" id="lakcim" value="' + f.lakcim +'"></label>';
        sor +='<label>Hírlevél: <input type="checkbox" name="hirlevel" id="hirlevel" value="0"'
        if (f.hirlevel == 1) {sor += 'checked'};
        sor += '></label>';
        sor +=' <label>Jelszó: <input type="text" id="jelszo"  value="' + f.jelszo +'"></label>';
        
       ugyfelAdatok.innerHTML += sor;
            });
        })
        .catch(err => console.log(err));
    } else {
            ugyfelAdatok.innerHTML="";
        sor ='<label>Ügyfél azonosító: <input type="hidden" id="ugyfelid">? </label>';
        sor +='<label>Családnév: <input type="text" id="csaladnev" ></label>';
        sor +='<label>Keresztnév: <input type="text" id="keresztnev"></label>';
        sor +='<label>Születési idő: <input type="date" id="szulido"></label>';
        sor +='<label>Neme: <input type="radio" name="neme" id="nemef" value="F" checked> Férfi ';
        sor +='<input type="radio" id="nemen" name="neme" value="N"> Nő </label>';
        sor +='<label>E-mail: <input type="email" id="email"></label>';
        sor +='<label>Irányítószám: <input type="text" id="iranyitoszam"></label>';
        sor +='<label>Telefon: <input type="text" id="telefon"></label>';
        sor +='<label>Település: <input type="text" id="telepules"></label>';
        sor +='<label>Lakcím: <input type="text" id="lakcim"></label>';
        sor +='<label>Hírlevél: <input type="checkbox" name="hirlevel" id="hirlevel" checked></label>';
        sor +=' <label>Jelszó: <input type="text" id="jelszo"></label>';
        
       ugyfelAdatok.innerHTML += sor;
        }
}

document.getElementById("ugyfelrogzit").onclick = function(e) {
    e.preventDefault();
    const url = hoszt + "ugyfelek";
    const ugyfelid = document.getElementById("ugyfelekLista1").value;
    neme = "F";
    hirlevel = 0;
    if (document.getElementById("nemen").checked) {neme = "N";}
    if (document.getElementById("hirlevel").checked) {hirlevel = 1;}
    if (ugyfelid == 0) {
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            "csaladnev": document.getElementById("csaladnev").value,
            "keresztnev": document.getElementById("keresztnev").value,
            "szulido": document.getElementById("szulido").value,
            "neme": neme,
            "telefon": document.getElementById("telefon").value,
            "email": document.getElementById("email").value,
            "iranyitoszam": document.getElementById("iranyitoszam").value,
            "telepules": document.getElementById("telepules").value,
            "lakcim": document.getElementById("lakcim").value,
            "hirlevel": hirlevel,
            "jelszo": document.getElementById("jelszo").value
        })
    })
    .then((response) => response.json())
    .then(json => console.log(json))
    .then(ugyfelekLista())
    .catch(err => console.log(err));

} else {
    fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            "csaladnev": document.getElementById("csaladnev").value,
            "keresztnev": document.getElementById("keresztnev").value,
            "szulido": document.getElementById("szulido").value,
            "neme": neme,
            "telefon": document.getElementById("telefon").value,
            "email": document.getElementById("email").value,
            "iranyitoszam": document.getElementById("iranyitoszam").value,
            "telepules": document.getElementById("telepules").value,
            "lakcim": document.getElementById("lakcim").value,
            "hirlevel": hirlevel,
            "jelszo": document.getElementById("jelszo").value,
            "ugyfelid": document.getElementById("ugyfelid").value 
        })
    })
    .then((response) => response.json())
    .then(json => console.log(json))
    .then(ugyfelekLista())
    .catch(err => console.log(err));

}
}

document.getElementById("berletelad").onclick = function(e) {
    e.preventDefault();
    berlettipusid = document.getElementById("berlettipusokLista1").value.split(" ")[0].toString();
    const url = hoszt + "berletek";
    const url0= hoszt + 'berlettipusok/' + berlettipusid;
    console.log(url0);
    fetch(url0)
        .then((response) => response.json())
        .then(json => {
            json.forEach(f => {
                berletnap = f.ervenynap;
                berletar = f.ar;
                berletalkalom = f.ervenyalkalom;
                berletnev = f.berletnev;
            });
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                    "ugyfelid": document.getElementById("ugyfelekLista1").value.split(" ")[0].toString(),
                    "berletnev": berletnev,
                    "ervkezdet": document.getElementById("ervkezdet").value,
                    "ervnapok": berletnap,
                    "ar": berletar,
                    "lehetosegek": berletalkalom
                })
            })
            .then((response) => response.json())
            .then(json => console.log(json))
            .then(alert("Az ügyfélnek a bérlet eladásra került"))
            .then(ugyfelBerletekLista())
            .catch(err => console.log(err));
        
        })          
        .catch(err => console.log(err));
    }


    document.getElementById("beleptet").onclick = function(e) {
        e.preventDefault(); 
        beleptet( document.getElementById("ugyfelErvenyesBerletekLista1").value.split(" ")[0].toString())
    }

    document.getElementById("uresszuro").onclick = function(e) {
        e.preventDefault(); 
        document.getElementById("kereses").value="";
        ugyfelekLista();
    }

