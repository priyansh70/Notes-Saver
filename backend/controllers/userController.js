const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signup = async (req, res) => {
  try {
    // Accept user details (e.g., username, email, password) from the request body.
    const { name, email, password } = req.body;

    // Check Fields
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All Fields are Required" });
    }

    // Validate Password
    if (password < 8) {
      return res
        .status(422)
        .json({ error: "Password should be at least 8 characters long" });
    }

    // Check User Already Registered
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Password Hashed
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save the new user to the database.
    const savedUser = await user.save();

    return res.status(201).json({
      message: "User Created Successfully",
      user: savedUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      sucess: false,
    });
  }
};

exports.login = async (req, res) => {
  try {
    // Accept login credentials (email and password) from the request body.
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "All Fields are Required" });
    }

    //   Verify if the email exists in the database.
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User does not exist",
      });
    }
    // Use bcrypt to compare the hashed password in the database with the provided password.
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    // If the credentials are valid:
    if (isPasswordMatch) {
      // Generate a JWT token with a payload containing user details (e.g., user ID).
      const payload = {
        userId: user._id,
        name: user.name,
        email: user.email,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1d", // Token expires in 1 day
      });

      const options = {
        expiresIn: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      // Set the JWT token as a cookie in the response.
      return res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "Logged In Successfully",
      });
    } else {
      return res.status(401).json({ message: "Invalid Password" });
    }
    // Send the token back to the client.
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      sucess: false,
    });
  }
};

exports.authStatus = (req, res) => {
  console.log("Inside Auth Status");
  console.log("REq:: ", req);
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ isAuthenticated: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).json({ isAuthenticated: true, user: decoded });
  } catch (error) {
    return res.status(403).json({ isAuthenticated: false });
  }
};
