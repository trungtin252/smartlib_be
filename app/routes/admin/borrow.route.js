const express = require("express");
const route = express.Router();

const BorrowController = require("../../controller/admin/borrow.controller");

route.get("/", BorrowController.getBorrowAllOrbyUserId);

route.post("/changestatus", BorrowController.chageStatus);

route.delete("/:id", BorrowController.deleteBorrow);

module.exports = route;
