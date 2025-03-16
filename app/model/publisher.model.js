const mongoose = require("mongoose");

const publisherSchema = mongoose.Schema({
  maNXB: {
    type: String,
    unique: true,
  },
  ten: {
    type: String,
    required: [true, "Vui lòng nhập địa chỉ"],
  },
  diaChi: {
    type: String,
    required: false,
  },
});

const Publisher = mongoose.model("Publisher", publisherSchema, "nhaxuatban");
module.exports = Publisher;
