import Link from '../core/link';
import PropTypes from 'prop-types';
import clsx from 'clsx';

AppHeader.propTypes = {
  /**
   * Custom element type for this component (defaults to `aside`).
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
   * Whether to fix the header to the top of the view or not (defaults to `false`).
   * If setting this to `true`, an extra padding should be set on sibling element to
   * compensate for the `position: fixed` style.
   * @type {boolean}
   */
  fixed: PropTypes.bool,

  /**
   * Whether to hide the header outside the viewport or not (defaults to `false`).
   * @type {boolean}
   */
  hidden: PropTypes.bool
};

AppHeader.defaultProps = {
  fixed: false,
  hidden: false,
  as: 'header'
};

function AppHeader({ as: Component, className, fixed, hidden, style }) {
  return (
    <Component
      className={clsx(
        'z-20 flex items-center justify-between py-3 transition duration-300 transform',
        { 'fixed top-0 w-full': fixed === true },
        {
          'translate-y-0 ease-in shadow-md': !hidden,
          '-translate-y-full ease-out': hidden === true
        },
        className
      )}
      style={style}
    >
      <div className="flex items-center space-x-4">
        <Link href="/" className="flex items-center p-0 ml-0 text-md sm:text-lg">
          <span className="font-mono font-semibold">EQT</span>
        </Link>
      </div>
    </Component>
  );
}

export default AppHeader;
