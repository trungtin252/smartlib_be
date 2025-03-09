const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  tieuDe: {
    type: String,
    required: [true, "Vui lòng nhập tiêu đề của sách"],
  },
  tacGia: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
    required: [true, "Vui lòng nhập tác giả của sách"],
  },
  gia: {
    type: Number,
    required: [true, "Vui lòng nhập giá của sách"],
  },
  moTa: {
    type: String,
    required: false,
  },
  soLuongTrongThuVien: {
    type: Number,
    required: true,
  },
  hinhAnh: {
    type: String,
    required: true,
  },
  theLoai: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: false,
  },
  soTrang: {
    type: Number,
    required: true,
  },
  nhaXuatBan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Publisher",
    required: false,
  },
});

const Book = mongoose.model("Book", bookSchema, "sach");
module.exports = Book;
