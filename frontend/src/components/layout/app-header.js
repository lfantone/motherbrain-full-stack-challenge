import Avatar from '../core/avatar';
import IconButton from '../core/button/icon-button';
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
   * Information about the logged in user used to display an avatar
   * and name on the sidebar.
   * @type {object|boolean}
   */
  user: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      email: PropTypes.string
    })
  ]),

  /**
   * Whether to fix the header to the top of the view or not (defaults to `false`).
   * If setting this to `true`, an extra padding should be set on sibling element to
   * compensate for the `position: fixed` style.
   * @type {boolean}
   */
  fixed: PropTypes.bool,

  /**
   * Elements to render before the brand logo (i.e.: on the left hand-side of the view).
   * @type {import('react').ReactNode}
   */
  startItems: PropTypes.node,

  /**
   * Elements to render before the user avatar (i.e.: on the right hand-side of the view).
   * @type {import('react').ReactNode}
   */
  endItems: PropTypes.node,

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

function AppHeader({ as: Component, className, endItems, fixed, hidden, startItems, style, user }) {
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
        {startItems}
        <Link href="/" className="flex items-center p-0 ml-0 text-md sm:text-lg">
          <span className="font-mono font-semibold">{'EQT'}</span>
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        {endItems}
        {user && (
          <IconButton className="p-0 rounded-full shadow xl:hidden animate-fade-in-bck">
            <Avatar className="p-0" variant="circle" src={user.image} alt={user.name} size="xs" />
          </IconButton>
        )}
      </div>
    </Component>
  );
}

export default AppHeader;
