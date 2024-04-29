const express = require("express");
const { createOrder, fetchOrderByUser, deleteOrder, updateOrder } = require("../controllers/OrderController");
const router = express.Router();

router
  .post("/", createOrder)
  .get("/", fetchOrderByUser)
  .delete("/deleteOrder/:id", deleteOrder)
  .patch("/updateOrder/:id", updateOrder);

exports.router = router;
