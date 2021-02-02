'use strict';
const parseResponseFrom = require('../utils/parse-response-from');
const createSearchParamsFor = require('../utils/create-search-params-for');
const { applySpec, compose, map, prop } = require('ramda');
const toOrganization = require('../utils/to-organization');

const searchParamsWith = createSearchParamsFor('org');

const toOrganizations = compose(
  applySpec({
    organizations: compose(map(toOrganization), prop('hits')),
    total: prop('total')
  }),
  parseResponseFrom
);

/**
 *  Retrieves all organizations from the dB.
 *
 * @param {import('@koa/router').RouterContext} ctx Koa application router context object
 */
async function retrieveAllOrganizationsHandler(ctx) {
  const {
    elasticsearch,
    request: { query }
  } = ctx;

  const response = await elasticsearch.search(searchParamsWith(query));

  ctx.response.body = toOrganizations(response);
}

module.exports = retrieveAllOrganizationsHandler;
