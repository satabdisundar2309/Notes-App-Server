const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

// create account
const createAccount = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({
        error: true,
        message: "Fill the form properly...",
      });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({
        error: true,
        message: "Password and Confirm password do not matchg",
      });
    }

    const isUser = await userModel.findOne({ email: email });
    if (isUser) {
      return res.status(400).json({
        error: true,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ user }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });

    res.status(200).json({
      error: false,
      message: "Account created successfully",
      token: token,
    });
  } catch (error) {
    console.log("Error in createAccount controller", error);
    return res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
};

// user login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        error: true,
        message: "Fill the form properly",
      });
    }

    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        error: true,
        message: "User not found",
      });
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
      return res.status(400).json({
        error: true,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign({ user }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });

    res.status(200).json({
      error: false,
      message: "Logged in successfully",
      token: token,
    });
  } catch (error) {
    console.log("Error in login controller", error);
    return res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
};

// get user data
const getUser = async (req, res) => {
  try {
    const { user } = req.user;
    const isUser = await userModel.findById({ _id: user._id });
    if (!isUser) {
      return res.status(400).json({
        error: true,
        message: "Not a user",
      });
    }
    res.status(200).json({
      error: false,
      message: "User details fetched",
      user: {
        name: isUser.name,
        email: isUser.email,
        _id: isUser._id,
        createdOn: isUser.createdOn
      },
    });
  } catch (error) {
    console.log("Error in getUser controller", error);
    return res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
};

module.exports = { createAccount, login, getUser };
