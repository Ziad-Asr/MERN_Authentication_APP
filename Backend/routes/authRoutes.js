const express = require("express");
const authControllers = require("../controllers/authControllers");

const router = express.Router();

router.route("/register", authControllers.register);
router.route("/login", authControllers.login);
router.route("/logout", authControllers.logout);

module.exports = router;
