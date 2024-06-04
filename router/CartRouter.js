const express = require("express");
const { addToCart, fetchCartByUser, deleteItemFromCart, updateItemInCart } = require("../controllers/CartControllers");
const router = express.Router();

router
  .post("/add", addToCart)
  .get("/allProducts", fetchCartByUser)
  .delete("/deleteFromCart/:id",deleteItemFromCart)
  .patch("/updateInCart/:id",updateItemInCart)

exports.router = router;