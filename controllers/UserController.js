const User = require("../model/User");

exports.fetchUserInfo = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id).select("id address email role");
    res.status(200).json(user);
  } catch (err) {
    console.error("Error fetching user info:", err);
    res.status(400).json({ error: "Bad request" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.user;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
