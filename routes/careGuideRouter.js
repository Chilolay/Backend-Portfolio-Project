const express = require("express");
const careGuideRouter = express.Router();

careGuideRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res) => {
    res.end("Will send all the care guide to you");
  })
  .post((req, res) => {
    res.end(
      `Will add the care guide: ${req.body.name} with description: ${req.body.description}`
    );
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /careGuides");
  })
  .delete((req, res) => {
    res.end("Deleting all care guide");
  });

careGuideRouter
  .route("/:careGuideId")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res) => {
    res.end(
      `Will send details of the care guide: ${req.params.careGuideId} to you`
    );
  })
  .post((req, res) => {
    res.statusCode = 403;
    res.end(
      `POST operation not supported on /careGuides/${req.params.careGuideId}`
    );
  })
  .put((req, res) => {
    res.write(`Updating the care guide: ${req.params.careGuideId}\n`);
    res.end(`Will update the care guide: ${req.body.name}
        with description: ${req.body.description}`);
  })
  .delete((req, res) => {
    res.end(`Deleting care guide: ${req.params.careGuideId}`);
  });

module.exports = careGuideRouter;
