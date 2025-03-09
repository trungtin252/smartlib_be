const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const UploadCloud = async (req, res, next) => {
  if (!req.file) {
    return next(); // Không có file thì tiếp tục middleware tiếp theo
  }

  try {
    const streamUpload = (req) => {
      return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream((error, result) => {
          if (error) {
            reject(error); // Bắt lỗi upload
          } else {
            resolve(result);
          }
        });

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    let result = await streamUpload(req);
    req.body[req.file.fieldname] = result.secure_url;
    next();
  } catch (error) {
    console.error("Lỗi upload Cloudinary:", error);
    res.status(500).json({ message: "Upload thất bại", error });
  }
};

module.exports.uploadCloud = UploadCloud;
