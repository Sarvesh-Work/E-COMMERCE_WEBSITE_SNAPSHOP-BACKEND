const express = require("express");
const {
  createProduct,
  fetchAllProducts,
  fetchProductById,
  updateProductById,
  fetchProductCategory,
} = require("../controllers/ProductController");
const router = express.Router();

router
  .post("/", createProduct)
  .get("/", fetchAllProducts)
  .get("/:id", fetchProductById)
  .patch("/:id", updateProductById)

exports.router = router;
