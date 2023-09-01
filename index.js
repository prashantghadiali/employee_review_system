const express = require('express');
// const cookieParser = require('cookie-parser');
const app = express();
const path = require('path');
const port = 3002;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const mongooseStore = require("connect-mongo");

// for session storage
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-strategy");



// Used express.urlencoded with extended option
app.use(express.urlencoded({ extended: true }));
// app.use(express.urlencoded());

// app.use(cookieParser());

app.use(express.static('./assets'));

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



// we use ejs engine
app.set('view engine', 'ejs');

// set up the view engine
app.set('views', path.join(__dirname, 'views'));


app.use(session({
    name: 'prashant',
    secret: 'he_made_this_ERS',    //change this before deploy on production
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (9000000 *1000)     //in milliseconds
    },
    store: mongooseStore.create({
        mongoUrl: "mongodb://127.0.0.1:27017/employee_review_system",
        autoRemove: 'disabled'
    },
    function(err){
        console.log("Mongoose Store Error:", err || "Mongoose Store Connected...");
    }
    )
}));


// to use passport
app.use(passport.initialize());
app.use(passport.session());


app.use(passport.setAuthenticatedUser);

// app.get('/', (req, res)=>{
//     return res.render("home",{ title: 'APP' } );
// })

// use express router
app.use('/', require('./Routes'));


app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);    //if there is any error on server
    }

    console.log(`Server is running on port: ${port}`);
});