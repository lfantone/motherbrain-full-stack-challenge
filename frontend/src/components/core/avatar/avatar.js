import { isNotNil, isNotNilOrEmpty, lowerEquals } from '@flybondi/ramda-land';
import { useEffect, useMemo, useState } from 'react';

import LazyImage from './lazy-image';
import LineIcon from '@/components/core/line-icon';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { head } from 'ramda';
import { isServer } from '@/utils/is-server-browser';

Avatar.propTypes = {
  /**
   * Custom element type for this component (defaults to `div`).
   * @type {import('react').ElementType}
   */
  as: PropTypes.elementType,

  /**
   * Custom CSS classes to apply to the root element.
   * @type {string}
   */
  className: PropTypes.string,

  /**
   * Optional inline CSS styles.
   * @type {Object}
   */
  style: PropTypes.object,

  /**
   * Used in combination with `src` or `srcSet` to
   * provide an alt attribute for the rendered `img` element.
   * @type {string}
   */
  alt: PropTypes.string,

  /**
   * The `sizes` attribute for the `img` element.
   * @type {string}
   */
  imgSizes: PropTypes.string,
  /**
   * The `src` attribute for the `img` element.
   * @type {string}
   */
  src: PropTypes.string,
  /**
   * The `srcSet` attribute for the `img` element.
   * Use this attribute for responsive image display.
   * @type {string}
   */
  srcSet: PropTypes.string,

  /**
   * The shape of the avatar.
   * @type {string}
   */
  variant: PropTypes.oneOf(['circle', 'rounded', 'square']),

  /**
   * What to show while the avatar image is loading.
   * @type {import('react').ReactNode}
   */
  placeholder: PropTypes.node,

  /**
   * Whether show show a placeholder
   * @type {boolean}
   */
  lazy: PropTypes.bool,

  /**
   * Avatar size (defaults to `md`).
   * @type {string}
   */
  size: PropTypes.oneOf(['xxs', 'xs', 'sm', 'md', 'lg', 'xl'])
};

Avatar.defaultProps = {
  lazy: true,
  as: 'div'
};

/**
 * @function
 */
const isCircle = lowerEquals('circle');

/**
 * @function
 */
const isRounded = lowerEquals('rounded');

/**
 * The font size of the `html` root element in pixels. Defaults to `16` server side.
 * @constant {number}
 */
const ROOT_FONT_SIZE_PX = isServer()
  ? 16
  : parseInt(getComputedStyle(document.documentElement).getPropertyValue('font-size'), 10);

/**
 * Size (width or height) of the largest avatar image (in `px`).
 * @constant {number}
 */
const MAX_AVATAR_SIZE_PX = 8 * ROOT_FONT_SIZE_PX;

function useImageLoader({ src, srcSet }) {
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    if (src || srcSet) {
      let active = true;
      const image = new Image();
      image.src = src;
      image.srcSet = srcSet;
      image.onload = () => {
        if (active) {
          setLoadFailed(false);
        }
      };
      image.onerror = () => {
        if (active) {
          setLoadFailed(true);
        }
      };

      return () => {
        active = false;
      };
    }
  }, [src, srcSet]);

  return loadFailed;
}

function Avatar({
  alt,
  as: Component,
  className,
  imgSizes,
  lazy,
  placeholder,
  size,
  src,
  srcSet,
  style,
  variant
}) {
  const fallback = isNotNil(alt) ? (
    // ...if the image fails to load, but an `alt` text was set, show its first character
    // as a fallback
    <span className="text-2xl">{head(alt)}</span>
  ) : (
    // ...is an `alt` text was not defined, default to show a generic user icon
    <LineIcon icon="user-alt" size="2x" />
  );

  // Use a custom hook instead of `onError` on the `img` element to support server-side rendering
  // See https://github.com/facebook/react/issues/15446
  const loadFailed = useImageLoader({ src, srcSet });

  const children = useMemo(
    () =>
      (src ?? srcSet) && !loadFailed ? (
        <LazyImage
          loading={lazy ? 'lazy' : 'eager'}
          src={src}
          srcSet={srcSet}
          alt={alt}
          sizes={imgSizes}
          height={MAX_AVATAR_SIZE_PX}
          width={MAX_AVATAR_SIZE_PX}
          className="avatar-img"
        />
      ) : loadFailed ? (
        fallback
      ) : (
        placeholder
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [src, srcSet]
  );

  return (
    <Component
      className={clsx(
        'avatar',
        {
          [`avatar-${size}`]: isNotNilOrEmpty(size) && size !== false,
          'avatar-circle': isCircle(variant),
          'avatar-rounded': isRounded(variant)
        },
        className
      )}
      style={style}
    >
      {children}
    </Component>
  );
}

export default Avatar;
