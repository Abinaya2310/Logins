const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/Login", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Database Connected Successfully");
    })
    .catch((error) => {
        console.log("Database cannot be Connected");
        console.error(error);
    });

const Loginschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
});

const collection = mongoose.model("users1", Loginschema);

module.exports = collection;
