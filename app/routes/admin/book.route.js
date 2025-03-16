const express = require("express");
const route = express.Router();

const BookController = require("../../controller/admin/book.controller");

route.get("/", BookController.index);

route.delete("/:id", BookController.deleteBook);

module.exports = route;
