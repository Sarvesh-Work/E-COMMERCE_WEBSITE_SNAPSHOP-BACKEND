const { sendMail, invoice } = require("../Services/common");
const Order = require("../model/Order");
const Product = require("../model/Product");
const User = require("../model/User");

exports.fetchOrderByUser = async (req, res) => {
  try {
    const { id } = req.user;
    const orders = await Order.find({ user: id }).lean();
    setTimeout(() => {
      res.status(200).json(orders);
    }, 1000);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.createOrder = async (req, res) => {
  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();
    const user = await User.findById(newOrder.user);

    const productIds = newOrder.items.map((item) => item.product.id);
    await Product.updateMany(
      { _id: { $in: productIds } },
      { $inc: { stock: -1 } }
    );

    sendMail({
      to: user.email,
      html: invoice(newOrder),
      subject: "Order Received",
    });

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json(deletedOrder);
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedOrder = await Order.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.fetchAllOrders = async (req, res) => {
  try {
    const query = { deleted: { $ne: true } };

    const totalDocs = await Order.countDocuments(query);

    const pageSize = parseInt(req.query._limit) || 10;
    const page = parseInt(req.query._page) || 1;

    const docs = await Order.find(query)
      .sort(
        req.query._sort
          ? { [req.query._sort]: req.query._order === "desc" ? -1 : 1 }
          : {}
      )
      .skip(pageSize * (page - 1))
      .limit(pageSize)
      .exec();

    res.set("X-Total-Count", totalDocs);
    res.status(200).json(docs);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
