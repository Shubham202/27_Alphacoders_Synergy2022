const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect(
    "mongodb://localhost:27017/synergyDB",
    { useNewUrlParser: true }
);

app.get("/", (req, res) => {
    res.render("index");
});

const studentSchema = new mongoose.Schema({
    Name: String,
    Aadhar_number: Number,
    Email: String,
    Password: String,
    Blood_group: String,
    Contact_number: Number,
    Pin_code: Number
});



app.listen(3000, () => {
    console.log("Server started on port 3000");
});