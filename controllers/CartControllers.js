const Cart = require("../model/Cart");

exports.fetchCartByUser = async (req, res) => {
  const { id } = req.user;
  try {
    const response = await Cart.find({ user: id })
      .populate("user")
      .populate("product");
    setTimeout(() => {
      res.status(200).json(response);
    }, 1000);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { id } = req.user;
    const cart = new Cart({ ...req.body, user: id });
    const savedCart = await cart.save();
    const result = await savedCart.populate("product");
    res.status(201).json(result);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteItemFromCart = async (req, res) => {
  try {
    const id = req.params.id;
    const ItemById = await Cart.findByIdAndDelete(id);
    res.status(200).json(ItemById);
  } catch (error) {
    console.error("Error finding Item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateItemInCart = async (req, res) => {
  try {
    const id = req.params.id;
    const updateItem = await Cart.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    const result = await updateItem.populate("product");
    res.status(200).json(result);
  } catch (error) {
    console.error("Error finding product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
