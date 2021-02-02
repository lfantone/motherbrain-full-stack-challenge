import { isNotNil, isNotNilOrEmpty } from '@flybondi/ramda-land';

import PropTypes from 'prop-types';
import clsx from 'clsx';
import { forwardRef } from 'react';
import isString from '@/utils/is-string';

CardActions.propTypes = {
  /**
   * Card icon contents.
   * @type {import('react').ReactNode}
   */
  children: PropTypes.node,

  /**
   * Optional inline CSS styles.
   * @type {Object}
   */
  style: PropTypes.object,

  /**
   * @type {Function}
   */
  onClick: PropTypes.func,

  /**
   * Additional CSS classes to apply to the card..
   * @type {string}
   */
  className: PropTypes.string
};

export function CardActions({ children, className, style }) {
  return (
    <div className={clsx('flex items-center p-1 space-x-3', className)} style={style}>
      {children}
    </div>
  );
}

CardMedia.propTypes = {
  /**
   * Card icon contents.
   * @type {import('react').ReactNode}
   */
  children: PropTypes.node,

  /**
   * Optional inline CSS styles.
   * @type {Object}
   */
  style: PropTypes.object,

  /**
   * @type {Function}
   */
  onClick: PropTypes.func,

  /**
   * Media component size. One of `sm` or `md` (defaults to `md`).
   * @type {string}
   */
  size: PropTypes.oneOf(['sm', 'md']),

  /**
   * Additional CSS classes to apply to the card..
   * @type {string}
   */
  className: PropTypes.string
};

CardMedia.defaultProps = {
  size: 'md'
};

export function CardMedia({ children, className, size, style }) {
  return (
    <div
      className={clsx('card-media', { [`card-media-${size}`]: isNotNilOrEmpty(size) }, className)}
      style={style}
    >
      {children}
    </div>
  );
}

CardContent.propTypes = {
  /**
   * Card icon contents.
   * @type {React.ReactNode}
   */
  children: PropTypes.node,

  /**
   * Optional inline CSS styles.
   * @type {Object}
   */
  style: PropTypes.object,

  /**
   * Callback fired when the card content is clicked or touched.
   * @type {Function}
   */
  onClick: PropTypes.func,

  /**
   * Additional CSS classes to apply to the card..
   * @type {string}
   */
  className: PropTypes.string
};

export function CardContent({ children, className, onClick, style }) {
  // Also support keyboard events if an `onClick` callback is supplied
  // See https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/click-events-have-key-events.md
  const onKeyUp = (key, event) => {
    if (key === 'Enter' && onClick) {
      onClick(event);
    }
  };

  return (
    <div
      role={onClick ? 'button' : undefined}
      className={clsx('card-content', className)}
      style={style}
      onKeyUp={onClick ? e => onKeyUp(e.key, e) : undefined}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

CardHeader.propTypes = {
  /**
   * Additional CSS classes to apply to the card..
   * @type {String}
   */
  className: PropTypes.string,

  /**
   * Optional inline CSS styles.
   * @type {Object}
   */
  style: PropTypes.object,

  /**
   * @type {import('react').ReactNode}
   */
  heading: PropTypes.node.isRequired,

  /**
   * @type {import('react').ReactNode}
   */
  subheading: PropTypes.node,

  /**
   * Header component size. One of `xs`, `sm` or `md` (defaults to `md`). Affects font sizes
   * and line height.
   * @type {string}
   */
  size: PropTypes.oneOf(['xs', 'sm', 'md']),

  /**
   * @type {import('react').ReactNode}
   */
  icon: PropTypes.node
};

CardHeader.defaultProps = {
  size: 'md'
};

export function CardHeader({ className, heading, icon, size, style, subheading }) {
  const hasIcon = isNotNil(icon);
  const header = (
    <>
      <div className="card-heading">{heading}</div>
      {subheading && <div className="card-subheading">{subheading}</div>}
    </>
  );

  return (
    <div
      className={clsx(
        'card-header',
        {
          [`card-header-${size}`]: isNotNilOrEmpty(size),
          'card-header-icon space-x-2': hasIcon
        },
        className
      )}
      style={style}
    >
      {icon}
      {hasIcon ? <div>{header}</div> : header}
    </div>
  );
}

const Card = forwardRef(function Card(
  { as: Component, children, className, elevation, onClick, selectable, style, ...other },
  ref
) {
  return (
    <Component
      style={style}
      className={clsx(className, 'card', {
        [`card-elevation-${elevation}`]: isString(elevation),
        'cursor-pointer transition-shadow duration-150 ease-in-out hocus:shadow-lg-1-top':
          selectable === true || isNotNil(onClick)
      })}
      onClick={onClick}
      ref={ref}
      {...other}
    >
      {children}
    </Component>
  );
});

Card.propTypes = {
  /**
   * Card contents.
   * @type {React.ReactNode}
   */
  children: PropTypes.node,

  /**
   * Additional CSS classes to apply to the card..
   * @type {string}
   */
  className: PropTypes.string,

  /**
   * Custom element type for this component (defaults to `div`).
   * @type {React.ElementType}
   */
  as: PropTypes.elementType,

  /**
   * Box shadow strength. Set to `false` or `null` to disable elevation completely.
   * @type {string|boolean}
   */
  elevation: PropTypes.oneOf(['xs', 'md', 'lg', 'xl']),

  /**
   * Callback fired when the card body is clicked or touched.
   * @type {Function}
   */
  onClick: PropTypes.func,

  /**
   * If set to `true` the cursor changes to `pointer` and hover and focus styles are applied. This
   * is the same effect that setting an `onClick` callback brings, but without the need to actually supply one.
   * Mostly useful in scenarios where different areas of a card trigger different `onClick` actions.
   * Defaults to `false`.
   *
   * @type {boolean}
   */
  selectable: PropTypes.bool,

  /**
   * Optional inline CSS styles.
   * @type {Object}
   */
  style: PropTypes.object
};

Card.defaultProps = {
  as: 'div',
  elevation: 'md',
  selectable: false
};

export default Card;
