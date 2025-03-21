const express = require("express");
const route = express.Router();

const AuthorService = require("../../services/author.service");

route.get("/", async (req, res, next) => {
  try {
    const authors = await AuthorService.getAll();
    res.status(200).json(authors);
  } catch (error) {
    next(error);
  }
});

module.exports = route;
