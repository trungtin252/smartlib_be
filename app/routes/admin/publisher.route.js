const express = require("express");
const route = express.Router();

const PushlishService = require("../../services/pushlish.service");

route.get("/", async (req, res, next) => {
  try {
    const pushlishers = await PushlishService.getPushlisher();
    res.status(200).json(pushlishers);
  } catch (error) {
    next(error);
  }
});

module.exports = route;
