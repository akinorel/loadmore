'use strict';

const express = require('express');
const router = express.Router();

const articlesService = require('./../services/articlesService');

router.get('/', (req, res, next) => {
    articlesService
        .getData()
        .then(articles => res.send({ articles: articles }))
        .catch(err => next(err));
});

router.get('/card', function (req, res) {
    res.render('partials/_article-card.ejs', {
        article: req.query.article
    });
});

module.exports = router;