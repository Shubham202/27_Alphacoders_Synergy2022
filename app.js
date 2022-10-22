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

const studentSchema = new mongoose.Schema({
    Name: String,
    Email: String,
    Password: String,
    Contact_number: Number,
    Roll_number: Number
});

const adminSchema = new mongoose.Schema({
    Name: String,
    Email: String,
    Password: String,
    Contact_number: Number,
    Staff_number: Number
});

const Student = mongoose.model("Student", studentSchema);

app.get("/", (req, res) => {
    res.render("index");
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});