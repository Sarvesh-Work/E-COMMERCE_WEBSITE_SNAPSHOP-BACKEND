const express = require("express");
const {
  fetchAllBrands,
  createBrands,
} = require("../controllers/BrandController");
const router = express.Router();

router.get("/", fetchAllBrands).post("/", createBrands);

exports.router = router;
