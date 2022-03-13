require('dotenv').config()
const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const mysql = require('mysql');


var pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'konditeremteszt',
    dateStrings: true
});

app.listen(4000, function() {
    console.log("Server elindítva a 4000-es porton...");
})

    //bérlettípusok listája, hozzáadása, módosítása, törlése

    app.route("/berlettipusok")
        .get(function(req, res) {
            const q = "SELECT * FROM berlettipusok";
            pool.query(q, function (error, results) {
                if (!error) {
                    res.send(results);
                } else {
                    res.send(error);
                }
            });
        })

        .post(function(req, res) {
            const q = "INSERT INTO berlettipusok (berletnev, ervenynap, ervenyalkalom, ar) VALUES (?, ?, ?, ?)";
            pool.query(q, [req.body.berletnev, req.body.ervenynap, req.body.ervenyalkalom, req.body.ar], 
                function(error, results) {
                if (!error) {
                    res.send(results);
                } else {
                    res.send(error);
                }
            });
        })
        
        .patch(function(req, res) {
            const q = "UPDATE berlettipusok SET berletnev = ?, ervenynap = ?, ervenyalkalom = ?, ar = ? WHERE berlettipusid = ?";
            pool.query(q, [req.body.berletnev, req.body.ervenynap, req.body.ervenyalkalom,
                 req.body.ar, req.body.berlettipusid], 
                function(error, results) {
                if (!error) {
                    res.send(results);
                } else {
                    res.send(error);
                }
            });
        })

        app.route("/berlettipusok/:berlettipusid")
        .get(function(req, res) {
            const q = "SELECT * FROM berlettipusok WHERE berlettipusid = ?";
            pool.query(q, [req.params.berlettipusid], 
                function(error, results) {
                if (!error, results) {
                    res.send(results);
                } else {
                    res.send(error);
                }   
            }); 
        })
        .delete(function(req, res) {
            const q = "DELETE FROM berlettipusok WHERE berlettipusid = ?";
            pool.query(q, [req.params.berlettipusid], function(error, results) {
                if (!error, results) {
                    res.send(results);
                } else {
                    res.send(error);
                }   
            }); 
        })


//eladott bérletek listája, bérleteladás, lehetőségek csökkentése

app.route("/ervenyesberletek")
.get(function(req, res) {
    const q = "SELECT berletek.* , DATE_ADD(ervkezdet, INTERVAL ervnapok - 1 DAY) as ervvege, ugyfelek.keresztnev, ugyfelek.csaladnev FROM berletek, ugyfelek WHERE (lehetosegek > 0) && (ervkezdet <= now()) && (DATE_ADD(ervkezdet, INTERVAL ervnapok DAY) > now()) && (berletek.ugyfelid = ugyfelek.ugyfelid)";
    pool.query(q, function (error, results) {
        if (!error) {
            res.send(results);
        } else {
            res.send(error);
        }
    });
})

app.route("/ervenyesberletek/:ugyfelid")
.get(function(req, res) {
    const q = "SELECT * , DATE_ADD(ervkezdet, INTERVAL ervnapok - 1 DAY) as ervvege FROM berletek WHERE (lehetosegek > 0) && (ervkezdet <= now()) && (DATE_ADD(ervkezdet, INTERVAL ervnapok DAY) > now()) && ugyfelid = ?";
    pool.query(q, [req.params.ugyfelid], 
        function (error, results) {
        if (!error) {
            res.send(results);
        } else {
            res.send(error);
        }
    });
})


app.route("/berletek/:ugyfelid")
.get(function(req, res) {
    const q = "SELECT * , DATE_ADD(ervkezdet, INTERVAL ervnapok - 1 DAY) as ervvege FROM berletek WHERE ugyfelid = ?";
    pool.query(q, [req.params.ugyfelid], 
        function (error, results) {
        if (!error) {
            res.send(results);
        } else {
            res.send(error);
        }
    });
})


app.route("/berletek")
.get(function(req, res) {
    const q = "SELECT * , DATE_ADD(ervkezdet, INTERVAL ervnapok - 1 DAY) as ervvege FROM berletek, ugyfelek WHERE berletek.ugyfelid = ugyfelek.ugyfelid";
    pool.query(q, function (error, results) {
        if (!error) {
            res.send(results);
        } else {
            res.send(error);
        }
    });
})

.post(function(req, res) {
    const q = "INSERT INTO berletek (ugyfelid, berletnev, eladnap, ervkezdet, ervnapok, ar, lehetosegek) VALUES (?, ?, now(), ?, ?, ?, ?)";
    pool.query(q, [req.body.ugyfelid, req.body.berletnev,
        req.body.ervkezdet, req.body.ervnapok, req.body.ar, req.body.lehetosegek], 
        function(error, results) {
        if (!error) {
            res.send(results);
        } else {
            res.send(error);
        }
    });
})

.patch(function(req, res) { //alkalmak csökkentése, ha belépett vele és nem korlátlan
    const q = "UPDATE berletek SET lehetosegek = (lehetosegek - 1) WHERE berletid = ? && lehetosegek < 999";
    pool.query(q, [req.body.berletid], 
        function(error, results) {
        if (!error) {
            res.send(results);
        } else {
            res.send(error);
        }
    });
})


//belépések listája, felvitele és módosítása (kilépés)
app.route("/belepesek")
.get(function(req, res) {
    const q = "SELECT belepesek.*, ugyfelek.csaladnev, ugyfelek.keresztnev FROM belepesek, ugyfelek, berletek WHERE belepesek.berletid = berletek.berletid AND berletek.ugyfelid = ugyfelek.ugyfelid";
    pool.query(q, function (error, results) {
        if (!error) {
            res.send(results);
        } else {
            res.send(error);
        }
    });
})    
.post(function(req, res) { //belépés rögzítése
    const q = "INSERT INTO belepesek (berletid, belepes) VALUES (?, now())";
    pool.query(q, [req.body.berletid], 
        function(error, results) {
        if (!error) {
            res.send(results);
        } else {
            res.send(error);
        }
    });
})

.patch(function(req, res) { //egyedüli módosítási lehetőség a kilépés mezőbe adat felvitele
    const q = "UPDATE belepesek SET kilepes = now() WHERE belepesid = ?";
    pool.query(q, [req.body.belepesid], 
        function(error, results) {
            if (!error) {
                res.send(results);
            } else {
                res.send(error);
            }   
        }); 
    })

    app.route("/kileptetendo")
    .get(function(req, res) {
        const q = "SELECT belepesek.*, ugyfelek.csaladnev, ugyfelek.keresztnev FROM belepesek, ugyfelek, berletek WHERE kilepes is NULL && belepesek.berletid = berletek.berletid AND berletek.ugyfelid = ugyfelek.ugyfelid";
        pool.query(q, function (error, results) {
            if (!error) {
                res.send(results);
            } else {
                res.send(error);
            }
        });
    })    
