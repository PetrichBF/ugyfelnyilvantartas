const hoszt = "http://localhost:4000/"

berlettipusokLista();
berletekLista();

function berlettipusokLista() {
    const url= hoszt + 'berlettipusok';
    const berlettipusokLista = document.getElementById("berlettipusokLista");
    const berlettipusokLista1 = document.getElementById("berlettipusokLista1");
    fetch(url)
        .then((response) => response.json())
        .then(json => {
            berlettipusokLista.innerHTML = 
            "<thead><tr><td>ID</td><td>Elnevezés</td><td>Leírás</td><td>Ár</td></tr></thead>"
            berlettipusokLista1.innerHTML ="<option value='0'>Új bérlettípus rögzítése</option>"
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
            berletekLista.innerHTML = 
            "<thead><tr><td>ID</td><td>Ügyfél</td><td>Bérletnév</td><td>Eladnap</td><td>Kezdet</td><td>Napok</td><td>Lejárat</td><td>Ár</td><td>Lehetőség</td><td>Érvényesség</td></tr></thead>"
            
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
                    sor += "<td>" + "érvényes</td>"
                } 
                sor += "</tr>"

                berletekLista.innerHTML += sor 
            });
        })
        .catch(err => console.log(err));
}

function berletAdatok() {
    const berletmezo = document.getElementById("berletmezo");
    const berlettipusid = document.getElementById("berlettipusokLista1").value;
    sor ='';
    if (berlettipusid != 0) {
        const url= hoszt + 'berlettipusok/' + berlettipusid;
       // berletmezo.innerHTML="";
        fetch(url)
            .then((response) => response.json())
            .then(json => {      
                //berletmezo.innerHTML="";      
                json.forEach(f => {
                sor +='<label>Bérlettípus ID: <input type="hidden" id="berlettipusid" value=' + f.berlettipusid +'></label>' + f.berlettipusid +' ' + '<br>';
                sor +='<label>Bérletnév: <input type="text" id="berletnev" value="' + f.berletnev +'"></label>'+ '<br>';
                sor +='<label>Érvényesség napjai: <input type="number" min="1" max="366" id="ervenynap" value=' + f.ervenynap +'></label>'+ '<br>';
                sor +='<label>Maximális belépések száma: <input type="number" min="1" max="999" id="ervenyalkalom" value=' + f.ervenyalkalom +'></label>'+ '<br>';
                sor +='<label>Ár: <input type="number" id="ar" value=' + f.ar +'></label>';
                berletmezo.innerHTML = sor;
                });
            })
            .catch(err => console.log(err));    
    } else {
            sor +='<label>Bérlettípus ID: <input type="hidden" id="berlettipusid" value="0"></label> ? '+ '<br>';
            sor +='<label>Bérletnév: <input type="text" id="berletnev" value=""></label>'+ '<br>';
            sor +='<label>Érvényesség napjai: <input type="number" min="1" max="366" id="ervenynap" value=""></label>'+ '<br>';
            sor +='<label>Maximális belépések száma: <input type="number" min="1" max="999" id="ervenyalkalom" value=""></label>'+ '<br>';
            sor +='<label>Ár: <input type="number" id="ar" value=""></label>';
            berletmezo.innerHTML = sor;
    }    
}

document.getElementById("torol").onclick = function(e) {
    const berlettipusid = document.getElementById("berlettipusokLista1").value;
    if (berlettipusid == 0) {
        alert ("Nincs kiválasztva bérlet!");
        return;
    }
    if (!confirm("Valóban törli?")) {
        return}
    e.preventDefault();
    const url = hoszt + "berlettipusok/" + berlettipusid;
    if (berlettipusid != 0) {
    fetch(url, {
        method: 'DELETE',
    })
    .then((response) => response.json())
    .then(json => console.log(json))
    .then(alert("Bérlettípus törölve!"))
    .then(berlettipusokLista())
    .catch(err => console.log(err));

    }
}

function urlaptorles(){
    document.getElementById("berletnev").value="";
    document.getElementById("ervenynap").value="";
    document.getElementById("ervenyalkalom").value="";
    document.getElementById("ar").value="";
}

document.getElementById("rogzit").onclick = function(e) {
    berletnev = document.getElementById("berletnev").value
    ervenynap = document.getElementById("ervenynap").value
    ervenyalkalom = document.getElementById("ervenyalkalom").value
    ar = document.getElementById("ar").value
    if (berletnev.length < 1){
        alert("Add meg a bérlettípus nevét!")
        return
    }
    if (ervenynap < 1 || (ervenynap > 367)){
        alert("Az érvényesség napja 1-366 nap lehet!")
        return
    }
    if (ervenyalkalom < 1 || ervenyalkalom >999){
        alert("Az alkalmak száma 1-999 között lehet!")
        return
    }
    if (ar < 1){
        alert("Add meg az árat!")
        return
    }
    e.preventDefault();
    const url = hoszt + "berlettipusok";
    const berlettipusid = document.getElementById("berlettipusokLista1").value;
    if (berlettipusid == 0) {
    
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            "berletnev": berletnev,
            "ervenynap": ervenynap,
            "ervenyalkalom": ervenyalkalom,
            "ar": ar
        })
    })
    .then((response) => response.json())
    .then(json => console.log(json))
    .then(alert("Bérlettípus rögzítve!"))
    .then(berlettipusokLista())
    .then(urlaptorles())
    .catch(err => console.log(err));

    }
    else {


    fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            "berletnev": berletnev,
            "ervenynap": ervenynap,
            "ervenyalkalom": ervenyalkalom,
            "ar": ar,
            "berlettipusid" : document.getElementById("berlettipusid").value
        })
    })
    .then((response) => response.json())
    .then(json => console.log(json))
    .then(alert("Bérlettípus módosítva!"))
    .then(berlettipusokLista())
    .then(urlaptorles())
    .catch(err => console.log(err));
}
}
