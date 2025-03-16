const mongoose = require("mongoose");

const borrowSchema = mongoose.Schema({
  docGia: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please enter the name of this user"],
  },
  sach: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: [true, "Please enter the title of the book"],
  },
  // the day the user borrows the book
  ngayMuon: {
    type: Date,
    required: [true, "Please enter the borrow date"],
  },
  // the day the user is expected to return the book
  ngayDenHan: {
    type: Date,
    require: false,
  },
  // the day the user actually returns the book
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
});

const Borrow = mongoose.model("Borrow", borrowSchema, "muonsach");
module.exports = Borrow;
