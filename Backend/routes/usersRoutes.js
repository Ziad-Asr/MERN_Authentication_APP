const express = require("express");
const usersControllers = require("../controllers/usersControllers");
const { verifyJWT } = require("../middlewares/verifyJWT");

const router = express.Router();

router.use(verifyJWT);
router.route("/").get(usersControllers.getAllUsers);

module.exports = router;
