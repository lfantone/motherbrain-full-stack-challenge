const { isNil, once } = require('ramda');
const path = require('path');
const fs = require('fs');
const xxh = require('xxhashjs');

const listPublicFonts = once(() => {
  try {
    return fs.readdirSync(path.join('public', 'fonts'));
  } catch (err) {
    return [];
  }
});

function fontExists(src) {
  const fontFiles = listPublicFonts();
  const extension = path.extname(src);
  const basenameWithoutExtension = path.basename(src, extension);
  return fontFiles.find(
    file => file.startsWith(basenameWithoutExtension) && file.endsWith(extension)
  );
}

/**
 * Synchronously copies `src` to `dest`. `dest` is overwritten if it already exists and
 * created if it doesn't.
 *
 * @param {string} src A path to the source file.
 * @param {string} dest A path to the destination file.
 * @returns {void}
 */
function copySync(src, dest) {
  // Ensure destination exists before attempting to copy file
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, path.resolve(dest));
}

/**
 * Computes and returns a base 16 representation of a xxhash derived from
 * the contents of the given `data`.
 *
 * @see https://www.npmjs.com/package/xxhashjs#examples
 * @param {string|ArrayBuffer|Buffer} data The data to compute the hash for.
 * @returns {string} A the base 16 encoded hash string.
 */
function xxhash(data) {
  const seed = 0;
  return xxh.h32(seed).update(data).digest().toString(16);
}

/**
 * Computes the xxhash of the contents from `src` and appends a base 16 representation
 * of it to the base file name.
 *
 * @param {string} src The path to a the file whose hash needs to be computed.
 * @returns {string} The base name of the file at `src` with an xxhash appended to it.
 */
function getNameWithHash(src) {
  const extension = path.extname(src);
  const contents = fs.readFileSync(src);
  return `${path.basename(src, extension)}-${xxhash(contents)}${extension}`;
}

function copyFontAsset(asset) {
  const existingFontFile = fontExists(asset.absolutePath);
  const fontIsMissing = isNil(existingFontFile);
  const basename = fontIsMissing ? getNameWithHash(asset.absolutePath) : existingFontFile;

  if (fontIsMissing) {
    const destpath = path.join('public', 'fonts', basename);
    copySync(asset.absolutePath, destpath);
  }

  return path.join(path.sep, 'fonts', basename);
}

// PostCSS configuration file
// @see https://tailwindcss.com/docs/using-with-preprocessors/#future-css-features
module.exports = {
  plugins: {
    'postcss-import': {},
    tailwindcss: {},
    'postcss-flexbugs-fixes': {},
    'postcss-url': [
      {
        // Copy and rebase urls from `line-awesome` fonts installed through npm
        // to `public/fonts` folder
        filter: '**/typeface-*/files/*',
        url: copyFontAsset
      },
      {
        // Copy and rebase urls from `line-awesome` fonts installed through npm
        // to `public/fonts` folder
        filter: '**/line-awesome/dist/line-awesome/fonts/*',
        url: copyFontAsset
      }
    ],
    'postcss-preset-env': { stage: 1 }
  }
};
