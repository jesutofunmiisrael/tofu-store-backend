const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    allowedFormats: ["jpg", "png", "jpeg"],
    folder: "product-images",
    transformation: [{ width: 400, height: 400 }],
  }),
});

const productImageUploader = multer({ storage });
module.exports = productImageUploader;
