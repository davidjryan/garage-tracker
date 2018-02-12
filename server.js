const express = require('express');

const app = express();
const path = require('path');
const bodyParser = require('body-parser');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.locals.title = 'Garage Tracker';

app.get('/', (request, response) => {
  response.send('GARAGE!!!!!!');
});

app.get('/api/v1/garage', (request, response) => {
  database('garage').select()
    .then((items) => {
      response.status(200).json({ items, count: items.length });
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

app.listen(app.get('port'), () => {
  /* eslint-disable no-console */
  console.log(`${app.locals.title} is running on ${app.get('port')}. env: ${environment}`);
});

module.exports = app;