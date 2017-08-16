const express = require('express');
const router = express.Router();
const foldersController = require('./controllers/foldersController');
const pathsController = require('./controllers/pathsController');

router.get('/folders', foldersController.index);
router.post('/folders', foldersController.create);
router.get('/folders/:id/paths', pathsController.index);
router.post('/folders/:id/paths', pathsController.create);

module.exports = router;
