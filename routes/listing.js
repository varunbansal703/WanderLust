const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require('../models/listings.js');
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controller/listing.js")
const multer  = require("multer");
const {storage} = require("../cloudConfig.js")
const upload = multer({ storage })

// Index Route
router.get("/", wrapAsync(listingController.index));

//New Route 
router.get("/new", isLoggedIn, listingController.renderNewForm);

//Show Route
router.get("/:id", wrapAsync(listingController.showListings));

//Create Route
router.post("/", isLoggedIn, upload.single("listing[image]") ,validateListing , wrapAsync(listingController.createListing));

//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.editListing));

//Update Route
router.put("/:id", isLoggedIn, isOwner , upload.single("listing[image]") , validateListing, wrapAsync(listingController.updateListing));

//Delete Route
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));

module.exports = router;
