const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const db = require('knex')(configuration);

exports.getFolders = () => {
  return db('folders').select();
}

exports.createFolder = (folder) => {
  return db('folders').insert(folder, ['id', 'name']);
}
