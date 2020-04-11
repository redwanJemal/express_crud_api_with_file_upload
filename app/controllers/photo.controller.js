const db = require("../models");
const Photo = db.photos;
const Op = db.Sequelize.Op;


// Uploading a Photo
exports.uploadPhoto = async (req,res) => {
    try {
      if(!req.files) {
          res.send({
              status: false,
              message: 'No file uploaded'
          });
      } else {
          //Use the name of the input field (i.e. "picture") to retrieve the uploaded file
          let picture = req.files.picture;
          
          //Use the mv() method to place the file in upload directory (i.e. "uploads")
          picture.mv('./uploads/' + picture.name);
  
          // Create a Tutorial
          const newPhoto = {
             url:  picture.name,
             name: req.body.name,
             likes: 0
          };
          const photo = await Photo.create(newPhoto);

          //send response
          res.send({
              status: true,
              message: 'File is uploaded',
              photo
          });
      }
    } catch (err) {
        res.status(500).send(err);
    }
  };
  