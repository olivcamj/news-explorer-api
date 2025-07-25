const express = require('express');

const articleRouter = express.Router();
const { celebrate, Joi } = require('celebrate');

const {
  getArticles,
  createArticle,
  deleteArticle,
} = require('../controllers/article.js');

const authHeaderSchema = Joi.object({
  authorization: Joi.string()
    .pattern(/^Bearer\s[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/)
    .required(),
}).options({ allowUnknown: true });

// returns information about the logged-in user (email and name)
articleRouter.get('/', celebrate({
  headers: authHeaderSchema,
}), getArticles);

articleRouter.post('/', celebrate({
  headers: authHeaderSchema,
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().uri(),
    image: Joi.string().required(),
  }),
}), createArticle);

articleRouter.delete('/:articleId', celebrate({
  headers: Joi.object().unknown(true),
  params: Joi.object().keys({
    articleId: Joi.string().hex().length(24).required(),
  }),
}), deleteArticle);

module.exports = articleRouter;
