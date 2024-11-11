const express = require("express");
const router = express.Router({mergeParams: true});

const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/reviewModel.js");
const Listing = require("../models/listingModel.js");
const {isLoggedIn, validateReview, isReviewAuthor} = require("../middlewares/middleware.js");
const reviewController = require("../controllers/reviewsController.js");

//post reviews route
router.post("/",isLoggedIn,validateReview, wrapAsync(reviewController.createReview ));
  
  // delete review 
  router.delete("/:reviewId",isLoggedIn,isReviewAuthor, wrapAsync(reviewController.deleteReview ));

  module.exports = router;