const { sanitizeUser } = require("../Services/common");
const User = require("../model/User");
const crypto = require("crypto");

exports.createUser = async (req, res) => {
  try {
    const salt = crypto.randomBytes(16);
    crypto.pbkdf2(
      req.body.password,
      salt,
      310000,
      32,
      "sha256",
      async function (err, hashedPassword) {
        const user = await new User({
          ...req.body,
          password: hashedPassword,
          salt,
        });
        const savedUser = await user.save();
        res.status(201).json(sanitizeUser(savedUser));
      }
    );
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.loginUser = async (req, res) => {
  res
    .status(201)
    .json(req.user);
};

exports.check=async(req,res)=>{
  res.json(req.user)
}