require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors")
const port = 8000;
const server = require("http").createServer(app);
const mysql = require("mysql2")


const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.ROOT_PASS,
    database: "Test"
})

connection.connect((err) => {
    if (err) console.log("Error connecting to the DB" + err.stack);
    else console.log("Connected to the DB")
});

//Cors Middleware
app.use(
    cors({
        origin: "*",
        methods: ["PUT", "GET", "POST", "DELETE"],
        credentials: true
    })
)

app.get("/test", (req, res) => {
    res.json("This string was sent by the server.")
})

app.get("/users", (req, res) => {
    connection.query('SELECT * FROM Users', (err, results) => {
        if (err) {
            console.log("Error execute."); res.json("error");
        } else {
            res.json(results)
        }
    })
})

server.listen(port, function () {
    console.log("Server listening on port " + port)
})