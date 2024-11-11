const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");


const userController = require("../controllers/usersController.js");

// signup 
router.route("/signup").post(userController.signUp);

// login 
router.route("/login").post( userController.logIn); // No need to wrap in wrapAsync, passport handles authentication

router.get("/logout", userController.logOut);

module.exports = router;
