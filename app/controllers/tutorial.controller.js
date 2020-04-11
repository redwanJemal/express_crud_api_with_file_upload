const db = require("../models");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Tutorial
  const tutorial = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };

  // Save Tutorial in the database
  try {
        const newTutorial = await Tutorial.create(tutorial);
        res.json(newTutorial);

  } catch (error) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving tutorials."
    });
  }
};

// Retrieve all Tutorials from the database.
exports.findAll = async (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  const page = +req.query.page?+req.query.page:1;
  const perPage = +req.query.perPage?+req.query.perPage:10;

  var limit = perPage;
  var offset = (page - 1) * perPage;

  try {
        const tutorials = await Tutorial.findAndCountAll({ limit,offset,where: condition });
        res.json(tutorials);

  } catch (error) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving tutorials."
    });
  }
};

// Find a single Tutorial with an id
exports.findOne = async (req, res) => {
  const id = req.params.id;
  try {
        const tutorial = await Tutorial.findByPk(id);
        res.json(tutorial);

  } catch (error) {
    res.status(500).send({
      message:
        err.message || "Error retrieving Tutorial with id=" + id
    });
  }
};

// Update a Tutorial by the id in the request
exports.update = async (req, res) => {
  const id = req.params.id;
  try {
    const tutorial = await Tutorial.update(req.body, {
        where: { id: id }
    });
    const updatedMessage = "Tutorial was updated successfully.";
    const notUpdatedMessage = `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`;
    
    res.json(tutorial == 1?updatedMessage:notUpdatedMessage);

  } catch (error) {
    res.status(500).send({
      message:
        err.message || "Error updating Tutorial with id=" + id
    });
  }

};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Tutorial.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tutorial was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Tutorial.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Tutorials were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};

// find all published Tutorial
exports.findAllPublished = (req, res) => {
  Tutorial.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

// Uploading a Single File
exports.uploadFile = (req,res) => {
  try {
    if(!req.files) {
        res.send({
            status: false,
            message: 'No file uploaded'
        });
    } else {
        //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
        let avatar = req.files.avatar;
        
        //Use the mv() method to place the file in upload directory (i.e. "uploads")
        avatar.mv('./uploads/' + avatar.name);

        //send response
        res.send({
            status: true,
            message: 'File is uploaded',
            data: {
                name: avatar.name,
                mimetype: avatar.mimetype,
                size: avatar.size
            }
        });
    }
  } catch (err) {
      res.status(500).send(err);
  }
};

exports.uploadMultiFile = (req,resp) =>{
  try {
    if(!req.files) {
        res.send({
            status: false,
            message: 'No file uploaded'
        });
    } else {
        let data = []; 

        //loop all files
        _.forEach(_.keysIn(req.files.photos), (key) => {
            let photo = req.files.photos[key];
            
            //move photo to uploads directory
            photo.mv('./uploads/' + photo.name);

            //push file details
            data.push({
                name: photo.name,
                mimetype: photo.mimetype,
                size: photo.size
            });
        });

        //return response
        res.send({
            status: true,
            message: 'Files are uploaded',
            data: data
        });
    }
  } catch (err) {
      res.status(500).send(err);
  }
}