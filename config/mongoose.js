const mongoose = require("mongoose");

// connect with mongoose
mongoose.connect("mongodb://127.0.0.1:27017/employee_review_system");

//database connection
const database = mongoose.connection;

// If any error in mongoose
database.on("error", console.error.bind(console, "Error Connecting to MongoDB"));

// It operated one time IF mongoose database is connected.
database.once('open', function(){
    console.log("Database Connected :: MongoDB");
    console.log("Click to go : http://localhost:3002/employee/signin");
})


module.exports = database;