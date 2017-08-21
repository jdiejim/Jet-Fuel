const path = require('path'); // This helps us get the abosolute path of our root directory
const express = require('express'); // Framework that abstracts http network requests in node
const bodyParser = require('body-parser'); // Middleware that parses requests
const router = require('./router'); // Middleware that connects the /ap1/v1 paths and methods
const pathsController = require('./controllers/pathsController'); // Controller that handles paths responses

// this sets up and creates the express app that we are going to use for our http network requests
const app = express();


// Set title of app in locals variabele
app.locals.title = 'Jet Fuel';

// Set port to be the process.env.PORT (for different environments (production for heroku))
// If no port is especified then default to 3000
app.set('port', process.env.PORT || 3000);

// Middleware that parses our requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Sets route for sering static files (css, html, js, images)
app.use(express.static(path.resolve(__dirname, './build')));

// Set chainable route handlers for api/v1 path using app.route()
app.use('/api/v1', router);

// Sets callback for redirection when path is called
app.get('/:id', pathsController.redirectPath);

app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '/build', 'index.html')));

// Run app on previously established port
app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}`);
});

module.exports = app;


// Next file to check is router.js for chainable routes
