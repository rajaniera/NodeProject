const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const server = express();
server.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test",
});
db.connect(function (error) {
  if (error) {
    console.log("Error Connecting to DB");
  } else {
    console.log("successfully Connected to DB");
  }
});
//Establish the Port
server.listen(8085, function check(error) {
  if (error) {
    console.log("Error....dddd!!!!");
  } else {
    console.log("Started....!!!! 8085");
  }
});
//Create the Records
server.post("/api/student/add", (req, res) => {
  console.log(req.body);
  let details = {
    student_name: req.body.student_name,
    course: req.body.course,
    Fee: req.body.Fee,
  };
  let sql = "INSERT INTO student_info SET ?";
  db.query(sql, details, (error) => {
    if (error) {
      res.send({ status: false, message: "Student created Failed" });
    } else {
      res.send({ status: true, message: "Student created successfully" });
    }
  });
});

//view the Records

server.get("/api/student", (req, res) => {
  var sql = "SELECT * FROM student_info";
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      res.send({ status: true, data: result });
    }
  });
});

//Search the Records

server.get("/api/student/:id", (req, res) => {
  var id = req.params.id;
  var sql = "SELECT * FROM student_info WHERE id=" + id;
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      res.send({ status: true, data: result });
    }
  });
});

//Update the Records

server.put("/api/student/update/:id", (req, res) => {
  debugger;
  console.log(req.params.id);
  let sql =
    "UPDATE student_info SET student_name='" +
    req.body.student_name +
    "'  WHERE id=" +
    req.params.id;

  let a = db.query(sql, (error, result) => {
    if (error) {
      res.send({ status: false, message: "Student Updated Failed" });
    } else {
      res.send({ status: true, message: "Student Updated successfully" });
    }
  });
});

//Delete the Records

server.delete("/api/student/delete/:id", (req, res) => {
  let sql = "DELETE FROM student_info WHERE id=" + req.params.id + "";
  let query = db.query(sql, (error) => {
    if (error) {
      res.send({ status: false, message: "Student Deleted Failed" });
    } else {
      res.send({ status: true, message: "Student Deleted successfully" });
    }
  });
});
