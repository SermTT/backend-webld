const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const app = express()
const db = require('./database')
const mysql = require('mysql');
const cors = require('cors');
var con = mysql.createConnection({ host: "localhost", user: "root", password: "", database: "webld" });
con.connect(function(err) { if (err) throw err; console.log("Connected!"); app.get('/', (req, res) => { res.send('Hello Word! Connected! ') }) });

app.use(cors());

app.get('/', function (req, res) {
  res.setHeader ('Access-Control-Allow-Origin', '*');
  res.setHeader ('Acces -Control-Allow-Methods', 'GET, POST, OPTINS, PUT, PATCH, DELETE');
  res.setHeader ('ACcess-Control-Allow-Headers', 'X-Requested-With, content-type');
  res.setHeader ('Access-Control-Allow-Credentials', true);
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

app.get('/list', async (req, res) => {
  sql = "SELECT ชื่อผู้ใช้, รหัสผ่าน FROM users"
    
  con.query(sql, function(err, result) {
      if (err) throw err;
      console.log("Select Complete!!");
      console.log(result);
      return res.send(result);
  });
})

app.post('/register', require('./register'))
app.post('/login', require('./login'))
app.post('/forgetpassword', require('./forgetpassword'))

app.listen(8888, () => console.log("Server is Running..."));