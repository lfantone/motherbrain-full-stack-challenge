import AppFooter from './app-footer';
import AppHeader from './app-header';
import Button from '@/components/core/button';
import IconButton from '@/components/core/button/icon-button';
import LineIcon from '@/components/core/line-icon';
import Link from '@/components/core/link';
import NextLink from 'next/link';
import PropTypes from 'prop-types';
import Tooltip from '@/components/core/tooltip';
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

  const headerEndItems = (
    <div className="flex items-center space-x-3 md:space-x-8">
      <Link className="hidden md:inline-block" href="#/" color="secondary">
        About us
      </Link>
      <Link className="hidden md:inline-block" href="#/" color="secondary">
        Our clients
      </Link>
      <Link className="hidden md:inline-block" href="/hire-recruiter" color="secondary">
        Hire a recruiter
      </Link>

      <NextLink href="/hire-recruiter" passHref>
        <IconButton as="a" color="secondary" className="md:hidden">
          <Tooltip content="Hire a recruiter">
            <LineIcon className="w-6 h-6 pt-1" icon="hands-helping" size="lg" />
          </Tooltip>
        </IconButton>
      </NextLink>

      <Link className="hidden md:inline-block" href="/login" color="secondary">
        Sign in
      </Link>

      <NextLink href="/login" passHref>
        <IconButton as="a" color="secondary" className="md:hidden">
          <Tooltip content="Sign in">
            <LineIcon className="w-6 h-6 pt-1" icon="sign-in-alt" size="lg" />
          </Tooltip>
        </IconButton>
      </NextLink>

      <Button
        dense
        variant="outlined"
        color="primary"
        className="px-4 text-sm md:px-8 md:text-base"
      >
        Register
      </Button>
    </div>
  );

  return (
    <Component
      className={clsx(
        className,
        'min-h-screen overflow-hidden text-gray-800 antialiased font-normal'
      )}
      style={style}
    >
      {disableHeader !== true && (
        <AppHeader
          className="px-6 bg-white md:px-12"
          fixed
          hidden={headerHidden}
          endItems={headerEndItems}
        />
      )}
      <main className={clsx('w-full h-full bg-gray-100', { 'pt-12': disableHeader !== true })}>
        {children}
      </main>
      {disableFooter !== true && <AppFooter />}
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
