const Order = require("../model/Order");

exports.fetchOrderByUser = async (req, res) => {
  const { user } = req.query;
  try {
    const orders = await Order.find({ user: user });
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.createOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const OrderById = await Order.findByIdAndDelete(id);
    res.status(200).json(OrderById);
  } catch (error) {
    console.error("Error finding Item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const updateOrder = await Order.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(result);
  } catch (error) {
    console.error("Error finding product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
