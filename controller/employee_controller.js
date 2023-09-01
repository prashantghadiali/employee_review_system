const Employee = require("../models/Employee");
const passport = require('passport');

// for render sign up page
module.exports.signin = function(req, res){
    if (req.isAuthenticated()) {
        res.redirect('/');
    }
    return res.render('user_sign_in', {
        title: "ERS | Log In",
        req: req 
    })
}

module.exports.signup = function(req, res){
    // const Employee = Employee.findOne({emai})

    return res.render('user_sign_up', {
        title: "ERS | Register",
        req: req 
    })
}



module.exports.register = async function(req, res){
    if (req.isAuthenticated()) {
        res.redirect('/');
    }
    // if password and confirm password not matched redirect back
    if (req.body.password != req.body.confpass) {
        console.log("pass and conf pass not matched");
        return res.status(400).json({
                    messeage: "Please Enter Same Value of Password and Confirm Password!",
                    data: {},
                });
        // return res.redirect('back');
    }
    console.log("Email: ",req.body.email);
    try{
        // If password and confirm password matched, find employee.
        let emp = await Employee.findOne({email:req.body.email});
        
        // if that email is not in database, then create new employee.
        if(emp){
            return res.status(400).json({
                messeage: "You Already Have an Account!",
                data: {},
            });             
        }
        else if(!emp){
            emp = await Employee.create(req.body);
                console.log("create Success", req.body);
                return res.status(201).json({
                    messeage: "Employee Created!",
                    data: {},
                });
                // return res.redirect('/employee/signin');
        }
        else{
            return res.redirect('back');    // if employee is in database then redirect back 
        }
    }catch(err){
        console.log("Error in Employee Create", err);   // if detects any error
    }
}


module.exports.login = async function(req, res){
    return res.redirect("/");
}

// destroy session
module.exports.logout = function(req, res){
    req.logout(function(err) {
        if (err) {
            return next(err);
        }
        console.log("Logged Out");
        return res.redirect('/employee/signin');
    });
}


