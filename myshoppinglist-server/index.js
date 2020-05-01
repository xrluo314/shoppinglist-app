const express = require("express");

const bodyPaser = require("body-parser");
const cors = require("cors");

const { mysql } = require("./db.js");
var itemController = require("./controllers/itemController.js");
const Item = require("./models/item");
var app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(bodyPaser.json());

var hostName = "localhost";
//var port = 3000;
const port = process.env.PORT || 8080;


app.listen(port, hostName, function () {
  console.log(`Server is running at http://${hostName}:${port}`);
});

app.use("/list", itemController);
