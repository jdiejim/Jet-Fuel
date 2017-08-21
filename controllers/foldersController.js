const Folder = require('../models/Folder'); // Import the Folders model

// function for handling responses for getting all folders
exports.index = (req, res, next) => {
  // Folder.getFolders returns a promise that resolves in status 200 and all the folders if there is no error
  Folder.getFolders()
    .then(folders => res.status(200).json(folders))
    .catch(error => res.status(500).json({ error }));
}

// function for handling responses for posting new folders
exports.create = (req, res, next) => {

  // this block checks for missing data from requests
  // if it passes then it returns an error with the following message
  if(!req.body['name']) {
    return res.status(422).send({ error: `You are missing name parameter` })
  }

 // this blocks handles the creating of a new folder in the database
  Folder.createFolder(req.body)
    .then(folder => res.status(201).json(folder[0]))
    .catch(error => res.status(500).json({ error }));
}

exports.delete = (req, res, next) => {
  // this block checks for missing data from requests
  // if it passes then it returns an error with the following message
  if (!req.body.id) {
    return res.status(422).send({ error: `You are missing id parameter` })
  }

 // this blocks handles the destruction of a specific folder in the database
  Folder.deleteFolder(req.body.id)
    .then(folder => res.status(200).json(folder))
    .catch(error => res.status(500).json({ error }));
}

// Next file to check is models/Folder.js
