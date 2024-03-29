const User = require("../models/User");

exports.getAllUsers = async (req, res) => {
  const users = await User.find().select("-password").lean();

  if (!users.length) {
    res.status(400).json({ message: "No users found" });
  }

  res.json(users);
};
