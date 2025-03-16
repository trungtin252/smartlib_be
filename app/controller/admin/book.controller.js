const Category = require("../../model/category.model");
const AuthorService = require("../../services/author.service");
const bookService = require("../../services/book.service");
const BorrowService = require("../../services/borrow.service");

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
      res.status(200).json("Xóa thành công !");
    } else {
      res
        .status(400)
        .json("Không thể xóa do sách đang nằm trong danh sách yêu cầu");
    }
  } catch (error) {
    next(error);
  }
};
