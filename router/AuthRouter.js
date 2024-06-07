const express = require("express");
const {
  createUser,
  loginUser,
  checkAuth,
  resetPasswordRequest,
  resetPassword,
  signOutUser,
} = require("../controllers/AuthController");
const passport = require("passport");
const router = express.Router();

router
  .post("/signup", createUser)
  .post("/login", passport.authenticate("local"), loginUser)
  .get("/check", passport.authenticate("jwt"), checkAuth)
  .post(
    "/reset-password-request",
    passport.authenticate("jwt"),
    resetPasswordRequest
  )
  .post(
    "/reset-password",
    passport.authenticate("jwt"),
    resetPassword
  )
  .post("/logout", passport.authenticate("local"), signOutUser)
exports.router = router;
