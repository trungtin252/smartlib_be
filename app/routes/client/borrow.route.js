const express = require("express");
const route = express.Router();

const BorrowController = require("../../controller/client/borrow.controller");

route.get("/", BorrowController.getBorrowbyUserId);

route.post("/add", BorrowController.createBorrow);

module.exports = route;
