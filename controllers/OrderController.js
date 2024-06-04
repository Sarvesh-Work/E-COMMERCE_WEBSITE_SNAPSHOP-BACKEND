const Order = require("../model/Order");

exports.fetchOrderByUser = async (req, res) => {
  try {
    const { id } = req.user;
    const orders = await Order.find({ user: id });
    setTimeout(() => {
    res.status(200).json(orders);
    }, 1000);
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
    res.status(200).json(updateOrder);
  } catch (error) {
    console.error("Error finding product:", error);
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
