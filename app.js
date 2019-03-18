const express = require('express');
const app = express();
const port = 3000;
const settings = require('./settings');
const middlewares = require('./middlewares');
const bodyParser = require('body-parser')

const jsonParser = bodyParser.json();

const knex = require('knex')({
  client: 'mysql',
  connection: settings.database

});

app.locals.knex = knex;
const routes = require('./routes');

const router = express.Router();

router.get('/employees', routes.employees.AllEmployees);
router.get('/employees/:id', middlewares.getIDAsInt, routes.employees.SingleEmployees);
router.post('/employees', jsonParser ,routes.employees.CreateEmployees);

app.use('/api', router);

app.listen(settings.APIServerPort, () =>
  console.info(`Server listening on ${settings.APIServerPort}.`)
);
