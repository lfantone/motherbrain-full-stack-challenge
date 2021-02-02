import PropTypes from 'prop-types';
import clsx from 'clsx';
import { forwardRef } from 'react';
import { isNotNilOrEmpty } from '@flybondi/ramda-land';
import { range } from 'ramda';

const propTypes = {
  brand: PropTypes.bool,
  as: PropTypes.elementType,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]).isRequired,
  size: PropTypes.oneOf(['xs', 'sm', 'lg', ...range(1, 11).map(size => `${size}x`)]),
  className: PropTypes.string
};

const defaultProps = {
  brand: false,
  as: 'i'
};

const LineIcon = forwardRef(function LineIcon(
  { as: Component, brand, className, icon, size, ...other },
  ref
) {
  return (
    <Component
      ref={ref}
      className={clsx(
        brand ? 'lab' : 'las',
        {
          [`la-${icon}`]: isNotNilOrEmpty(icon),
          [`la-${size}`]: isNotNilOrEmpty(size)
        },
        className
      )}
      {...other}
    />
  );
});

LineIcon.propTypes = propTypes;
LineIcon.defaultProps = defaultProps;

export default LineIcon;
