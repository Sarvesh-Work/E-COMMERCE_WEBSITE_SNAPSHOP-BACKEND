const express = require("express");
const {
  fetchUserInfo,
  updateUser,
} = require("../controllers/UserController");

const router = express.Router();

router
  .get("/info", fetchUserInfo)
  .patch("/update", updateUser);

exports.router = router;
