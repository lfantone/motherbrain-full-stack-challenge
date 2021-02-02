/* eslint-disable strict */
'use strict';
const withFonts = require('next-fonts');
const withImages = require('next-images');
const withPlugins = require('next-compose-plugins');
const pck = require('./package.json');
const { isNil } = require('ramda');
const { rejectNilOrEmpty } = require('@flybondi/ramda-land');

/**
 * Extracts the hostname from the supplied URL. If `null` or `undefined`, this
 * function returns `undefined`.
 *
 * @param {string} url The input URL.
 * @returns {string?} The hostname of the given URL.
 */
const hostname = url => (isNil(url) ? undefined : new URL(url).hostname);

// Time of build - will be set as an environment variable
// for reporting purposes
const date = new Date();

const nextConfig = {
  // Do not show the X-Powered-By header in the responses
  poweredByHeader: false,
  devIndicators: {
    // Do not show intrusive "Pre-rendered page" floating labels
    // at the bottom of the page
    autoPrerender: false
  },
  images: {
    domains: rejectNilOrEmpty([
      'picsum.photos',
      hostname(process.env.NEXT_PUBLIC_AS_ASSETS_BASE_URL)
    ])
  },
  env: {
    NEXT_PUBLIC_AS_BUILD_DATE: date.toString(),
    NEXT_PUBLIC_AS_BUILD_TIMESTAMP: date.valueOf(),
    NEXT_PUBLIC_AS_APP_NAME: pck.name,
    NEXT_PUBLIC_AS_APP_VERSION: pck.version
  }
};

module.exports = withPlugins([withImages, withFonts], nextConfig);
