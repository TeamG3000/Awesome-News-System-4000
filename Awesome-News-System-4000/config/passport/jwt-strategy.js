const passportJWT = require("passport-jwt");    
const config = require("./config.js");  
const ExtractJwt = passportJWT.ExtractJwt;  
const JwtStrategy = passportJWT.Strategy;  
const params = {  
    secretOrKey: config.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeader()
};

// const hashing = require("../../utils/hashing");

// function comparePassword(requestPassword, user) {
//     return hashing.hashPassword(user.salt, requestPassword) === user.passHash;
// }

module.exports = function(passport, data) {  
    const strategy = new JwtStrategy(params, function(payload, done) {
        var user = users[payload.id] || null;
        if (user) {
            return done(null, {
                id: user.id
            });
        } else {
            return done(new Error("User not found"), null);
        }
    });
    passport.use(strategy);
    return {
        initialize: function() {
            return passport.initialize();
        },
        authenticate: function() {
            return passport.authenticate("jwt", config.jwtSession);
        }
    };
};