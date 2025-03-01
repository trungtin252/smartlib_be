const express = require("express");
const route = express.Router();

const BookController = require("../../controller/client/book.controller");

route.get("/", BookController.index);

module.exports = route;
