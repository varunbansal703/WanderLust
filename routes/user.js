const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const UserController = require("../controller/user.js");

router.get("/signup", UserController.renderSignUpForm);

router.post("/signup", UserController.signUp);

router.get("/login", UserController.renderLoginForm);

router.post("/login", saveRedirectUrl, passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }), UserController.login);

router.get("/logout", UserController.logout);

module.exports = router;