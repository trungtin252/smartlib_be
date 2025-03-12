const express = require("express");
const route = express.Router();

const CategoryService = require("../../services/category.service");

route.get("/", async (req, res, next) => {
  try {
    const categories = await CategoryService.getAllCatogory();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
});

module.exports = route;
