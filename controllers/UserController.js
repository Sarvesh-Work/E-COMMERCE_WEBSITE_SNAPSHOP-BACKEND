const { sanitizeUser } = require("../Services/common");
const User = require("../model/User");

exports.fetchUserInfo = async (req, res) => {
  const { id } = req.user;
  console.log(id);
  try {
    const user = await User.findById(id);
    setTimeout(() => {
      res.status(200).json({
        id: user.id,
        address: user.address,
        email: user.email,
        role: user.role,
      });
    }, 1000);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.user;
    const UserById = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    setTimeout(()=>{
      res.status(200).json(UserById);
    },1000)
  } catch (error) {
    console.error("Error finding User:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
