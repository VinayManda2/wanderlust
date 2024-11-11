const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listingModel.js");
const {isLoggedIn,isOwner, validateListing} = require("../middlewares/middleware.js");
const multer  = require('multer');
const {storage} = require("../config/cloudConfig.js");
const upload = multer({ storage });

const listingController = require("../controllers/listingController.js");

//Index Route 
router.route("/").get( wrapAsync(listingController.index))



//Create Route
router.post("/new",upload.single("file"), wrapAsync(listingController.createListing));



// show, update, delete 
router.route("/:id")
.get(wrapAsync(listingController.show ))
.put(upload.single("file"), wrapAsync(listingController.update))
.delete( wrapAsync(listingController.delete));



module.exports = router;