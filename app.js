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
    res.render("login");
});

// app.post("/register_student", (req, res) => {
//     const student = new Student({
//         Name: req.body.name,
//         Email: req.body.emailID,
//         Password: req.body.password,
//         Contact_number: req.body.contactNumber,
//         Roll_number: req.body.rollNumber
//     });

//     Student.findOne({ Email: req.body.emailID }, (err, foundStudent) => {
//         if (!foundStudent) {
//             student.save();
//             res.render("login");
//         } else {
//             let message = "Student already exist";
//             res.render("register", { message: message });
//         }
//     });
// });

app.post("/login_student", (req, res) => {
    Student.findOne({ Email: req.body.emailID }, (err, foundStudent) => {
        if (foundStudent) {
            if (req.body.password === foundStudent.Password) {
                res.render("GetBloodPage", { banks: null });
            }
        } else {
            let message = "Student does not exist";
            res.render("register", { message: message });
        }
    });
});

app.listen(8080, () => {
    console.log("Server started on port 8080");
});