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

module.exports.chageStatus = async (req, res, next) => {
  try {
    const { id, newstatus, note, takenDay } = req.body;
    if (newstatus == "da_tra") {
      await BorrowService.deleteBorrow(id);
      res.status(200).json({ masseg: "Đã trả sách thành công" });
      return;
    }
    const borrow = await BorrowService.getBorrowById(id.toString());
    if (newstatus) {
      borrow.trangThai = newstatus;
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
