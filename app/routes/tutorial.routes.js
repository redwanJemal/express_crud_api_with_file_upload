module.exports = app => {
  const tutorials = require("../controllers/tutorial.controller.js");
  const photos = require("../controllers/photo.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/tutorials/", tutorials.create);

  // Create a new Photo
  router.post("/photos/add", photos.uploadPhoto);

  // Retrieve all Photos
  router.get("/photos/", photos.getAll);

  // Retrieve Photo By Id
  router.get("/photo/:id", photos.getById);

  // Like Photo By Id
  router.post("/photo/:id/like", photos.LikePhoto);

  // Uploading Files
  router.post("/tutorials/uploadFile", tutorials.uploadFile);

  // Retrieve all Tutorials
  router.get("/tutorials/", tutorials.findAll);

  // Retrieve all published Tutorials
  router.get("/tutorials/published", tutorials.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/tutorials/:id", tutorials.findOne);

  // Update a Tutorial with id
  router.put("/tutorials/:id", tutorials.update);

  // Delete a Tutorial with id
  router.delete("/tutorials/:id", tutorials.delete);

  // Create a new Tutorial
  router.delete("/tutorials/", tutorials.deleteAll);

  app.use('/api', router);
};
