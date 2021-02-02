/**
 * Returns `true` if we are running code server side or `false`, otherwise.
 * @returns {boolean} `true` if running on the server; `false` if the client.
 */
export const isServer = () => typeof window === 'undefined';

/**
 * Returns `true` if we are running code client side or `false`, otherwise.
 * @returns {boolean} `true` if running on the browser; `false` if the server.
 */
export const isBrowser = () => !isServer();
