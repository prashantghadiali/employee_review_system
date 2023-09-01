const express = require('express');
const router = express.Router();
const passport = require("passport");
const Review = require('../models/Review');



router.use('/employee', require('./employee'));
router.use('/admin', require('./admin'));

/* GET home page which is Employee Page */
router.get('/', passport.checkAuth, async (req, res)=>{
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;
  const count = await Review.countDocuments();
  // const reviews = await Review.find().skip(skip).limit(limit);
  const reviews = await Review.find({})
                          .skip(skip)
                          .limit(limit)
                          .sort({ field: 'asc', _id: -1 })
                          .populate('employee')
                          .populate('reviewer')
                          .then((reviews) => {
                            // console.log("Reviews", reviews);
                            const pages = Math.ceil(count / limit);
                            
                            return res.render('employee', { reviews:reviews, page:page, pages:pages, req:req, title:"Employee Review System | Home" });
                          })
                          .catch((err) => {
                            console.log(err);
                          });
});

// Review Post
router.post('/review', async (req, res)=>{
  try {
    let rew = await Review.findOne({});
    console.log("body:", req.body);
    if(!rew || rew){
      rew = await Review.create(req.body);
                console.log("create Review Success", req.body);
                return res.status(201).json({
                    messeage: "Review Taken Succesfully!",
                    data: {},
                });
    }else{
      return res.redirect('back');    // if review is in database then redirect back 
    }
  } catch (error) {
    console.log("Error in Employee Create", error);   // if detects any error
  }
});

// feedback Delete by Admin
router.post('/review/:id/delete', async function(req, res){
  try {
    await Review.findByIdAndRemove(req.params.id);
    return res.redirect('/');
  } catch (err) {
    console.log(err);
    return res.redirect('/');
  }
});

// feedback Edit View by Admin
router.post('/reviews/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const employee = req.body.employeeedit;
    const reviewer = req.body.reviewer_id;
    const feedback = req.body.feedback;
    console.log("id", id);
    console.log("employee", employee);
    console.log("reviewer", reviewer);
    console.log("feedback", feedback);
    await Review.findByIdAndUpdate(id, {employee:employee, reviewer:reviewer, feedback:feedback});
    res.redirect(`back`);
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred while updating the review');
  }
});
// router.post('/review/:id/editreview', async function(req, res){
//   const reviewID = req.params.id;
//   console.log("reviewID", reviewID);
//   const review = await Review.findById(reviewID);
//   return res.render('rewedit', {
//       title: "ERS | Review Edit",
//       req: req,
//       review:review 
//   })
// });

// router.post('/:id/edit', adminController.edit);





module.exports = router;