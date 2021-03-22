const express = require('express');

const articleRouter = express.Router();

const {
  getArticles,
  createArticle,
  deleteArticle,
} = require('../controllers/article.js');

// returns information about the logged-in user (email and name)
articleRouter.get('/', getArticles);

articleRouter.post('/', createArticle);

articleRouter.delete('/:articleId', deleteArticle);

module.exports = articleRouter;
