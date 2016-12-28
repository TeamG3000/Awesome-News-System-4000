'use strict';

const hashing = require('../utils/hashing');
const USERNAME_MIN_LENGTH = 3;
const USERNAME_MAX_LENGTH = 30;
const PASSWORD_MIN_LENGTH = 5;
const PASSWORD_MAX_LENGTH = 30;

module.exports = function (models) {
    let User = models.user;

    return {
        createNewUser(user) {
            if (user.username.length < USERNAME_MIN_LENGTH || user.username.length > USERNAME_MAX_LENGTH) {
                return Promise.reject({ reason: `Username must be between ${USERNAME_MIN_LENGTH} and ${USERNAME_MAX_LENGTH} characters long` });
            }

            if (user.password.length < PASSWORD_MIN_LENGTH || user.password.length > PASSWORD_MAX_LENGTH) {
                return Promise.reject({ reason: `Password must be between ${PASSWORD_MIN_LENGTH} and ${PASSWORD_MAX_LENGTH} characters long` });
            }

            const salt = hashing.generateSalt();
            const passHash = hashing.hashPassword(salt, user.password);

            const newUser = new User({
                username: user.username,
                email: user.email,
                passHash,
                salt,
                roles: user.roles || "user",
                favouriteArticles: user.favouriteArticles || [],
                selectedMedia: user.selectedMedia || [],
                settings: user.settings || []
            });

            return new Promise((resolve, reject) => {
                newUser.save(err => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(newUser);
                });
            });
        },
        getUserById(id) {
            return new Promise((resolve, reject) => {
                User.findOne({
                    _id: id
                }, (err, user) => {
                    if (err) {
                        return reject(err || null);
                    }

                    return resolve(user || null);
                });
            });
        },
        getUserByUsername(username) {
            return new Promise((resolve, reject) => {
                User.findOne({ username: username }, (err, user) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(user || null);
                });
            });
        },
        getAllUsers() {
            return new Promise((resolve, reject) => {
                User.find((err, users) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(users);
                });
            });
        },
        updateUserWithSelectedMedia(userId, selectedMedia) {
            return new Promise((resolve, reject) => {
                User.findOne({ _id: userId }, (err, dbUser) => {
                    if (err) {
                        return reject(err);
                    }

                    dbUser.selectedMedia = [];

                    selectedMedia.forEach(media => {
                        dbUser.selectedMedia.push({ name: media });
                    });

                    dbUser.save();
                });
                return resolve();
            });
        },
        updateUserSettings(userId, settings) {
            return new Promise((resolve, reject) => {
                User.findOneAndUpdate({ _id: userId }, {
                    $set: {
                        settings: settings
                    }
                }, (err, user) => {
                    if(err) {
                        return reject(err);
                    }

                    return resolve(user);
                })
            })
        }
    }
};