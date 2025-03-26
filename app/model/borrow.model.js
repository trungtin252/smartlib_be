const mongoose = require("mongoose");

const borrowSchema = mongoose.Schema({
  docGia: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  sach: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
  // the day the user borrows the book
  ngayMuon: {
    type: Date,
    required: true,
  },
  hanLaySach: {
    type: Date,
    require: true,
  },
  // the day the user is expected to return the book
  ngayDenHan: {
    type: Date,
    require: false,
  },
  ngayTra: {
    type: Date,
    required: false,
  },
  ngayLaySach: {
    type: Date,
    required: false,
  },
  // whether the user actually borrow the book or not
  trangThai: {
    type: String,
    required: true,
    default: "cho_duyet",
  },
  // notes about this borrow
  ghiChu: {
    type: String,
    required: false,
  },
  maYeuCau: {
    type: String,
    require: false,
  },
  maBiMat: {
    type: String,
    require: false,
  },
  maQR: {
    type: String,
    require: false,
  },
});

const Borrow = mongoose.model("Borrow", borrowSchema, "theodoimuonsach");
module.exports = Borrow;
