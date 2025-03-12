const BookModel = require("../model/book.model");

const getAllBooks = async (page, limit) => {
  return await BookModel.find()
    .skip((page - 1) * limit)
    .populate("tacGia")
    .populate("theLoai")
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

module.exports = { getAllBooks, getBookById, countTotalPage, getBookByQuery };
