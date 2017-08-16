const Path = require('../models/Path');

exports.index = (req, res, next) => {
  Path.getPaths({ folder_id: req.params.id })
    .then(paths => res.status(200).json(paths))
    .catch(error => res.status(500).json({ error }));
}

exports.create = (req, res, next) => {
  const folder_id = req.params.id;
  const body = Object.assign(req.body, { folder_id });

  Path.createPath(body)
    .then(path => res.status(201).json(path[0]))
    .catch(error => res.status(500).json({ error }));
}

exports.redirectPath = (req, res, next) => {
  Path.getPath({ id: req.params.id })
    .then(data => res.redirect(301, data[0].path))
    .catch(error => res.status(500).json({ error }));
}
