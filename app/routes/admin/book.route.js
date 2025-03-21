const express = require("express");
const route = express.Router();

const BookController = require("../../controller/admin/book.controller");
const upload = require("../../helpers/storeMuler");

route.get("/", BookController.index);

route.delete("/:id", BookController.deleteBook);

route.get("/:id", BookController.getBookById);

route.post("", upload.single("hinhAnh"), BookController.createBook);

route.put("/:id", upload.single("hinhAnh"), BookController.updateBook);

module.exports = route;
