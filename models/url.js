const mongoose = require('mongoose');

const UrlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        require: true,
        unique: true,
    },
    redirectURL: {
        type: String,
        require: true,
    },

    visitHistory: [{ timestamp: { type: Number } }],
},

    { timestamp: true }
);

const URL = mongoose.model("url", UrlSchema);

module.exports = URL;