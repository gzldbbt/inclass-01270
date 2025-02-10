//NODEJS


//Declare the libraries

const express = require("express");
const mysql = require("mysql2/promise");

const app = express();
const port = 3000;

const dbConfig = {
    host:"localhost",
    user:"-in-class-user",
    password:"123456",
    database:"in-class-d",
    port:3306
}

app.use(express.json());

//HRRP VERBS: POST, GET, PUT, PATCH, OPTIONS
//first endpoint
//GET
app.get("/",(req,res) => {
    res.status(200).json({message: "API isrunning"});
})

app.listen(port,() =>{
    console.log('The server is running, PORT: ${port}');

})