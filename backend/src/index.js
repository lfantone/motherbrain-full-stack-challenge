'use strict';
const Koa = require('koa');
const Router = require('@koa/router');
const cors = require('@koa/cors');
const logger = require('koa-logger');
const helmet = require('koa-helmet');
const error = require('koa-json-error');

const elasticSearch = require('./middlewares/elastic-search');

const retriveAllOrganizationsHandler = require('./retrieve-all-organizations/retrieve-all-organizations.handler');
const retrieveAllFundingsHandler = require('./retrieve-all-fundings/retrieve-all-fundings.handler');

const { ES_URL, PORT } = process.env;

const app = new Koa();
const router = new Router();

// Declare routes
router.get('/organizations', retriveAllOrganizationsHandler);
router.get('/fundings', retrieveAllFundingsHandler);

// Apply middlewares to Koa app.
app
  .use(logger())
  .use(cors())
  .use(error())
  .use(helmet())
  .use(
    elasticSearch({
      node: ES_URL || 'http://user:kuS87k3whgGW@35.228.54.168/elasticsearch/',
      key: 'elasticsearch'
    })
  )
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(PORT || 8080);
