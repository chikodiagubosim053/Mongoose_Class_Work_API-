const cloudinary = require('cloudinary').v2
require('dotenv').config();


cloudinary.config({
    cloud_name: process.env.cloudinary_CLOUDNAME,
    api_key: process.env.cloudinary_API_KEY,
    api_secret: process.env.cloudinary_API_SECRET
})

module.exports = cloudinary;