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


