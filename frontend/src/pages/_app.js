// Splitting styles into three different files ensures we don't recompile tailwindcss
// entire on each change while keeping CSS specificity order in check
// See https://github.com/vercel/next.js/issues/13488#issuecomment-688253373
import '../styles/core.css';
import '../styles/components.css';
import '../styles/utilities.css';

import Head from 'next/head';
import PropTypes from 'prop-types';
import useRouterScroll from '@/components/layout/use-router-scroll';

App.propTypes = {
  /**
   * @type {*}
   */
  Component: PropTypes.any.isRequired,

  /**
   * @type {Object}
   */
  pageProps: PropTypes.object
};

/**
 * The identity function. Default or placeholder layout function.
 * Does nothing but return the parameter supplied to it.
 *
 * @param {*} page The page component to return.
 * @returns {*} The input page.
 */
const identityLayout = page => page;

function App({ Component, pageProps }) {
  // Make sure pages scroll to the top after we navigate to them using `next/router`
  useRouterScroll();

  // Render a custom layout for the page component defined through
  // a static `getLayout` function
  const getLayout = Component.getLayout || identityLayout;

  return (
    <>
      <Head>
        <title>EQT | Motherbrain</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      {getLayout(<Component {...pageProps} />)}
    </>
  );
}

export default App;
