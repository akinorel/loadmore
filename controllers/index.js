'use strict';

const express = require('express');
const router = express.Router();

const articlesService = require('./../services/articlesService');

router.get('/', (req, res, next) => {
    articlesService
        .getData()
        .then(articles => res.render('index', { articles: articles }))
        .catch(err => next(err));
});

module.exports = router;