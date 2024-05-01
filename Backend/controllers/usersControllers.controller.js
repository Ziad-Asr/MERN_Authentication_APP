const User = require("../models/User.model");

exports.getAllUsers = async (req, res) => {
  const users = await User.find().select("-password").lean();

  if (!users.length) {
    res.status(404).json({ message: "No users found" });
  }

  res.json(users);
};
