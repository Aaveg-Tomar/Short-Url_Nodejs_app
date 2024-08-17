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
    // The Object Id is created in the url database of the users
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users',
    }
},

    { timestamp: true }
);

const URL = mongoose.model("url", UrlSchema);

module.exports = URL;