const bookRoutes = require("./book.route");
const profileRoutes = require("./profile.route");
const BorrowRoutes = require("./borrow.route");
const CategoryRoutes = require("./category.route");
const LoginRoutes = require("./login.route");

module.exports = (app) => {
  app.use("/api/book", bookRoutes);
  app.use("/api/profile", profileRoutes);
  app.use("/api/borrow", BorrowRoutes);
  app.use("/api/category", CategoryRoutes);
  app.use("/api/login", LoginRoutes);
};
