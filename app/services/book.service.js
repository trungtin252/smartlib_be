const Author = require("../model/Author.model");
const BookModel = require("../model/book.model");

const getAllBooks = async (page, limit, query) => {
  return await BookModel.find(query)
    .skip((page - 1) * limit)
    .limit(parseInt(limit))
    .populate("tacGia")
    .populate("theLoai");
};

const getBookById = async (id) => {
  return await BookModel.findById(id);
};

const countTotalPage = async () => {
  return await BookModel.countDocuments();
};

module.exports = { getAllBooks, getBookById, countTotalPage };
