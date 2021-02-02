'use strict';
const parseResponseFrom = require('../utils/parse-response-from');
// const createSearchParamsFor = require('../utils/create-search-params-for');
const { compose, evolve, pathOr, prop, propOr } = require('ramda');
const parseOrganizationFrom = require('../utils/to-organization');

// const searchParamsWith = createSearchParamsFor('funding');

const toOrganization = compose(
  parseOrganizationFrom,
  ({ fundings, organization }) => ({ ...organization, fundings }),
  evolve({
    fundings: compose(propOr([], 'hits'), parseResponseFrom, prop('fundings')),
    organization: pathOr({}, ['body', '_source'])
  })
);

/**
 *  Retrieves all fundings from the dB.
 *
 * @param {import('@koa/router').RouterContext} ctx Koa application router context object
 */
async function retrieveAllFundingsHandler(ctx) {
  const {
    elasticsearch,
    params: { id }
  } = ctx;

  const [getResponse, searchResponse] = await Promise.all([
    elasticsearch.get({ index: 'org', id }),
    // NOTE: Disable because the company_uuid is not an indexed field so is not possible to search/filter.
    // elasticsearch.search(
    //   searchParamsWith({ size: null, query: { term: { company_uuid: { value: id } } } })
    // )
    Promise.resolve({ body: { hits: { hits: [] } } })
  ]);

  ctx.response.body = toOrganization({ organization: getResponse, fundings: searchResponse });
}

module.exports = retrieveAllFundingsHandler;
