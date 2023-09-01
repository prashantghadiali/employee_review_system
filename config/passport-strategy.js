const passport = require("passport");
const LocalStratagy = require("passport-local").Strategy;
const Employee = require("../models/Employee");

// auth using passport
passport.use(new LocalStratagy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    async function(req, email, password, done){
        // find user
        console.log("email", email); 
        console.log("password", password);
        try {
            let emp = await Employee.findOne({'email':email}); 
            console.log("emp: ", emp);
            if (!emp) {
                console.log("Employee is not Registered!");
                
                return done(null, false);
            }
            else if (emp.password != password) {
                console.log("Invalid Email OR Password!");
                return done(null, false);
            }
            return done(null, emp);
        } catch (error) {
            return done(error, false);
        } 
    }
));  


// passport serializing for emp which key is add in cookie
passport.serializeUser(function(emp, done){
    done(null, emp.id);    //emp ID is passed
});


// passport deserializing from key in cookie
passport.deserializeUser(async function(id, done){
    try {
        let emp = await Employee.findById(id);
        return done(null, emp);
    } catch (error) {
        console.log("Error finding emp"); 
        return done(error, false);
    }  
});


// Check if the user is authenticated
passport.checkAuth = function(req, res, next){
    // if user is signed in then request to the next function(controllers ation)
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/employee/signin');
}

// once sign in then
passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        res.locals.emp = req.emp;
        // res.locals.user = req.user;
    }
    next()
}





module.exports = passport;