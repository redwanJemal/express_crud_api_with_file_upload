module.exports = app => {
  const tutorials = require("../controllers/tutorial.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", tutorials.create);

  // Uploading Files
  router.post("/uploadFile", tutorials.uploadFile);

  // Retrieve all Tutorials
  router.get("/", tutorials.findAll);

  // Retrieve all published Tutorials
  router.get("/published", tutorials.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", tutorials.findOne);

  // Update a Tutorial with id
  router.put("/update/:id", tutorials.update);

  // Delete a Tutorial with id
  router.delete("delete/:id", tutorials.delete);

  // Create a new Tutorial
  router.delete("/delete_all", tutorials.deleteAll);

  app.use('/api/tutorials', router);
};
