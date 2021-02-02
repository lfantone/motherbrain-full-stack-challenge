'use strict';
const { compose, pathOr } = require('ramda');
const parseFundingFrom = require('../utils/to-funding');

const toFunding = compose(parseFundingFrom, pathOr({}, ['body', '_source']));

/**
 *  Retrieves a funding from the dB by the given id.
 *
 * @param {import('@koa/router').RouterContext} ctx Koa application router context object
 */
async function retrieveFundingHandler(ctx) {
  const {
    elasticsearch,
    params: { id }
  } = ctx;

  const response = await elasticsearch.get({ index: 'funding', id });

  ctx.response.body = toFunding(response);
}

module.exports = retrieveFundingHandler;
