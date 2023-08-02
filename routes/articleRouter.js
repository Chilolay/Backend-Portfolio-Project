const express = require("express");
const Article = require('../models/article')
const articleRouter = express.Router();
const authenticate = require('../authenticate')
const cors = require("./cors");

articleRouter
  .route("/")
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, (req, res, next) => {
    Article.find()
      .then((articles) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(articles);
      })
      .catch((err) => next(err));
  })
  .post(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      Article.create(req.body)
        .then((articles) => {
          console.log("Article created", articles);
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(articles);
        })
        .catch((err) => next(err));
    }
  )
  .put(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res) => {
      res.statusCode = 403;
      res.end("PUT operation not supported on /articles");
    }
  )
  .delete(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      Article.deleteMany()
        .then((response) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(response);
        })
        .catch((err) => next(err));
    }
  );

articleRouter
  .route("/:articleId")
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, (req, res, next) => {
    Article.findById(req.params.articleId)
      .then((article) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(article);
      })
      .catch((err) => next(err));
  })
  .post(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res) => {
      res.statusCode = 403;
      res.end(
        `POST operation not supported on /articles/${req.params.articleId}`
      );
    }
  )
  .put(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      Article.findByIdAndUpdate(
        req.params.articleId,
        {
          $set: req.body,
        },
        { new: true }
      )
        .then((article) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(article);
        })
        .catch((err) => next(err));
    }
  )
  .delete(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      Article.findByIdAndDelete(req.params.articleId)
        .then((response) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(response);
        })
        .catch((err) => next(err));
    }
  );

module.exports = articleRouter;
