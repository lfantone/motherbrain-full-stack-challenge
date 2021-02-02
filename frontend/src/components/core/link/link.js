import NextLink from 'next/link';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { isNotNilOrEmpty } from '@flybondi/ramda-land';

Link.propTypes = {
  /**
   * Custom CSS classes to apply to the footer element.
   * @type {String}
   */
  className: PropTypes.string,

  /**
   * Custom element type for this component (defaults to `a`).
   * @type {React.ElementType}
   */
  as: PropTypes.elementType,

  /**
   * Link contents.
   * @type {React.ReactNode}
   */
  children: PropTypes.node,

  /**
   * The `href` link attribute.
   * @type {string}
   */
  href: PropTypes.string.isRequired,

  /**
   * The color of the component.
   * @type {string}
   */
  color: PropTypes.oneOf(['current', 'primary', 'secondary']),

  /**
   * Optional inline CSS styles.
   * @type {Object}
   */
  style: PropTypes.object,

  /**
   * Whether to render a simple `a` and not wrap it in a `next/link` component.
   * @type {boolean}
   */
  naked: PropTypes.bool
};

Link.defaultProps = {
  as: 'a'
};

function Link({ as: Component, children, className, color, href, naked, style, ...other }) {
  const anchor = (
    <a
      className={clsx('link', { [`link-${color}`]: isNotNilOrEmpty(color) }, className)}
      style={style}
      href={href}
      {...other}
    >
      {children}
    </a>
  );

  return naked ? anchor : <NextLink href={href}>{anchor}</NextLink>;
}

export default Link;
