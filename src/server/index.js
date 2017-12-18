const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const compression = require('compression');

const app = express();

// Set PORT and HOST for the Web server
const APP_PORT = (process.env.NODE_ENV === 'test' ? process.env.TEST_APP_PORT : process.env.APP_PORT) || '3000';
const APP_HOST = process.env.APP_HOST || '0.0.0.0';

/*
  req.body Contains key-value pairs of data submitted in the request body.
  By default, it is undefined, and is populated when you use body-parsing middleware
  such as body-parser
*/
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

/*
  Gzip compressing can greatly decrease the size of the response body and hence increase the speed of a web app
 */
app.use(compression());

app.set('port', APP_PORT);
app.set('host', APP_HOST);

/*
  The app.locals object has properties that are local variables within the application.
  Once set, the value of app.locals properties persist throughout the life of the application,
  in contrast with res.locals properties that are valid only for the lifetime of the request.
*/
app.locals.title = process.env.APP_NAME || 'Bucephalus';
app.locals.version = process.env.APP_VERSION || '1.0.0';

/*
  To serve static files such as images, CSS files, and JavaScript files
*/
app.use(express.static(path.join(__dirname, '/../public')));

/*
  Binds and listens for connections on the specified host and port.
  This method is identical to Node’s http.Server.listen().
 */
app.listen(app.get('port'), app.get('host'), () => {
  console.log('info', `Server started at http://${app.get('host')}:${app.get('port')}`);
});

