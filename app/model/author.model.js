const mongoose = require("mongoose");

const authorSchema = mongoose.Schema({
  ten: {
    type: String,
    required: [true, "Vui lòng nhập tên"],
  },
  quocTich: {
    type: String,
    required: false,
  },
  ngaySinh: {
    type: Date,
    required: false,
  },
  gioiTinh: {
    type: Boolean, // Male: true, female: false
    required: false,
  },
});

const Author = mongoose.model("Author", authorSchema, "tacgia");
module.exports = Author;
