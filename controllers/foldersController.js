const Folder = require('../models/Folder');

exports.index = (req, res, next) => {
  Folder.getFolders()
    .then(folders => res.status(200).json(folders))
    .catch(error => res.status(500).json({ error }));
}

exports.create = (req, res, next) => {
  Folder.createFolder(req.body)
    .then(folder => res.status(201).json(folder[0]))
    .catch(error => res.status(500).json({ error }));
}
