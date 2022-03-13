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
