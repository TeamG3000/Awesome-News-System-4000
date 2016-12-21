/* globals require module */

const config = require("./index");

const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const data = require("../../data/index")(config);

let app = express();

app.set("view engine", "pug");
app.use("/static", express.static("public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: "Awesome",
    resave: true,
    saveUninitialized: true
}));

require("../passport")(app, data);
require("../../routers")(app, data);

module.exports = app;