const express = require("express");

const { createUser, loginUser } = require("../controllers/AuthController");
const passport = require("passport");
const { check } = require("prettier");

const router = express.Router();

router
  .post("/signup", createUser)
  .post("/login", passport.authenticate("local"), loginUser)
  .post("/check",passport.authenticate("jwt"),check)

exports.router = router;
