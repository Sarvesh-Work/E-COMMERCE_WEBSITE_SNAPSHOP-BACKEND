const Category = require("../model/Category");

exports.fetchAllCategories = async (req, res) => {
  try {
    const response = await Category.find({});
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.createCategories = async (req, res) => {
  try {
    const category = new Category(req.body);
    const savedCategory = await category.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
