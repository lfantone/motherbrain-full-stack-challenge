'use strict';
const parseResponseFrom = require('../utils/parse-response-from');
const createSearchParamsFor = require('../utils/create-search-params-for');
const toFunding = require('../utils/to-funding');
const { applySpec, compose, map, prop } = require('ramda');

const searchParamsWith = createSearchParamsFor('funding');

const toFundings = compose(
  applySpec({
    fundings: compose(map(toFunding), prop('hits')),
    total: prop('total')
  }),
  parseResponseFrom
);

/**
 *  Retrieves all fundings from the dB.
 *
 * @param {import('@koa/router').RouterContext} ctx Koa application router context object
 */
async function retrieveAllFundingsHandler(ctx) {
  const {
    elasticsearch,
    request: { query }
  } = ctx;

  const response = await elasticsearch.search(searchParamsWith(query));
  ctx.response.body = toFundings(response);
}

module.exports = retrieveAllFundingsHandler;
