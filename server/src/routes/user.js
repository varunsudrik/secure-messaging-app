const express = require("express");
const {
  loginUser,
  registerUser,
  chatSection,
} = require("../controller/userController");
const userRoute = express.Router();
const { authCookie } = require("../middleware/auth");
//import { StatusCodes } from "http-status-codes";

// Health check route

userRoute.post("/register", registerUser);
userRoute.post("/login", loginUser);
userRoute.get(
  "/chat",
  // authCookie,
  chatSection
);

module.exports = userRoute;
