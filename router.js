const express = require('express');
const router = express.Router(); // Sets chaiable routes
const foldersController = require('./controllers/foldersController'); // brings controller functions
const pathsController = require('./controllers/pathsController'); // brings controller functions

// api/v1 routes
// All endpoints reponses are handled by each of the specified controllers
router.get('/folders', foldersController.index); // Get endpoint for getting all folders
router.post('/folders', foldersController.create); // Post endpoint for creating a new folder
router.delete('/folders', foldersController.delete); // Delete enpoint for destroying a folder
router.get('/folders/:id/paths', pathsController.index); // Get endpoint for getting all paths for a specific folder
router.post('/folders/:id/paths', pathsController.create); // Post endpoint for creating new path for a specific foler

module.exports = router;

// Next files to check is controllers/foldersController.js
