const express = require('express');
const router = express.Router();


const employeeController = require('../controller/employee_controller');
const passport = require('passport');


// Get Requests "/employee"
router.get('/signin', employeeController.signin);
router.get('/signup', employeeController.signup);
router.get('/logout', employeeController.logout);

// Post Requests "/employee"
router.post('/register', employeeController.register);
router.post('/login', passport.authenticate('local', {failureRedirect : '/employee/signin',successRedirect: '/'}), employeeController.login);


module.exports = router;