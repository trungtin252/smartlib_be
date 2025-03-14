const Borrow = require("../../model/borrow.model");
const bookService = require("../../services/book.service");
const BorrowService = require("../../services/borrow.service");

module.exports.getBorrowAllOrbyUserId = async (req, res, next) => {
  try {
    const query = {};
    if (req.query.userId) {
      query.docGia = req.query.userId;
    }
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
      docGia: req.body.userId,
      sach: req.body.bookId,
      ngayMuon: currentDate,
      ngayDenHan: futureDate,
      daTra: false,
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
    const result = await BorrowService.deleteBorrow(req.params.id);
    const bookId = result.sach.toString();
    const book = await bookService.getBookById(bookId);
    book.soLuongTrongThuVien += 1;
    await book.save();
    res.status(200).json("Xóa thành công !");
  } catch (error) {
    next(error);
  }
};
