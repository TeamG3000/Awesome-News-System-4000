'use strict';

const passport = require('passport');

module.exports = function (app, data) {
    const localStrategy = require("./local-strategy")(passport, data);
    const jwtStrategy = require('./jwt-strategy')(passport, data);

    passport.serializeUser((user, done) => {
        if (user) {
            done(null, user.id);
        }
    });

    passport.deserializeUser((userId, done) => {
        data
            .getUserById(userId)
            .then(user => done(null, user || false))
            .catch(error => done(error, false));
    });

    app.use(passport.initialize());
    app.use(passport.session());
};
