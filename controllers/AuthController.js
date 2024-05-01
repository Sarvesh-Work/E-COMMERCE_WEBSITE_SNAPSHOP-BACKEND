const User = require("../model/User");

exports.createUser = async (req, res) => {
  try {
    const user = await new User(req.body);
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const user =await  User.findOne({email:req.body.email});
    if (!user) {
      res.status(401).json({ error: "user not found" });
    }
    else if(user.password!==req.body.password){
        res.status(401).json({ error: "wrong password" });  
    }
     
    else {
      res.status(201).json({ id: user.id, email: user.email, role:user.role });
    }
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
