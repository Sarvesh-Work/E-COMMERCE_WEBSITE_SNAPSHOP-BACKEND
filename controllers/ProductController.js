const Product = require("../model/Product");

exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


exports.fetchAllProducts = async (req, res) => {
    try {
      const query = {};
      if (req.query.category) query.category = req.query.category;
      if (req.query.brand) query.brand = req.query.brand;

    //   console.log(query)
  
      const totalDocs = await Product.countDocuments(query);
      
      const pageSize = parseInt(req.query._limit) || 10;
      const page = parseInt(req.query._page) || 1;
  
      const docs = await Product.find(query)
        .sort(req.query._sort ? { [req.query._sort]: req.query._order === 'desc' ? -1 : 1 } : {})
        .skip(pageSize * (page - 1))
        .limit(pageSize)
        .exec();
  
      res.set('X-Total-Count', totalDocs);
      res.status(200).json(docs);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  

  