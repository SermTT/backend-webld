const express = require('express')
const router = express.Router()
const app = express()
const bodyParser = require('body-parser')
const db = require('./database')
const mysql = require('mysql');
var con = mysql.createConnection({ host: "localhost", user: "root", password: "", database: "webld" });

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

module.exports = router;

router.post('/forgetpassword', (req, res) => {
    const ชื่อผู้ใช้ = req.body.ชื่อผู้ใช้
    const รหัสผ่าน = req.body.รหัสผ่าน
    con.query("UPDATE users SET รหัสผ่าน = ? WHERE ชื่อผู้ใช้ = ?", [รหัสผ่าน, ชื่อผู้ใช้], (err, result) => {
        if(err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});;