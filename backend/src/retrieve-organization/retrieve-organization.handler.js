'use strict';
const parseResponseFrom = require('../utils/parse-response-from');
const createSearchParamsFor = require('../utils/create-search-params-for');
const parseOrganizationFrom = require('../utils/to-organization');
const { compose, evolve, filter, pathOr, prop, propEq, propOr, sortBy, when } = require('ramda');
const { isNotNilOrEmpty } = require('@flybondi/ramda-land');

const searchParamsWith = createSearchParamsFor('funding');
const getCompanyName = pathOr(null, ['body', '_source', 'company_name']);
const filterFundingsById = (id, fundings) => filter(propEq('company_uuid', id), fundings);
const sortFundingsByAnnouncedOn = sortBy(prop('announced_on'));
const toOrganization = compose(
  parseOrganizationFrom,
  when(compose(isNotNilOrEmpty, prop('organization')), ({ fundings, organization }) => ({
    ...organization,
    fundings: filterFundingsById(organization.uuid, fundings)
  })),
  evolve({
    fundings: compose(sortFundingsByAnnouncedOn, propOr([], 'hits'), parseResponseFrom),
    organization: pathOr(null, ['body', '_source'])
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

  const getResponse = await elasticsearch.get({ index: 'org', id });
  const name = getCompanyName(getResponse);

  const searchResponse = name
    ? await elasticsearch.search(
        searchParamsWith({
          size: null,
          query: { match: { company_name: name } }
        })
      )
    : { body: { hits: { hits: [] } } };

  ctx.response.body = toOrganization({ organization: getResponse, fundings: searchResponse });
}

module.exports = retrieveAllFundingsHandler;
