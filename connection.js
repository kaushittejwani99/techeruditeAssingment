const { Sequelize } = require('sequelize');

// Create Sequelize connection
const sequelize = new Sequelize('user-registration', 'root', 'Password@123', {
  host: 'localhost',
  dialect: 'mysql',
});

sequelize.authenticate()
  .then(() => console.log('Successfully connected to the database'))
  .catch((error) => console.error('Unable to connect to the database:', error));

module.exports = sequelize;
