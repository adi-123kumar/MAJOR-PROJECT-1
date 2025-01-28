const wrapAsync = require("../utils/wrapAsync.js")
const ExpressError = require("../utils/ExpressError.js")
const Review = require("../models/review")
const Listing = require("../models/listing.js")

const express = require("express")
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js")
const router = express.Router({ mergeParams: true });
const reviewController = require("../controllers/review.js")
// post Review route
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.createReview))
// delete review route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor, wrapAsync(reviewController.destroyReview))

module.exports = router;