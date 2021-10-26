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


app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.post('/login',function(request, response) {
   
    var ชื่อผู้ใช้ = request.body.ชื่อผู้ใช้;
    var รหัสผ่าน = request.body.รหัสผ่าน;

    if (ชื่อผู้ใช้ && รหัสผ่าน ) {
        con.query('SELECT * FROM users WHERE ชื่อผู้ใช้ = ? AND รหัสผ่าน = ?', [ชื่อผู้ใช้, รหัสผ่าน], function(error, results, fields ) {
                if(results.length > 0) {
                    request.session.loggedin = true;
                    request.session.ชื่อผู้ใช้ = ชื่อผู้ใช้;
                } else {
                    response.send('ชื่อผู้ใช้ หรือ รหัสผ่านไม่ถูกต้อง')
                }
                response.end();
        });
    } else {
        response.send('กรุณากรอกชื่อผู้ใช้ และ รหัสผ่าน');
        response.end();
    }
});



module.exports = app;
