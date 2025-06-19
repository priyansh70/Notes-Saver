const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.startsWith("Bearer ") 
      ? authHeader.substring(7) 
      : req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token.",
    });
  }
};

module.exports = auth;
