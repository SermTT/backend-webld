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

router.post('/register', (req, res,) => {
  
  const username = req.body.ชื่อผู้ใช้;
  const password = req.body.รหัสผ่าน;
  const name =req.body.ชื่อจริง;
  const lastname = req.body.นามสกุล;
  const address = req.body.ที่อยู่ติดต่อ;
  const province = req.body.จังหวัด;
  const wtel = req.body.เบอร์ติดต่อที่ทำงาน;
  const tel =req.body.เบอร์ติดต่อมือถือ;
  const email = req.body.Email;
  const status =req.body.สถานะของบัญชี;
  const ระดับชั้นของผู้ใช้งานโปรแกรม =req.body.ระดับชั้นของผู้ใช้งานโปรแกรม;

    con.query(
      "INSERT INTO users (ชื่อผู้ใช้, รหัสผ่าน, ชื่อจริง, นามสกุล, ที่อยู่ติดต่อ, จังหวัด, เบอร์ติดต่อที่ทำงาน, เบอร์ติดต่อมือถือ, Email, สถานะของบัญชี, ระดับชั้นของผู้ใช้งานโปรแกรม) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", 
      [ username, password, name, lastname, address, province, wtel, tel, email, status, ระดับชั้นของผู้ใช้งานโปรแกรม],
       (error, results, fields) => {
      if (error) {
        console.log(error);
      } else{res.send({  data : results, message : this.username})}
    })
  }
);


