const express = require("express");
const { addToCart, fetchCartByUser, deleteItemFromCart, updateItemInCart } = require("../controllers/CartControllers");
const router = express.Router();

router
  .post("/", addToCart)
  .get("/", fetchCartByUser)
  .delete("/deleteFromCart/:id",deleteItemFromCart)
  .patch("/updateInCart/:id",updateItemInCart)

exports.router = router;