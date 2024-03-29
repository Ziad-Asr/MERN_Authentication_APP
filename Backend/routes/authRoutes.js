const express = require("express");
const authControllers = require("../controllers/authControllers");

const router = express.Router();

router.route("/register", authControllers.register);

module.exports = router;
