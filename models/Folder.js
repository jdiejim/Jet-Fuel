const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const db = require('knex')(configuration);

exports.getFolders = () => {
  return db('folders').orderBy('created_at', 'asc').select();
}

exports.createFolder = (folder) => {
  return db('folders').insert(folder, ['id', 'name']);
}

exports.deleteFolder = (id) => {
  return db('paths').where({ folder_id: id }).del()
    .then(() => db('folders').where({ id }).del())
}
