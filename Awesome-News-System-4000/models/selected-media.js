/* globals module require */

const mongoose = require("mongoose");

let selectedMediaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    }
});

mongoose.model("SelectedMedia", selectedMediaSchema);
module.exports = mongoose.model("SelectedMedia");