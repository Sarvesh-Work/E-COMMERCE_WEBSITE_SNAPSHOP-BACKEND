const express = require("express");
const { createOrder, fetchOrderByUser, deleteOrder, updateOrder, fetchAllOrders } = require("../controllers/OrderController");
const router = express.Router();

router
  .post("/", createOrder)
  .get("/user", fetchOrderByUser)
  .delete("/deleteOrder/:id", deleteOrder)
  .patch("/updateOrder/:id", updateOrder)
  .get("/", fetchAllOrders)

exports.router = router;
