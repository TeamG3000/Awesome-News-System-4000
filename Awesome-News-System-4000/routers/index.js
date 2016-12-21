/* globals module require __dirname */

module.exports = function(app, data) {
    const fs = require("fs");
    const path = require("path");

    fs.readdirSync("./routers")
        .filter(x => x.includes("-router"))
        .forEach(file => {
            require(path.join(__dirname, file))(app, data);
        });
};