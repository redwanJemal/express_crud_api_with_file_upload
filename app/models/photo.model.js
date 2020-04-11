  module.exports = (sequelize, Sequelize) => {
    const Photo = sequelize.define("photo", {
      url: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      likes: {
        type: Sequelize.INTEGER
      }
    });
  
    return Photo;
  };