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
  Article.find({ owner: req.user._id }) // find the article based on the user who id loggedIn
    .then((savedArticles) => {
      if (!savedArticles) {
        throw new Error(noSavedArticles);
      }
      res.send(savedArticles);
    })
    .catch(next);
};

// creates an article with the passed keyword, title, text, date, source, link, & image in the body
module.exports.createArticle = (req, res, next) =>
{
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;

  Article.findOne({ link, owner: req.user._id })
    .then((existingArticle) =>
    {
      if (existingArticle) {
        throw new BadRequestError('You have already saved this article.');
      }

      return Article.create({
        keyword,
        title,
        text,
        date,
        source,
        link,
        image,
        owner: req.user._id,
      })
    })
        .then((article) =>
        {
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
  module.exports.deleteArticle = (req, res, next) =>
  {
    const { articleId } = req.params;

    Article.findById(articleId)
      .then((article) =>
      {
        if (!article) {
          return next(NotFoundError(articleNotFound));
        }
        if (!req.user || !article.owner || req.user._id.toString() !== article.owner.toString()) {
          return next(new ForbiddenError(forbiddenDelete))
        }

        return Article.findByIdAndDelete(articleId)
          .then((deletedArticle) => res.send(deletedArticle));
      })
      .catch((err) =>
      {
        if (err.name === castErr) {
          return next(new BadRequestError(invalidData));
        }
        next(err);
      });
  }