const express = require("express");
const { addToCart, fetchCartByUser } = require("../controllers/CartControllers");
const router = express.Router();

router
  .post("/", addToCart)
  .get("/", fetchCartByUser)

exports.router = router;