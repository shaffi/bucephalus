const express = require('express');
const path = require('path');

const app = express();

// Set PORT and HOST for the Web server
const APP_PORT = (process.env.NODE_ENV === 'test' ? process.env.TEST_APP_PORT : process.env.APP_PORT) || '3000';
const APP_HOST = process.env.APP_HOST || '0.0.0.0';

app.set('port', APP_PORT);
app.set('host', APP_HOST);

/*
  The app.locals object has properties that are local variables within the application.
  Once set, the value of app.locals properties persist throughout the life of the application,
  in contrast with res.locals properties that are valid only for the lifetime of the request.
*/

app.locals.title = process.env.APP_NAME || 'Bucephalus';
app.locals.version = process.env.APP_VERSION || '1.0.0';

// Everything in the public folder is served as static content
app.use(express.static(path.join(__dirname, '/../public')));

// routes
app.get('/', (req, res) => res.send('Hello Wolld!'))

/*
  Binds and listens for connections on the specified host and port.
  This method is identical to Node’s http.Server.listen().
 */
app.listen(app.get('port'), app.get('host'), () => {
  console.log('info', `Server started at http://${app.get('host')}:${app.get('port')}`);
});

