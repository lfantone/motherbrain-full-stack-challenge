import { compose, map, pick, trim, when } from 'ramda';
import { isNilOrEmpty, rejectNilOrEmpty } from '@flybondi/ramda-land';

import { httpGet } from '@/fetch';
import isString from '@/utils/is-string';
import qs from 'query-string';
import urlJoin from 'url-join';
import useDidMount from '@/components/core/use-did-mount';
import { useMemo } from 'react';
import useSWR from 'swr';

/**
 * API endpoint to search for organizations.
 *
 * @constant {string}
 */
export const API_ORGANIZATIONS_ENDPOINT = '/organizations';

/**
 * @function
 */
const buildOrganizationsQuery = compose(
  // Remove any empty, `null` or `undefined`
  rejectNilOrEmpty,
  // Remove white spaces from all string values
  map(when(isString, trim)),
  // Extract only known, supported query string values
  pick(['limit', 'offset', 'q'])
);

/**
 * React hooks that uses SWR to fetch organization listings from a
 * `GET /organizations{?limit&offset}` API endpoint.
 *
 * @param {Object} [query={}] Query or filters to search organizations by. At least one of the available filters
 *  must be supplied to trigger a request.
 * @param {string} [query.offset] the search results should start from.
 * @param {number} [query.limit=50] Limit the number of returned organizations items (defaults to 50).
 * @param {string} [query.q] Keywords to search organizations by - uses fuzzy matching on most text fields on a organiaztion entity.
 * @param {Object} [options={}] Request and SWR options.
 * @param {Object[]} [options.initialData] SSR fetched organization data - will be passed down to `useSWR`.
 * @returns {import('swr').responseInterface<any, any>} SWR response interface.
 */
function useOrganizations(query = {}, { initialData } = {}) {
  const didMount = useDidMount();

  const key = useMemo(() => {
    // Skip request if no value was passed as part of `query`
    const organizationsQuery = isNilOrEmpty(query) ? null : buildOrganizationsQuery(query);
    return isNilOrEmpty(organizationsQuery)
      ? null
      : [API_ORGANIZATIONS_ENDPOINT, qs.stringify(organizationsQuery)];
  }, [query]);

  const { data = {}, error, mutate, revalidate } = useSWR(key, {
    fetcher: httpGet,
    initialData: didMount ? undefined : initialData,
    refreshWhenHidden: false,
    revalidateOnFocus: false,
    shouldRetryOnError: false
  });

  return {
    data: data.organizations,
    error,
    mutate,
    revalidate
  };
}

/**
 * Fetch organization listings from a `GET /organizations{?limit&offset}` API endpoint.
 *
 * @param {Object} [query={}] Query or filters to search organizations by. At least one of the available filters
 *  must be supplied to trigger a request.
 * @param {string} [query.offset] The search results should start from - use in conjunction with `query.limit`
 *  to provide pagination capabilities.
 * @param {number} [query.limit] Limit the number of returned organization items from a search.
 * @param {string} [query.q] Keywords to search organizations by - uses fuzzy matching on most text fields on a organiaztion entity.
 * @returns {Promise.<Object[]>} Resolves to the list of organizations that matched the `query`.
 */
export async function fetchOrganizations(query = {}) {
  const data = await httpGet(API_ORGANIZATIONS_ENDPOINT, buildOrganizationsQuery(query));

  return data;
}

/**
 * Fetches a single organization item by its id from a `GET /organization/:id` API endpoint.
 * @param {string} id The identifier of the organization to be requested.
 * @returns {Promise.<Object>} Resolves to the matching organization.
 */
export async function fetchSingleOrganization(id) {
  const data = await httpGet(urlJoin(API_ORGANIZATIONS_ENDPOINT, encodeURIComponent(id)));

  return data;
}

export default useOrganizations;
