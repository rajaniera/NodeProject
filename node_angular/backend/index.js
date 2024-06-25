const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql2");
app.use(cors());
app.use(bodyparser.json());

//database connect

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "user",
});
db.connect(function (error) {
  if (error) {
    console.log("Error Connecting to DB");
  } else {
    console.log("successfully Connected to DB");
  }
});

//get detail api
app.get("/user", (req, res) => {
  var sql = "SELECT * FROM user_data";
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      res.send({ status: true, data: result });
    }
  });
});

//post data

app.post("/user/add", (req, res) => {
  console.log(req.body);
  let details = {
    fullname: req.body.fullname,
    email: req.body.email,
    mobile: req.body.mobile,
  };
  let sql = "INSERT INTO user_data SET ?";
  db.query(sql, details, (error) => {
    if (error) {
      res.send({ status: false, message: "Student created Failed" });
    } else {
      res.send({ status: true, message: "Student created successfully" });
    }
  });
});
app.listen(3000, () => {
  console.log("server running");
});
//put data
app.put("/user/:id", (req, res) => {
  console.log("update data");

  let gId = req.params.id;
  let fname = req.body.fullname;
  let eMail = req.body.email;
  let mb = req.body.mobile;
  let q = `update user_data set fullname='${fname}',email='${eMail}',mobile='${mb}' where id=${gId}`;

  db.query(q, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send({ messages: "data updated" });
  });
});

//get single data
app.get("/user/:id", (req, res) => {
  let gid = req.params.id;
  let qr = `select * from user_data where id=${gid}`;
  db.query(qr, (err, results) => {
    if (results.length > 0) {
      res.send({ status: true, msg: "get single data", data: results });
    } else {
      res.send({ status: false, msg: "no data found", data: results });
    }
  });

  console.log("get single data");
});

//delete

app.delete("/user/delete/:id", (req, res) => {
  let qid = req.params.id;
  let q = `delete from user_data  where id='${qid}'`;
  db.query(q, (err, result) => {
    if (err) {
      console.log("error");
    }
    res.send({ messages: "delete data successfully" });
  });
});
