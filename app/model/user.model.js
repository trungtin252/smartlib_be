const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  maDocGia: {
    type: String,
    unique: true,
  },
  ten: {
    type: String,
    required: [true, "Vui lòng nhập tên"],
  },
  hoTenDem: {
    type: String,
    required: [true, "Vui lòng nhập họ tên đệm"],
  },
  ngaySinh: {
    type: Date,
    required: false,
  },
  diaChi: {
    type: String,
    required: false,
  },
  soDienThoai: {
    type: String,
    required: true,
    unique: true,
  },
  matKhau: {
    type: String,
    required: [true, "Vui lòng nhập mật khẩu"],
  },
  anhDaiDien: {
    type: String,
    required: true,
  },
  vaiTro: {
    type: String,
    require: true,
  },
});

const User = mongoose.model("User", userSchema, "docgia");
module.exports = User;
