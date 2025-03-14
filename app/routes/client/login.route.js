const express = require("express");
const route = express.Router();

const LoginControler = require("../../controller/login.controller");

route.post("/", LoginControler.login);

module.exports = route;
