const Category = require("../../model/category.model");
const AuthorService = require("../../services/author.service");
const bookService = require("../../services/book.service");

module.exports.index = async (req, res, next) => {
  const { page = 1, limit = 5 } = req.query;
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
    if (Object.keys(query).length === 0) {
      // Xử lý getAll
      books = await bookService.getAllBooks(page, limit);
    } else {
      // Xử lý getByQuery
      books = await bookService.getBookByQuery(limit, query);
    }

    const totalBooks = await bookService.countTotalPage();
    res.status(200).json({ books, totalPages: Math.ceil(totalBooks / limit) });
  } catch (error) {
    next(error);
  }
};
