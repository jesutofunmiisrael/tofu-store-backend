const express = require("express");
const { signup, login, verificationUser, logout, forgetpassword, resetPassword } = require("../controllers/auth.controllers");
const isLoggedIn = require("../middleware/isLoggedin");
const auth = express.Router();
const verifytoken = require ("../middleware/verifyToken")

auth.post("/signup", signup);
auth.post("/login", login);
auth.post("/logout", isLoggedIn, logout);
auth.post("/verify/:token", verificationUser)
auth.post("/verifyToken", verifytoken);
auth.post("/forgetpassword", forgetpassword)
auth.post("/resetpassword", resetPassword)
// auth.post = ("./login", login)
  
module.exports = auth;
