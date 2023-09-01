const Admin = require('../models/Employee');
const Employee = require('../models/Employee');
const Review = require('../models/Review');
const passport = require('passport');

module.exports.admin = async (req, res)=>{
  try {
      let admin = await Admin.findOne({ email: req.user.email, isAdmin: true });
      console.log("Admin:", admin);
      const page = parseInt(req.query.page) || 1;
      const limit = 10;
      const skip = (page - 1) * limit;
      const count = await Employee.countDocuments();
      let employees = await Employee.find()
                          .skip(skip)
                          .limit(limit)
                          .sort({ field: 'asc', _id: -1 });
      const pages = Math.ceil(count / limit);

      return res.render('admin', {employees:employees, admin:admin,page:page, pages:pages, req,req, title: 'ERP | Admin Panel'})
    } catch (error) {
      console.log("Admin Error: ", error);
    }
};


// Delete Employee
module.exports.delete = async function(req, res){
  try {
    await Employee.findByIdAndRemove(req.params.id);
    return res.redirect('/admin');
  } catch (err) {
    console.log(err);
    return res.redirect('/admin');
  }
}

// Edit Employee
// for Edit View
module.exports.editview = async function(req, res){
  const employeeId = req.params.id;
  const employee = await Employee.findById(employeeId);
  return res.render('empedit', {
      title: "ERS | Edit View",
      req: req,
      employee:employee 
  })
}

module.exports.edit = async function(req, res){
  try {
      const employeeId = req.params.id;
      const name = req.body.name;
      const email = req.body.email;
      const isAdmin = req.body.isAdmin;
      console.log("isAdmin", isAdmin);
      // Find the employee in the database using the ID
      let employee = await Employee.findByIdAndUpdate(employeeId,{name:name, email:email, isAdmin:isAdmin});
      res.render('empedit', { employee: employee });
      if (employee) {
        return res.redirect('/admin');
      } else {
        return res.redirect('back');
      }

      // Render the edit page with the employee data
      return res.render('empedit', { employee: employee });
    } catch (err) {
        // Handle error
        console.error(err);
        res.status(500).send('An error occurred while retrieving the employee data');
    }
}

  






