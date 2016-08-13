'use strict';

const mongoose = require('./index').mongoose;

const ArticleScheme = mongoose.Schema({
    title: {type: String, required: true, trim: true},
    content: {type: String, required: true, trim: true}
}, {
    timestamps: true
});

module.exports = mongoose.model('Article', ArticleScheme);