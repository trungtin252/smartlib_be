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

// const addBook = async () => {
//   return await BookModel.create;
// };

module.exports.createBorrow = async (req, res, next) => {
  try {
    const book = await bookService.getBookById(req.body.bookId);
    if (!book) {
      return res.status(400).json({ message: "Book not found" });
    }
    if (book.inLibrary <= 0) {
      return res.status(400).json({ message: "Book is not available" });
    }
    const currentDate = new Date();
    const futureDate = new Date(currentDate);
    futureDate.setDate(currentDate.getDate() + 14);
    const borrow = new Borrow({
      docGia: req.body.userId,
      sach: req.body.bookId,
      ngayMuon: currentDate,
      ngayDenHan: futureDate,
    });
    await borrow.save();
    book.soLuongTrongThuVien -= 1;
    await book.save();

    res.status(201).json(borrow);
  } catch (error) {
    next(error);
  }
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
};
