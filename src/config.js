const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/Login", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Database Connected Successfully");
    })
    .catch((error) => {
        console.log("Database cannot be Connected");
        console.error(error);
    });

const userSchema = new mongoose.Schema({
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
    },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
