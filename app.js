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