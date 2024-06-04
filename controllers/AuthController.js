const { sanitizeUser } = require("../Services/common");
const User = require("../model/User");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");


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
        req.login(sanitizeUser(savedUser), (err) => {
          if (err) {
            res.status(400).json(error);
          } else {
            const token = jwt.sign(
              sanitizeUser(savedUser),
              process.env.JWT_SECRET_KEY
            );
            res
              .cookie("jwt", token, {
                expires: new Date(Date.now() + 3600000),
                httpOnly: true,
              })
              .status(201)
              .json(token);
          }
        });
      }
    );
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.loginUser = async (req, res) => {
  res
    .cookie("jwt", req.user.token, {
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
    })
    .status(201)
    .json(req.user.token);
};

exports.checkAuth = async (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.senStatus(401);
  }
};
