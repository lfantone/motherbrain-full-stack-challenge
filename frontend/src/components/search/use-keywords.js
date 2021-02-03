import { compose, last, prop, split } from 'ramda';

import { isServer } from '@/utils/is-server-browser';
import { useState } from 'react';

/**
 * @function
 */
const extractKeywords = compose(decodeURIComponent, last, split('/'), prop('pathname'));

/**
 * Returns a stateful value of search keywords, and a function to update it.
 * The value of `keywords` is initialized next to the pathname of the current active location
 * (e.g.: `/search/foo%20bar` -> `'foo bar`').
 *
 * @see https://reactjs.org/docs/hooks-reference.html#usestate
 * @return {[string, Dispatch<SetStateAction<string>>]} The keywords state.
 */
function useKeywords() {
  // We don't use `next/router` to extract the `[keywords]` value from `router.query` as
  // it won't get populated on first paint, delaying the fetching of search results
  // See https://github.com/vercel/next.js/issues/8259
  const initialKeywords = isServer() ? undefined : extractKeywords(window.location);
  const [keywords, setKeywords] = useState(initialKeywords);
  return [keywords, setKeywords];
}

export default useKeywords;
