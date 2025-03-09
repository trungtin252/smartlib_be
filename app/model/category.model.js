const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  ten: {
    type: String,
    unique: true,
    required: [true, "Vui lòng nhập tên thể loại sách"],
  },
  moTa: {
    type: String,
    required: false,
  },
});

const Category = mongoose.model("Category", categorySchema, "danhmuc");
module.exports = Category;
