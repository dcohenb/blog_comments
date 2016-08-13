'use strict';

const router = require('express').Router();
const Article = require('../models/Article');

router
    .get('/articles', (req, res, next) => {
        // Get article contents
        Article
            .find({}, 'title')
            .then(articles => {
                if (!articles) return next();
                res.json(articles)
            }, err => next(err))
    })
    .get('/article/:articleId', (req, res, next) => {
        // Get article contents
        Article
            .findOne({_id: req.params.articleId})
            .then(article => {
                if (!article) return next();
                res.json(article)
            }, err => next(err))
    });

module.exports = router;