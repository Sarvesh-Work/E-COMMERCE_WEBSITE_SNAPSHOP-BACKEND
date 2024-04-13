

const Brand = require("../model/Brand");

exports.fetchAllBrands = async (req, res) => {
   try {
     const response = await Brand.find({});
     res.status(200).json(response);
   } catch (error) {
     res.status(400).json(error);
   }
};

exports.createBrands = async (req, res) => {
    try {
      const brand = new Brand(req.body);
      const savedBrand = await brand.save();
      res.status(201).json(savedBrand);
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
