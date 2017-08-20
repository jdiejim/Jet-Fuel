const Folder = require('../models/Folder');

exports.index = (req, res, next) => {
  Folder.getFolders()
    .then(folders => res.status(200).json(folders))
    .catch(error => res.status(500).json({ error }));
}

exports.create = (req, res, next) => {
  if(!req.body['name']) {
    return res.status(422).send({ error: `You are missing name parameter` })
  }

  Folder.createFolder(req.body)
    .then(folder => res.status(201).json(folder[0]))
    .catch(error => res.status(500).json({ error }));
}

exports.delete = (req, res, next) => {
  if (!req.body.id) {
    return res.status(422).send({ error: `You are missing id parameter` })
  }

  Folder.deleteFolder(req.body.id)
    .then(folder => res.status(200).json(folder))
    .catch(error => res.status(500).json({ error }));
}
