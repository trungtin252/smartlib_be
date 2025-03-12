const Borrow = require("../../model/borrow.model");
const bookService = require("../../services/book.service");
const BorrowService = require("../../services/borrow.service");

module.exports.getBorrowbyUserId = async (req, res, next) => {
  try {
    const query = {};
    query.user = req.query.userId;
    const borrowInfo = await BorrowService.getBorrow(query);
    res.status(200).json(borrowInfo);
  } catch (error) {
    next(error);
  }
};

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
      user: req.body.userId,
      book: req.body.bookId,
      borrowDate: currentDate,
      dueDate: futureDate,
      isReturned: false,
    });
    await borrow.save();
    book.soLuongTrongThuVien -= 1;
    await book.save();

    res.status(201).json(borrow);
  } catch (error) {
    next(error);
  }
};

module.exports.deleteBorrow = async (req, res, next) => {
  try {
    await BorrowService.deleteBorrow(req.params.id);
    res.status(200).json("Xóa thành công !");
  } catch (error) {
    next(error);
  }
};
