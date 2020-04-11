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

// Get All Uploaded Photos
exports.getAll = async (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  const page = +req.query.page?+req.query.page:1;
  const perPage = +req.query.perPage?+req.query.perPage:10;

  var limit = perPage;
  var offset = (page - 1) * perPage;

  try {
        const photos = await Photo.findAndCountAll({ limit,offset,where: condition });
        res.json({'count':photos.count,'items':photos.rows});

  } catch (error) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving tutorials."
    });
  }
};

// Get Photo By Id
exports.getById = async (req, res) => {
    const id = req.params.id;
    
    try {
        const photo = await Photo.findByPk(id);
        res.json(photo);

    } catch (error) {
        res.status(500).send({
        message:
            err.message || "Error retrieving Tutorial with id=" + id
        });
    }
};

// Like Photo
exports.LikePhoto = async (req, res) => {
    const id = req.params.id;
    try{
        const photo = await Photo.findByPk(id);

        const likes = photo.likes;
        const newLikes = likes + 1;
        
        const like = {
            likes: newLikes
        };
        const result = await Photo.update(like, {
            where: { id: id }
        });
        
        const photoUpdated = "Photo was updated successfully.";
        const photoNotUpdated = `Cannot update Photo with id=${id}. Maybe Photo was not found or req.body is empty!`;
        
        res.json(result == 1?photoUpdated:photoNotUpdated);

    }catch(err){
        res.status(500).send({
            message:
              err.message || "Error updating Tutorial with id=" + id
        });
    }
}
  