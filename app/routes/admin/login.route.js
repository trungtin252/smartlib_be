const express = require("express");
const route = express.Router();

const LoginControler = require("../../controller/admin/login.controller");

route.post("/", LoginControler.login);

module.exports = route;
