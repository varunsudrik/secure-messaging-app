const express = require("express");
const { loginUser, registerUser } = require("../controller/userController");
const userRoute = express.Router();
//import { StatusCodes } from "http-status-codes";

// Health check route

userRoute.post("/register", registerUser);
userRoute.post("/login", loginUser);

module.exports = userRoute;
