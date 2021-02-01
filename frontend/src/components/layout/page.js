import Head from 'next/head';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { forwardRef } from 'react';

const propTypes = {
  /**
   * Application contents.
   * @type {React.ReactNode}
   */
  children: PropTypes.node,

  /**
   * Custom CSS classes to apply to the page content element.
   * @type {String}
   */
  className: PropTypes.string,

  /**
   * Custom element type for this component (defaults to `main`).
   * @type {React.ElementType}
   */
  as: PropTypes.elementType,

  /**
   * If set the `<title>` html tag will change to this value.
   * @type {string}
   */
  headTitle: PropTypes.string,

  /**
   * Optional inline CSS styles.
   * @type {Object}
   */
  style: PropTypes.object
};

const defaultProps = {
  as: 'article'
};

const Page = forwardRef(function Page(
  { as: Component, children, className, headTitle, style, ...other },
  ref
) {
  return (
    <>
      {headTitle && (
        <Head>
          <title>{headTitle}</title>
        </Head>
      )}
      <Component
        ref={ref}
        className={clsx(className, 'h-full max-w-none bg-gray-100')}
        style={style}
        {...other}
      >
        {children}
      </Component>
    </>
  );
});

Page.propTypes = propTypes;
Page.defaultProps = defaultProps;

export default Page;
