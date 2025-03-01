const BookModel = require("../model/book.model");

const getAllBooks = async () => {
  return await BookModel.find();
};

module.exports = { getAllBooks };
