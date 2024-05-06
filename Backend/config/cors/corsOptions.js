const allowedOrigins = require("./allowedOrigins");

// For testing in Postman only
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // To accept cookies sent with request
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;

// // For Production
// const corsOptions = {
//   origin: (origin, callback) => {
//     if (allowedOrigins.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true, // To accept cookies sent with request
//   optionsSuccessStatus: 200,
// };
