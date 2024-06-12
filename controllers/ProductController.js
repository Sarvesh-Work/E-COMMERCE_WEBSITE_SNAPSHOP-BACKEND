const Product = require("../model/Product");

exports.createProduct = async (req, res) => {
  try {
    // Input validation
    const { name, price, discountPercentage } = req.body;
    if (!name || !price || !discountPercentage) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Calculate discount price
    const discountPrice = Math.round(price * (1 - discountPercentage / 100));

    // Create new product instance
    const product = new Product({
      name,
      price,
      discountPercentage,
      discountPrice,
    });

    // Save product to database
    const savedProduct = await product.save();

    // Return success response
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    // Return error response
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.fetchAllProducts = async (req, res) => {
  try {
    const condition = {};
    if (!req.query.admin) {
      condition.deleted = { $ne: true };
    }
    let query = condition;
    if (req.query.category)
      query = { category: { $in: req.query.category.split(",") } };
    if (req.query.brand) query = { brand: { $in: req.query.brand.split(",") } };

    const totalDocs = await Product.countDocuments(query);

    const pageSize = parseInt(req.query._limit) || 10;
    const page = parseInt(req.query._page) || 1;

    const docs = await Product.find(query)
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

exports.fetchProductById = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ error: "Product ID is missing" });
    }

    const productById = await Product.findById(id);

    if (!productById) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(productById);
  } catch (error) {
    console.error("Error finding product:", error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.updateProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    updatedProduct.discountPrice = Math.round(
      updatedProduct.price * (1 - updatedProduct.discountPercentage / 100)
    );

    await updatedProduct.save();

    res.status(200).json(updatedProduct);
  } catch (err) {
    console.error("Error updating product:", err.message);
    res.status(400).json({ error: err.message });
  }
};
