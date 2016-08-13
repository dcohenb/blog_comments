'use strict';

const md5 = require('md5');
const router = require('express').Router();
const Comment = require('../models/Comment');

router
    .get('/article/:articleId/comments', (req, res, next) => {
        // Pagination
        let filter = (req.query.filter || '').trim();
        let start = parseInt(req.query.start || 0);
        let limit = parseInt(req.query.limit || 5);
        if (limit > 100) limit = 100;

        let query = {article_id: req.params.articleId};
        if(filter) {
            query.comment = new RegExp(filter, 'i');
        }

        // Get the total number of comments
        Comment
            .find(query)
            .count()
            .then(total_comments => {
                Comment
                    .find(query, 'email comment createdAt')
                    .sort({createdAt: 'desc'})
                    .skip(start)
                    .limit(limit)
                    .lean()
                    .then(comments => {
                        if (!comments) return next();

                        comments.forEach(comment => comment.email_hash = md5(comment.email));

                        let next = `/article/${req.params.articleId}/comments?start=${start + limit}&limit=${limit}&filter=${filter}`;
                        if (start + limit >= total_comments) next = null;

                        res.json({
                            next: next,
                            comments: comments
                        });
                    }, err => next(err))
            }, err => next(err))
    })
    .post('/article/:articleId/comments', (req, res, next) => {
        // Post a new comment for article
        new Comment({
            article_id: req.params.articleId,
            email: req.body.email,
            comment: req.body.comment
        })
            .save()
            .then(comment => {
                if (!comment) return next();
                comment = comment.toObject();
                comment.email_hash = md5(comment.email);
                res.json(comment);
            }, err => next(err));
    })
    .get('/article/:articleId/comment/:commentId', (req, res, next) => {
        // Get a specific comment
        Comment
            .findOne({_id: req.params.commentId}, 'email comment createdAt')
            .lean()
            .then(comment => {
                if (!comment) return next();
                comment.email_hash = md5(comment.email);
                res.json(comment);
            }, err => next(err))
    });

module.exports = router;