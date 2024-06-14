const express = require("express");
const router = express.Router({mergeParams : true});
const wrapAsync = require("../utils/wrapAsync.js");
const {validateReview , isLoggedIn , isReviewAuthor} = require("../middleware.js")
const reviewController = require("../controller/review.js")

//POST review Route
router.post("/", isLoggedIn , validateReview, wrapAsync(reviewController.createReview));

//Delete Reveiw Route
router.delete("/:reviewId" ,isLoggedIn , isReviewAuthor , wrapAsync(reviewController.deleteReview));

module.exports = router;