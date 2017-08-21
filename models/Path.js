const environment = process.env.NODE_ENV || 'development'; // sets the environment for the database
const configuration = require('../knexfile')[environment]; // configures the database based on the environment
const db = require('knex')(configuration); // sets dabase with configuration
const shortHash = require('short-hash'); // npm package that returns a short hash for the url
const moment = require('moment'); // library that helps handling time

// Gets all paths from a specific folder
exports.getPaths = (folder_id) => {
  return db('paths').orderBy('created_at', 'asc').where(folder_id).select();
}

// creates a new path entry in the database with the body passed from the controller
exports.createPath = (body) => {
  const date = moment().format();
  const short = shortHash(body.path); // gets a short hash of the url
  const path = Object.assign(body, { date, short });

  return db('paths').insert(path, ['*']);
}

// returns a long path by searching for the short path entry
exports.getPath = (short) => {
  return db('paths').where(short).select('path');
}
