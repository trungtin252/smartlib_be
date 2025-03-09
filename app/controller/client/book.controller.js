const bookService = require("../../services/book.service");

module.exports.index = async (req, res, next) => {
  const { page = 1, limit = 5 } = req.query;
  const query = {};
  if (req.query.title) {
    query.title = { $regex: req.query.title, $options: "i" };
  }
  if (req.query.author) {
    query.author = req.query.author;
  }
  try {
    const books = await bookService.getAllBooks(
      parseInt(page),
      parseInt(limit),
      query
    );
    const totalBooks = await bookService.countTotalPage();
    res.status(200).json({ books, totalPages: Math.ceil(totalBooks / limit) });
  } catch (error) {
    next(error);
  }
};
