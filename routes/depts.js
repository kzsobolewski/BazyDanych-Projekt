const express = require('express');
const mysql = require('mysql');
const mySqlConfig = require('../mySqlConfig');
var connection = mysql.createConnection(mySqlConfig);
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
const router = express.Router();


router.get('/', (req, res) => {
  connection.query('SELECT * FROM Dzialy', (err, result) => {
    if(err){
      console.log("[MySql] " + err);
      res.status(404);
    }else {
      res.json(result);
      res.status(200);
    }
  });
});


router.post('/', jsonParser,(req, res) => {
  if (!req.body){
      res.sendStatus(400);
      return;
   }
  connection.query('insert into Dzialy set ?', req.body, (err, result) => {
    if(err) {
      console.error("[MySql]" + err);
      res.sendStatus(409);
      return;
    }
    console.log("[MySql] Departament record added");
    console.log(result);
    res.sendStatus(201);
    return;
  });
});


router.delete('/:id', (req, res) =>{
  connection.query('DELETE FROM Dzialy WHERE dzial_id = ?',req.params.id , (err, result) => {
    if(err) {
      console.error("[MySql]" + err);
      res.sendStatus(409);
      return;
    }
    console.log("[MySql] Deleted");
    console.log(result);
    res.sendStatus(200);
  });
});


module.exports = router;