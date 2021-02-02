import {
  assocPath,
  both,
  compose,
  concat,
  either,
  equals,
  gt,
  has,
  lensProp,
  lte,
  omit,
  over,
  propEq,
  propSatisfies,
  startsWith,
  trim,
  unless,
  when
} from 'ramda';
import { isNilOrEmpty, isNotNil, rejectNil } from '@flybondi/ramda-land';

import isString from './utils/is-string';
import qs from 'query-string';
import urlJoin from 'url-join';

/**
 * Remote API base URL.
 * @type {string}
 */
export const API_BASE_URL = process.env.NEXT_PUBLIC_AS_API_BASE_URL;

class FetchError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

/**
 * Creates a new `FetchError` instance extended with properties from `details`.
 *
 * @function
 * @param {string} message Error message or description,
 * @param {Object=} details Optional properties to assign to the error object.
 * @returns {FetchError} A `FetchError` instance.
 */
const createFetchError = (message, details = {}) => {
  return Object.assign(new FetchError(message), details);
};

/**
 * Build a query string from the given object. If `query` is already
 * a `String`, `?` will be appended at the beginning (unless it already starts with it).
 *
 * @function
 * @param {Object|string} query A map of URL query parameters.
 * @returns {String} A query string starting with `'?'` or an empty string.
 */
const createQueryParams = compose(
  unless(startsWith('?'), concat('?')),
  trim,
  unless(isString, compose(qs.stringify, rejectNil))
);

/**
 * If `body` is present in the given fetch `options`, stringify its contents and set an appropriate
 * `Content-Type: application/json` header.
 *
 * @function
 * @see https://github.com/developit/unfetch#fetchurl-string-options-object
 * @param {object} options Options object as expected by `unfetch`
 * @returns {object} A new options object containing a JSON stringified body and a `Content-Type`
 *  header; or the same `options` object, unmodified if no `body` property was present.
 */
const withJsonBody = when(
  both(has('body'), propEq('json', true)),
  compose(
    over(lensProp('body'), JSON.stringify),
    assocPath(['headers', 'Content-Type'], 'application/json; charset=utf-8')
  )
);

/**
 * @function
 */
const defineOptions = compose(
  rejectNil,
  // Remove custom options
  omit(['json', 'query']),
  withJsonBody
);

export async function fetcher(path, options = {}) {
  const url = urlJoin(API_BASE_URL, path);
  const query = isNilOrEmpty(options.query) ? '' : createQueryParams(options.query);

  const res = await fetch(`${url}${query}`, defineOptions(options));
  const body = await res.json();

  if (!res.ok) {
    // Throw an error on non-2xx responses
    throw createFetchError(body?.message ?? res.statusText, { status: res.status, res: body });
  }

  // Return `data` property if present instead of whole body
  return body?.data ?? body;
}

/**
 * Performs a `GET` request with given `url`.
 *
 * @async
 * @param {String} url The URL to request.
 * @param {object} [query={}] Optional URL query string parameters as an object.
 * @param {object} [options={}] Request options.
 * @param {string} [options.token] Optional authorization token.
 * @param {AbortSignal} [options.signal] An `AbortSignal` to set request's signal.
 * @param {boolean} [options.credentials] Whether to include or omit cookies from
 *  the request - will be ignored if `token` is also set.
 */
export function httpGet(url, query = {}, { credentials, signal, token } = {}) {
  return fetcher(url, { query, token, credentials, signal, method: 'GET' });
}

/**
 * Tests an HTTP status against a boolean returning `fn` function.
 *
 * @function
 * @param {(status: number) => boolean} fn The predicate to evaluate on the HTTP status code.
 * @returns {(err: Error) => boolean} A function that takes in an error and return
 *  `true` if the HTTP status satisfies `fn`; `false`, otherwise.
 */
const statusSatisfies = fn => both(isNotNil, propSatisfies(compose(fn, Number), 'status'));

/**
 * Compares an HTTP status extracted from `err.status`
 * against a given numerical `statusCode`.
 *
 * @function
 * @param {number} statusCode The status to compare against.
 * @returns {function(Error):boolean} A function that expects
 *  an `Error` and compares a `status` property value against the given `statusCode`.
 */
const statusEq = statusCode => statusSatisfies(equals(statusCode));

/**
 * Checks if the given `error` has an HTTP `status` code
 * belonging to the range of 4xx client errors.
 *
 * @param {object} error The error to check
 * @returns {boolean} `true` if `error` represents a client error; `false`, otherwise.
 */
export const isClientError = statusSatisfies(both(lte(400), gt(500)));

/**
 * Checks if the given `error` has a 400 (Bad Request) HTTP `status` code.
 *
 * @param {object} error The error to check
 * @returns {boolean} `true` if `error` represents a Bad Request HTTP error; `false`, otherwise.
 */
export const isBadRequestError = statusEq(400);

/**
 * Checks if the given `error` has a 409 (Conflict) HTTP `status` code.
 *
 * @param {object} error The error to check
 * @returns {boolean} `true` if `error` represents a Conflict HTTP error; `false`, otherwise.
 */
export const isConflictError = statusEq(409);

/**
 * Checks if the given `error` has a 404 (Not Found) HTTP `status` code.
 *
 * @param {object} error The error to check
 * @returns {boolean} `true` if `error` represents a Not Found HTTP error; `false`, otherwise.
 */
export const isNotFoundError = statusEq(404);

/**
 * Checks if the given `statusCode` is either 401 (Unauthorized) or 403 (Forbidden).
 *
 * @param {number|string} statusCode The code to check.
 * @returns {boolean} `true` if `statusCode` is either `401` or `403`.
 */
export const isUnauthorizedOrForbidden = compose(either(equals(401), equals(403)), Number);

/**
 * Checks if the given `error` has either a 401 (Unauthorized) or 403 (Forbidden)
 * HTTP `status` code.
 *
 * @param {object} error The error to check
 * @returns {boolean} `true` if `error` represents either an Unauthorized or Forbidden HTTP error;
 *  `false`, otherwise.
 */
export const isAuthorizationError = statusSatisfies(isUnauthorizedOrForbidden);
