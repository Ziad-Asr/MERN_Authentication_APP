const express = require("express");
const authControllers = require("../controllers/authControllers.controller.js");

const router = express.Router();

router.route("/register").post(authControllers.register);
router.route("/login").post(authControllers.login);
router.route("/logout").post(authControllers.logout);
router.route("/refresh").get(authControllers.refresh);

module.exports = router;
