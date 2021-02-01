import Document, { Head, Html, Main, NextScript } from 'next/document';

/**
 * Current app version.
 * @type {string}
 */
const APP_VERSION = process.env.NEXT_PUBLIC_AS_APP_VERSION;

/**
 * Application display name.
 * @type {string}
 */
const APP_NAME = process.env.NEXT_PUBLIC_AS_APP_NAME;

class AppDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta property="as:name" content={APP_NAME} />
          <meta property="as:version" content={APP_VERSION} />
          <meta
            name="description"
            content="EQT is a leading investment firm, with a passion for developing companies."
          />
          <meta property="og:locale" content="en_US" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Home - Motherbrain" />
          <meta
            property="og:description"
            content="EQT is a leading investment firm, with a passion for developing companies."
          />
          <meta property="og:url" content="https://www.eqtgroup.com/" />
          <meta property="og:site_name" content="Motherbrain" />
          <meta
            property="og:image"
            content="https://pe-insights.com/wp-content/uploads/2019/11/eqt.png"
          />
          <meta
            property="og:image:secure_url"
            content="https://pe-insights.com/wp-content/uploads/2019/11/eqt.png"
          />
          <meta property="og:image:width" content="636" />
          <meta property="og:image:height" content="718" />
          {/* Preload most used fonts */}
          <link
            rel="preload"
            href="/fonts/source-sans-pro-300-e36db31c.woff2"
            as="font"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/fonts/source-sans-pro-400-bfa1b47.woff2"
            as="font"
            crossOrigin=""
          />
          <link
            rel="preload"
            href=" /fonts/source-sans-pro-600-55aa0e7a.woff2"
            as="font"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/fonts/source-sans-pro-700-90fa978c.woff2"
            as="font"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/fonts/source-sans-pro-900-35ce35bb.woff2"
            as="font"
            crossOrigin=""
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default AppDocument;
