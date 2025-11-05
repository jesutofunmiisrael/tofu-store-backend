const cloudinary = require("cloudinary").v2
const dotEnv = require("dotenv")
dotEnv.config()

cloudinary.config({
 api_key:  process.env.cloud_name,
 api_secret: process.env.cloudinary_api_key ,
 cloud_name:  process.env.cloudinary_api_secret
})

module.exports = cloudinary