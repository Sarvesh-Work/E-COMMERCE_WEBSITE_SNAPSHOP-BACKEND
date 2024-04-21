const express = require("express");
const {
  fetchUserById,
  updateUserById,
} = require("../controllers/UserController");

const router = express.Router();

router
  .get("/:id", fetchUserById)
  .patch("/:id", updateUserById);

exports.router = router;
