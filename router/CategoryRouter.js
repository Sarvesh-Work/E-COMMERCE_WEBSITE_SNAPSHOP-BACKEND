const express = require("express");
const {
  fetchAllCategories,
  createCategories,
} = require("../controllers/CategoryController");
const router = express.Router();

router.get("/", fetchAllCategories).post("/", createCategories);
exports.router = router;
