const express = require('express');
const router = express.Router();
const adminController = require('../controller/admin_controller');
const passport = require('passport');

// get "/admin" Data
router.get('/', adminController.admin); 
router.get('/:id/editview', adminController.editview); 

// post "/admin" Data
router.post('/:id/delete', adminController.delete);
router.post('/:id/edit', adminController.edit);



  


module.exports = router;