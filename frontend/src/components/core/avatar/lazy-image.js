import Image from 'next/image';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lowerEquals } from '@flybondi/ramda-land';
import { useState } from 'react';

/**
 * @function
 */
const isLazy = lowerEquals('lazy');

LazyImage.propTypes = {
  className: PropTypes.string,
  loading: PropTypes.oneOf(['eager', 'lazy']),
  height: PropTypes.number,
  width: PropTypes.number
};

LazyImage.defaultProps = {
  loading: 'lazy'
};

function LazyImage(props) {
  const lazy = isLazy(props.loading);
  const [imgLoaded, setImgLoaded] = useState(!lazy);

  return (
    <Image
      {...props}
      className={clsx(
        'inline-block h-full w-full bg-transparent opacity-0',
        {
          'opacity-100 transition-opacity duration-150': imgLoaded
        },
        props.className
      )}
      onLoad={lazy && !imgLoaded ? () => setImgLoaded(true) : undefined}
    />
  );
}

export default LazyImage;
