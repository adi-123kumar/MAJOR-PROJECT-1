const wrapAsync = require("../utils/wrapAsync.js")

const Listing = require("../models/listing.js")
const {isLoggedIn, isOwner,validateListing} = require("../middleware.js")

const express = require("express")
// controllers
const listingController = require("../controllers/listing.js")
const router = express.Router()
// multer is used to fetch multimedia file like image and files.
const multer = require("multer")
const {storage}= require("../cloudConfig.js");
const upload = multer({storage})

router.route("/")
.get(wrapAsync(listingController.index)) // index route
// .post(isLoggedIn,validateListing, wrapAsync(listingController.createListings));  // create route]
.post(isLoggedIn,upload.single("listing[image]"),validateListing,wrapAsync(listingController.createListings));


  // new route
  router.get("/new", isLoggedIn,listingController.renderNewForm)
  
router.route("/:id")
.get( wrapAsync(listingController.showListings)) //show listings
.put(isLoggedIn,isOwner,upload.single("listing[image]"),validateListing,wrapAsync(listingController.updateListing))  // update route
.delete( isLoggedIn,isOwner,wrapAsync(listingController.destroyListing)); // delete listing


//   edit route
  router.get("/:id/edit", isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));
  module.exports = router;