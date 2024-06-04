const express = require("express");

const { createUser, loginUser, checkAuth } = require("../controllers/AuthController");
const passport = require("passport");

const router = express.Router();

router
  .post("/signup", createUser)
  .post("/login", passport.authenticate("local"), loginUser)
  .get("/check", passport.authenticate("jwt"),checkAuth)

exports.router = router;
