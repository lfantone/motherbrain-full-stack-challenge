import AppHeader from './app-header';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import useHiddenHeader from './use-hidden-header';

AppLayout.propTypes = {
  /**
   * Application contents.
   * @type {React.ReactNode}
   */
  children: PropTypes.node,

  /**
   * Custom CSS classes to apply to the layout element.
   * @type {String}
   */
  className: PropTypes.string,

  /**
   * Custom element type for this component (defaults to `main`).
   * @type {React.ElementType}
   */
  as: PropTypes.elementType,

  /**
   * Optional inline CSS styles.
   * @type {Object}
   */
  style: PropTypes.object,

  /**
   * Whether to render the application header on top of the page or not
   * (defaults to `false`, i.e.: show header).
   * @type {boolean}
   */
  disableHeader: PropTypes.bool,

  /**
   * Whether to render the application footer at the bottom of the page or not
   * (defaults to `false`, i.e.: show footers).
   * @type {boolean}
   */
  disableFooter: PropTypes.bool
};

AppLayout.defaultProps = {
  disableFooter: false,
  disableHeader: false,
  as: 'div'
};

function AppLayout({ as: Component, children, className, disableFooter, disableHeader, style }) {
  const headerHidden = useHiddenHeader();

  return (
    <Component
      className={clsx(
        className,
        'min-h-screen overflow-hidden text-gray-800 antialiased font-normal'
      )}
      style={style}
    >
      {disableHeader !== true && (
        <AppHeader className="px-6 bg-white md:px-12" fixed hidden={headerHidden} />
      )}
      <main className={clsx('w-full h-full bg-gray-100', { 'pt-12': disableHeader !== true })}>
        {children}
      </main>
    </Component>
  );
}

/**
 * Wraps a given page in an `AppLayout` component.
 * @param {import('next').NextPage} page A Next.js page.
 */
export function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
}

export default AppLayout;
