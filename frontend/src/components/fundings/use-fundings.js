import { compose, map, pick, trim, when } from 'ramda';
import { isNilOrEmpty, rejectNilOrEmpty } from '@flybondi/ramda-land';

import { httpGet } from '@/fetch';
import isString from '@/utils/is-string';
import qs from 'query-string';
import useDidMount from '@/components/core/use-did-mount';
import { useMemo } from 'react';
import useSWR from 'swr';

/**
 * API endpoint to search for fundings.
 *
 * @constant {string}
 */
export const API_FUNDINGS_ENDPOINT = '/fundings';

/**
 * @function
 */
const buildFundingsQuery = compose(
  // Remove any empty, `null` or `undefined`
  rejectNilOrEmpty,
  // Remove white spaces from all string values
  map(when(isString, trim)),
  // Extract only known, supported query string values
  pick(['limit', 'offset'])
);

/**
 * React hooks that uses SWR to fetch funding listings from a
 * `GET /fundings{?limit&offset}` API endpoint.
 *
 * @param {Object} [query={}] Query or filters to search fundings by. At least one of the available filters
 *  must be supplied to trigger a request.
 * @param {string} [query.offset] the search results should start from.
 * @param {number} [query.limit] Limit the number of returned fundings items.
 * @param {Object} [options={}] Request and SWR options.
 * @param {Object[]} [options.initialData] SSR fetched funding data - will be passed down to `useSWR`.
 * @returns {import('swr').responseInterface<any, any>} SWR response interface.
 */
function useFundings(query = {}, { initialData } = {}) {
  const didMount = useDidMount();

  const key = useMemo(() => {
    // Skip request if no value was passed as part of `query`
    const fundingsQuery = isNilOrEmpty(query) ? null : buildFundingsQuery(query);
    return isNilOrEmpty(fundingsQuery)
      ? null
      : [API_FUNDINGS_ENDPOINT, qs.stringify(fundingsQuery)];
  }, [query]);

  const { data, error, mutate, revalidate } = useSWR(key, {
    fetcher: httpGet,
    initialData: didMount ? undefined : initialData,
    refreshWhenHidden: false,
    revalidateOnFocus: false,
    shouldRetryOnError: false
  });

  return {
    data,
    error,
    mutate,
    revalidate
  };
}

/**
 * Fetch funding listings from a `GET /fundings{?limit&offset}` API endpoint.
 *
 * @param {Object} [query={}] Query or filters to search fundings by. At least one of the available filters
 *  must be supplied to trigger a request.
 * @param {string} [query.offset] The search results should start from - use in conjunction with `query.limit`
 *  to provide pagination capabilities.
 * @param {number} [query.limit] Limit the number of returned funding items from a search.
 * @returns {Promise.<Object[]>} Resolves to the list of fundings that matched the `query`.
 */
export async function fetchfundings(query = {}) {
  const data = await httpGet(API_FUNDINGS_ENDPOINT, buildFundingsQuery(query));

  return data;
}

export default useFundings;
