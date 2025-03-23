const { Expiredgetbook } = require("../../config/systemConfig");
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
    const currentDate = new Date();
    // Xử lý sách quá hạn lấy
    borrowInfo.forEach((borrow) => {
      if (borrow.hanLaySach) {
        if (new Date(borrow.hanLaySach) <= new Date(currentDate)) {
          handleExpiredGetBook(borrow._id);
        }
      }
    });
    res.status(200).json(borrowInfo);
  } catch (error) {
    next(error);
  }
};

const handleExpiredGetBook = async (id) => {
  const borrow = await BorrowService.getBorrowById(id.toString());
  borrow.trangThai = "tu_choi";
  borrow.ghiChu = "Quá hạn lấy sách";
  await borrow.save();
};

module.exports.chageStatus = async (req, res, next) => {
  try {
    const { id, newstatus, note, takenDay } = req.body;
    console.log(newstatus);
    if (newstatus == "da_tra") {
      const borrow = await BorrowService.getBorrowById(id);
      const bookId = borrow.sach.toString();
      const book = await bookService.getBookById(bookId);
      book.soLuongTrongThuVien += 1;
      borrow.trangThai = "hoan_thanh";
      await borrow.save();
      await book.save();
      res.status(200).json("Trả sách thành công !");
    }

    const borrow = await BorrowService.getBorrowById(id.toString());
    if (newstatus) {
      borrow.trangThai = newstatus;
      if (newstatus == "chap_nhan") {
        const currentDate = new Date();
        const futureDate = new Date(currentDate);
        futureDate.setTime(currentDate.getTime() + Expiredgetbook);
        borrow.hanLaySach = futureDate;
      }
      if (newstatus == "da_lay") {
        borrow.hanLaySach = "";
      }
    }
    if (note) {
      borrow.ghiChu = note;
    }
    if (takenDay) {
      borrow.ngayLaySach = takenDay;
    }
    await borrow.save();
    res.status(200).json(borrow);
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
