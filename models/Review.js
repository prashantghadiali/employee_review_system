// Require mongoose
const mongoose = require('mongoose');

// Define the schema
const reviewSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Types.ObjectId,
    ref: 'Employee',
    required: true,
  },
  reviewer: {
    type: mongoose.Types.ObjectId,
    ref: 'Employee',
    default: '64ec89b069338bb3621d4b79',
  },
  feedback: {
    type: String,
    default: '',
    required: true,
  },
});


const Review = mongoose.model('Review', reviewSchema);

// Export the model
module.exports = Review;