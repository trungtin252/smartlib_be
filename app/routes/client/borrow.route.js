const express = require("express");
const route = express.Router();

const BorrowController = require("../../controller/client/borrow.controller");

route.get("/", BorrowController.getBorrowAllOrbyUserId);

route.post("/add", BorrowController.createBorrow);

route.post("/:id", BorrowController.cancleRequest);

module.exports = route;
