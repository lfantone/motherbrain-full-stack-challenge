'use strict';

const { Client } = require('@elastic/elasticsearch');

/**
 * Initilise a new Elastic Search client and returns the elastic search middleware.
 *
 * @param {import('@elastic/elasticsearch').ClientOptions & { key: string }} opts ElasticSearch client options object.
 * @returns {import('koa').Middleware} an async middleware function.
 */
function createElasticsearchMiddleware(opts = {}) {
  const client = new Client(opts);

  /**
   * Inject an elastic-search client in the Koa context under the `opts.key` property if present, otherwhise default to `elasticsearch`.
   *
   * @param {import('koa').Context} ctx Koa application context object.
   * @param {import('koa').Next} next Koa callback fn.
   * @returns {Promise<*>} The result from calling the next callback.
   */
  return async function elasticSearchMiddleware(ctx, next) {
    ctx[opts.key || 'elasticsearch'] = client;
    return await next();
  };
}

module.exports = createElasticsearchMiddleware;
