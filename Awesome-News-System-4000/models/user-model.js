/* globals module require */

const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 30
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    passHash: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    roles: {
        type: [String],
        default: ['user']
    },
    favouriteArticles: [{
        source: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        imageUrl: {
            type: String
        },
        publishedAt: {
            type: String
        },
        originalId: {
            type: String
        }
    }],
    selectedMedia: [{
        name: {
            type: String,
            required: true
        }
    }],
    settings: [{
        theme: {
            type: String
        }
    }]
});

mongoose.model("User", userSchema);
module.exports = mongoose.model("User");