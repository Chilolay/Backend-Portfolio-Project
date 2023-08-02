const express = require("express");
const CareGuide = require('../models/careGuide');
const careGuideRouter = express.Router();
const authenticate = require('../authenticate')
const cors = require("./cors");

careGuideRouter
  .route("/")
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, (req, res, next) => {
    CareGuide.find()
      .then((careGuides) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(careGuides);
      })
      .catch((err) => next(err));
  })
  .post(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      CareGuide.create(req.body)
        .then((careGuide) => {
          console.log("Care Guide created", careGuide);
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(careGuide);
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
      res.end("PUT operation not supported on /careGuides");
    }
  )
  .delete(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      CareGuide.deleteMany()
        .then((response) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(response);
        })
        .catch((err) => next(err));
    }
  );

careGuideRouter
  .route("/:careGuideId")
  .options(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res) => res.sendStatus(200)
  )
  .get(cors.cors, (req, res, next) => {
    CareGuide.findById(req.params.careGuideId)
      .then((careGuide) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(careGuide);
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
        `POST operation not supported on /careGuides/${req.params.careGuideId}`
      );
    }
  )
  .put(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      CareGuide.findByIdAndUpdate(
        req.params.careGuideId,
        {
          $set: req.body,
        },
        { new: true }
      )
        .then((careGuide) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(careGuide);
        })
        .catch((err) => next(err));
    }
  )
  .delete(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      CareGuide.findByIdAndDelete(req.params.careGuideId)
        .then((response) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(response);
        })
        .catch((err) => next(err));
    }
  );

module.exports = careGuideRouter;
