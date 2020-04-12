module.exports = app => {
    const photos = require("../controllers/photo.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Photo
    router.post("/photo/add", photos.uploadPhoto);
  
    // Retrieve all Photos
    router.get("/photos/", photos.getAll);
  
    // Retrieve Photo By Id
    router.get("/photo/:id", photos.getById);
  
    // Like Photo By Id
    router.post("/photo/:id/like", photos.LikePhoto);
  
    // Delete Photo
    router.post("/photo/:id/delete", photos.delete);
  
    app.use('/api', router);
  };
  