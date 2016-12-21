/* globals module require */
"use strict";

const cluster = require("cluster");
const config = require("./config/app");
const app = require("./config/app/application");

if (cluster.isMaster) {
    cluster.fork();

    cluster.on("exit", () => {
        cluster.fork();
    });

    const apiConfig = require("./config/api");
    const requester = require("./utils/requester/requester")(apiConfig, config);

    requester.requestArticles();
    setInterval(requester.requestArticles, 1000 * 10 * 1);
} else {
    app.listen(config.port, () =>
        console.log(`Server running at port: ${config.port}`)
    );
}