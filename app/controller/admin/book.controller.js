const Book = require("../../model/book.model");
const Category = require("../../model/category.model");
const AuthorService = require("../../services/author.service");
const bookService = require("../../services/book.service");
const BorrowService = require("../../services/borrow.service");

require("dotenv").config();

const port = process.env.PORT;

module.exports.index = async (req, res, next) => {
  const { page = 1, limit = 5, sortBy = "maSach", sortOder = 1 } = req.query;
  const query = {};
  if (req.query.title) {
    query.tieuDe = { $regex: req.query.title, $options: "i" };
  }
  if (req.query.author) {
    const author = await AuthorService.getAuthorByName({
      $regex: req.query.author,
      $options: "i",
    });
    query.tacGia = author.id;
  }
  if (req.query.category) {
    query.theLoai = req.query.category;
  }

  try {
    let books = [];
    let totalBooks = 0;
    if (Object.keys(query).length === 0) {
      // Xử lý getAll
      books = await bookService.getAllBooks(page, limit, sortBy, sortOder);
      totalBooks = await bookService.countTotalPage();
    } else {
      // Xử lý getByQuery
      books = await bookService.getBookByQuery(limit, query);
      totalBooks = books.length;
    }
    res.status(200).json({ books, totalPages: Math.ceil(totalBooks / limit) });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteBook = async (req, res, next) => {
  try {
    const bookId = req.params.id;
    const borrowBook = await BorrowService.getBorrow({ sach: bookId });
    if (borrowBook.length == 0) {
      const result = await bookService.deleteBook(req.params.id);
      res.status(200).json(result);
    } else {
      res
        .status(400)
        .json("Không thể xóa do sách đang nằm trong danh sách yêu cầu");
    }
  } catch (error) {
    next(error);
  }
};

module.exports.getBookById = async (req, res, next) => {
  try {
    const bookId = req.params.id;
    if (bookId) {
      const result = await bookService.getBookById(bookId);
      res.status(200).json(result);
    }
  } catch (error) {
    next(error);
  }
};

module.exports.createBook = async (req, res, next) => {
  try {
    const book = new Book({ tieuDe: "Check" });
    console.log(book);
    // const currentDate = new Date();
    // const futureDate = new Date(currentDate);
    // futureDate.setDate(currentDate.getDate() + 14);
    // const borrow = new Borrow({
    //   docGia: req.body.userId,
    //   sach: req.body.bookId,
    //   ngayMuon: currentDate,
    //   ngayDenHan: futureDate,
    // });
    // await borrow.save();
    // book.soLuongTrongThuVien -= 1;
    // await book.save();

    // res.status(201).json(borrow);
  } catch (error) {
    next(error);
  }
};

exports.updateBook = async (req, res) => {
  console.log(req.file);
  try {
    const id = req.params.id;
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({ message: "Không tìm thấy sách" });
    }

    // Cập nhật dữ liệu sách
    let updatedData = { ...req.body };

    if (req.file) {
      updatedData.hinhAnh = `http://localhost:${port}/api/uploads/${req.file.filename}`;
    } else {
      updatedData.hinhAnh = book.hinhAnh; // Giữ ảnh cũ nếu không cập nhật mới
    }

    // Cập nhật sách trong DB
    const updatedBook = await Book.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
};

module.exports.getBookById = async (req, res, next) => {
  try {
    const bookId = req.params.id;
    if (bookId) {
      const result = await bookService.getBookById(bookId);
      res.status(200).json(result);
    }
  } catch (error) {
    next(error);
  }
};
