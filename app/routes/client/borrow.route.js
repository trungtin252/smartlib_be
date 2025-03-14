const express = require("express");
const route = express.Router();

const BorrowController = require("../../controller/client/borrow.controller");

route.get("/", BorrowController.getBorrowAllOrbyUserId);

route.post("/add", BorrowController.createBorrow);

route.delete("/:id", BorrowController.deleteBorrow);

module.exports = route;
