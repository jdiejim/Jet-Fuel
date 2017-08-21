const environment = process.env.NODE_ENV || 'development'; // sets the environment for the database
const configuration = require('../knexfile')[environment]; // configures the database based on the environment
const db = require('knex')(configuration); // sets dabase with configuration

// this function returns all folders from the database
exports.getFolders = () => {
  return db('folders').orderBy('created_at', 'asc').select();
}

// this function creates a new folder in the database with the parameters passed in the controller
exports.createFolder = (folder) => {
  return db('folders').insert(folder, ['id', 'name']);
}

// this function destroys a folder in the database with the parameters passed in the controller
exports.deleteFolder = (id) => {
  return db('paths').where({ folder_id: id }).del()
    .then(() => db('folders').where({ id }).del())
}
