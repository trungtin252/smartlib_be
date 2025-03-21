const Book = require("../model/book.model");
const BookModel = require("../model/book.model");

const getAllBooks = async (page, limit, sortBy, sortOrder) => {
  return await BookModel.find()
    .sort({ [sortBy]: sortOrder })
    .skip((page - 1) * limit)
    .populate("tacGia")
    .populate("theLoai")
    .populate("nhaXuatBan")
    .limit(parseInt(limit));
};

const getBookById = async (id) => {
  return await BookModel.findById(id);
};

const getBookByQuery = async (limit, query) => {
  return await BookModel.find(query)
    .limit(parseInt(limit))
    .populate("tacGia")
    .populate("theLoai");
};

const countTotalPage = async () => {
  return await BookModel.countDocuments();
};

const createBook = async (payload) => {
  const book = new Book(payload);
  console.log(book);
};

const deleteBook = async (id) => {
  return await BookModel.findByIdAndDelete(id);
};

module.exports = {
  getAllBooks,
  getBookById,
  countTotalPage,
  getBookByQuery,
  deleteBook,
  createBook,
};
