const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const db = require('knex')(configuration);
const shortHash = require('short-hash');
const moment = require('moment');

exports.getPaths = (folder_id) => {
  return db('paths').orderBy('created_at', 'asc').where(folder_id).select();
}

exports.createPath = (body) => {
  const date = moment().format();
  const short = shortHash(body.path);
  const path = Object.assign(body, { date, short });

  return db('paths').insert(path, ['*']);
}

exports.getPath = (short) => {
  return db('paths').where(short).select('path');
}
