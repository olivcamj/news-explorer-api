const Article = require('../models/article.js');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');
const BadRequestError = require('../errors/bad-request-err');
const {
  noSavedArticles,
  fieldsRequired,
  articleNotFound,
  invalidData,
  forbiddenDelete,
  castErr,
} = require('../utils/constants');

// find all articles saved by a user
module.exports.getArticles = (req, res, next) => {
  Article.find({}) // find the article based on the user who id loggedIn
    .then((savedArticles) => {
      if (!savedArticles) {
        throw new Error(noSavedArticles);
      }
      res.send(savedArticles);
    })
    .catch(next);
};

// creates an article with the passed keyword, title, text, date, source, link, & image in the body
module.exports.createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;

  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: req.user._id,
  })
    .then((article) => {
      // one of the required fields are missing throw an error
      if (!article) {
        throw new BadRequestError(fieldsRequired);
      }
      res.send(article);
    })
    .catch(next);
};

// deletes the stored article by _id
// DELETE /articles/articleId
module.exports.deleteArticle = (req, res, next) => {
  Article.findByIdAndRemove(req.params.articleId)
    .then((article) => {
      if (!article) {
        throw new NotFoundError(articleNotFound);
      } else if (req.user._id.toString() === article.owner.toString()) {
        res.send(article);
      } else {
        throw new ForbiddenError(forbiddenDelete);
      }
    })
    .catch((err) => {
      if (err.name === castErr) {
        throw new BadRequestError(invalidData);
      }
      next(err);
    })
    .catch(next);
};
