const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.register = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  // Validate Inputs
  if (!first_name || !last_name || !email || !password) {
    return res.status(400).send({
      message: "All fields are required!",
    });
  }

  // Check if user is already exist
  const foundUser = await User.findOne({ email }).exec();
  if (foundUser) {
    return res.status(400).send({
      message: "User already exist!",
    });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const newUser = await User.create({
    first_name,
    last_name,
    email,
    password: hashedPassword,
  });

  // Generate (access token && refresh token)
  const accessToken = jwt.sign(
    {
      UserInfo: {
        id: foundUser._id,
      },
    },
    process.env.ACCESS_TOKEN_SECTRET,
    {
      expiresIn: "15m",
    }
  ); // Here I used user id in db not email for example (because this token can be decoded and get info in it by hakers)

  const refreshToken = jwt.sign(
    {
      UserInfo: {
        id: foundUser._id,
      },
    },
    process.env.REFRESH_TOKEN_SECTRET,
    {
      expiresIn: "7d",
    }
  );

  // Assign refresh token into brower cookies
  res.cookie("jwt", refreshToken, {
    httpOnly: true, // Can access this cookie using http protocol only (not using any js code like document.cookies or any code else)
    secure: true, // Access it only with https (in production)
    sameSite: "None", // This cookie can be stored  on any domain name (Main domain (website) and subdomain (page in website))
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  // Send Response
  res.status(201).json({
    first_name: newUser.first_name,
    last_name: newUser.last_name,
    email: newUser.email,
    accessToken,
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Validate Inputs
  if (!email || !password) {
    return res.status(400).send({
      message: "All fields are required!",
    });
  }

  // Check if user exist
  const foundUser = await User.findOne({ email }).exec();
  if (!foundUser) {
    return res.status(400).send({
      message: "User does not exist!",
    });
  }

  // Compare password
  const isMatchPass = await bcrypt.compare(password, foundUser.password);
  if (!isMatchPass) {
    return res.status(401).send({
      message: "Wrong password!",
    });
  }

  // Generate (access token && refresh token)
  const accessToken = jwt.sign(
    {
      UserInfo: {
        id: foundUser._id,
      },
    },
    process.env.ACCESS_TOKEN_SECTRET,
    {
      expiresIn: "15m",
    }
  ); // Here I used user id in db not email for example (because this token can be decoded and get info in it by hakers)

  const refreshToken = jwt.sign(
    {
      UserInfo: {
        id: foundUser._id,
      },
    },
    process.env.REFRESH_TOKEN_SECTRET,
    {
      expiresIn: "7d",
    }
  );

  // Assign refresh token into brower cookies
  res.cookie("jwt", refreshToken, {
    httpOnly: true, // Can access this cookie using http protocol only (not using any js code like document.cookies or any code else)
    secure: true, // Access it only with https (in production)
    sameSite: "None", // This cookie can be stored  on any domain name (Main domain (website) and subdomain (page in website))
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  // Send Response
  res.status(201).json({
    email: foundUser.email,
    accessToken,
  });
};

exports.refresh = (req, res) => {
  const cookies = req.cookies; // req => headers (req here like the frontend who sends cookies)

  if (!cookies?.jwt) res.status(401).json({ message: "Unauthorized" });

  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECTRET,
    async (err, decoded) => {
      if (err) return res.status(403).json({ message: "Forbidden" });

      const foundUser = await User.findById(decoded.UserInfo.id).exec();

      if (!foundUser) return res.status(401).json({ message: "Unauthorized" });

      const accessToken = jwt.sign(
        {
          UserInfo: {
            id: foundUser._id,
          },
        },
        process.env.ACCESS_TOKEN_SECTRET,
        { expiresIn: 10 }
      );

      res.json({ accessToken });
    }
  );
};
