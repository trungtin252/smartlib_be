const BorrowRoutes = require("./borrow.route");
const BookRoutes = require("./book.route");
const UserRoutes = require("./user.route");
const LoginRoutes = require("./login.route");
const StaffRouter = require("./staff.route");

module.exports = (app) => {
  app.use("/api/admin/borrow", BorrowRoutes);
  app.use("/api/admin/book", BookRoutes);
  app.use("/api/admin/user", UserRoutes);
  app.use("/api/admin/login", LoginRoutes);
  app.use("/api/admin/staff", StaffRouter);
};
