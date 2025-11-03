const cloudinary = require("cloudinary").v2
const dotEnv = require("dotenv")
dotEnv.config()

cloudinary.config({
    api_key: "944375318598781",
    api_secret: "EkIUWyBIpXvgh9wr84AaELdCYEQ",
    cloud_name: "dqkcs5b91"
})

module.exports = cloudinary