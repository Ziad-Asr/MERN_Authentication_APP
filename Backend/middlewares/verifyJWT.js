const jwt = require("jsonwebtoken");

exports.verifyJWT = (req, res, next) => {
  // Frondend will send access token in headers
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).send({
      message: "Unauthorized",
    });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECTRET, (err, decoded) => {
    if (err) {
      return res.status(403).send({
        message: "Forbidden",
      });
    }

    // put the id of the user in the req to be available in all middlewares.
    req.user = decoded.UserInfo.id;

    next();
  });
};
