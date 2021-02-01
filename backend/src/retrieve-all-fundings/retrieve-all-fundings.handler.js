'use strict';
const parseResponseFrom = require('../utils/parse-response-from');
const createSearchParamsFor = require('../utils/create-search-params-for');

const searchParamsWith = createSearchParamsFor('funding');

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

  ctx.response.body = parseResponseFrom(response);
}

module.exports = retrieveAllFundingsHandler;
