

const express = require("express");
const path = require("path");
const collection = require("./config");
const bcrypt = require('bcrypt');

const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

app.post("/signup", async (req, res) => {
    const data = {
        name: req.body.username,
        password: req.body.password,
        confirmpassword: req.body.confirmpassword,
        email: req.body.emailid
    };

    if (data.password !== data.confirmpassword) {
        return res.send('Passwords do not match. Please try again.');
    }

    const existingUser = await collection.findOne({ name: data.name });
    if (existingUser) {
        return res.send('User already exists. Please choose a different username.');
    } else {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);
        data.password = hashedPassword;

        await collection.insertMany({ name: data.name, password: data.password, email: data.email });
        res.send('Signup successful. Please login.');
    }
});

app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({ name: req.body.username });
        if (!check) {
            return res.send("Username not found.");
        }

        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if (!isPasswordMatch) {
            return res.send("Wrong password.");
        } else {
            const users = await collection.find(); // Fetch all users
            res.render("home", { users }); // Pass users to the home view
        }
    } catch (error) {
        res.send("An error occurred. Please try again.");
    }
});

app.get("/home", async (req, res) => {
    try {
        const users = await collection.find(); // Fetch all users
        res.render("home", { users }); // Pass users to the home view
    } catch (error) {
        res.send("An error occurred. Please try again.");
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
