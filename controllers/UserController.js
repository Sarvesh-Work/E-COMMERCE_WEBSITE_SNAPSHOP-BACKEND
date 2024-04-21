const User = require("../model/User");


exports.fetchUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id, "name email id role address");

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(404).json({ error: "User not found" });
  }
};

exports.updateUserById = async (req, res) => {
  try {
    const id = req.params.id;

    const UserById = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json(UserById);
  } catch (error) {
    console.error("Error finding User:", error);

    res.status(500).json({ error: "Internal server error" });
  }
};
