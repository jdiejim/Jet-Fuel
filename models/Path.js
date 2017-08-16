const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const db = require('knex')(configuration);
const moment = require('moment');

exports.getPaths = (folder_id) => {
  return db('paths').where(folder_id).select();
}

exports.createPath = (body) => {
  const date = moment().format();
  const path = Object.assign(body, { date });

  return db('paths').insert(path, ['*']);
}

exports.getPath = (id) => {
  return db('paths').where(id).select('path');
}
