'use strict';

const mongoose = require('./index').mongoose;
const ObjectId = mongoose.Schema.ObjectId;

const CommentScheme = mongoose.Schema({
    email: {type: String, required: true, trim: true},
    comment: {type: String, required: true, trim: true},
    article_id: {type: ObjectId, required: true, ref: 'ArticleSchema'}
}, {
    timestamps: true
});

module.exports = mongoose.model('Comment', CommentScheme);