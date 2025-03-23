const { generateId } = require("../../helpers/generateId");
const Borrow = require("../../model/borrow.model");
const bookService = require("../../services/book.service");
const BorrowService = require("../../services/borrow.service");
const QRCode = require("qrcode");
const fs = require("fs");
const path = require("path");
const { generateSecretCode } = require("../../helpers/generateSecretCode");

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
    if (book.soLuongTrongThuVien <= 0) {
      return res.status(400).json({ message: "Book is not available" });
    }

    const requestId = generateId("MUON_");
    const secretCode = generateSecretCode();

    const currentDate = new Date();
    const borrow = new Borrow({
      maYeuCau: requestId,
      docGia: req.body.userId,
      sach: req.body.bookId,
      ngayMuon: currentDate,
      maBiMat: secretCode,
    });

    // Tạo thư mục lưu ảnh QR nếu chưa tồn tại
    const qrFolder = path.join(__dirname, "../../public/uploads/qrCode");
    if (!fs.existsSync(qrFolder)) {
      fs.mkdirSync(qrFolder, { recursive: true });
    }

    const qrPath = path.join(qrFolder, `${requestId}.png`);

    // Nội dung mã QR
    const qrContent = JSON.stringify({
      borrowId: borrow._id, // _id sẽ có sau khi borrow được lưu
      userId: borrow.docGia,
      secretCode: secretCode,
    });

    // Lưu borrow vào database trước để lấy _id
    await borrow.save();

    // Tạo mã QR và lưu vào file ảnh
    await QRCode.toFile(qrPath, qrContent);

    // Cập nhật đường dẫn ảnh QR vào borrow và lưu lại
    borrow.maQR = `http://localhost:3000/api/uploads/qrCode/${requestId}.png`;
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
    const borrow = await BorrowService.getBorrowById(req.params.id);
    const bookId = borrow.sach.toString();
    const book = await bookService.getBookById(bookId);
    book.soLuongTrongThuVien += 1;
    borrow.trangThai = "hoan_thanh";
    await borrow.save();
    await book.save();
    res.status(200).json("Xóa thành công !");
  } catch (error) {
    next(error);
  }
};
