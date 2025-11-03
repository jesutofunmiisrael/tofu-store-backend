const express = require("express");

const { getblog } = require("../controllers/blogcontrollers");

const blog = express.Router();

blog.get("/getblog", getblog);

module.exports = blog
