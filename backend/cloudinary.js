const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET_KEY,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Wearmart",
    allowed_formats: ["jpg", "png", "jpeg","WEBP"],
  },
});

module.exports = { cloudinary, storage };
