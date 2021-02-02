import { useCallback, useRef } from 'react';

import Button from '@/components/core/button';
import { Input } from '@/components/core/form';
import LineIcon from '@/components/core/line-icon';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeRefs from '@seznam/compose-react-refs';
import { trim } from 'ramda';
import { useDebouncedCallback } from 'use-debounce';

SearchInput.propTypes = {
  /**
   * Custom element type for this component (defaults to `div`).
   * @type {import('react').ElementType}
   */
  as: PropTypes.elementType,

  /**
   * Custom CSS classes to apply to the feature content element.
   * @type {string}
   */
  className: PropTypes.string,

  /**
   * Optional inline CSS styles.
   * @type {object}
   */
  style: PropTypes.object,

  /**
   * Callback fired when a search is triggered (either after hitting the `Enter` key
   * on the input or clicking/touching the search icon). Receives the input value and the
   * original `SyntheticEvent`.
   * @type {Function}
   */
  onSearch: PropTypes.func.isRequired,

  /**
   * `input` element ref.
   * @type {Function|{ current: any }}
   */
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.objectOf(PropTypes.shape({ current: PropTypes.any }))
  ])
};

function SearchInput({ className, inputRef, onSearch, style, ...other }) {
  const ownInputRef = useRef();
  const { callback: onSearchKeyUp } = useDebouncedCallback(
    (key, value, event) => {
      if (key === 'Enter') {
        onSearch(trim(value), event);
      }
    },
    350,
    { maxWait: 1000 }
  );

  const onSearchClick = useCallback(event => onSearch(trim(ownInputRef.current.value), event), [
    onSearch
  ]);

  return (
    <Input
      pill
      dense
      ref={composeRefs(ownInputRef, inputRef)}
      className={clsx('shadow-soft', className)}
      style={style}
      onKeyUp={event => onSearchKeyUp(event.key, event.target.value, event)}
      type="search"
      endIcon={
        <Button
          onClick={onSearchClick}
          circle
          color={false}
          className="w-8 h-8 bg-gray-400 hover:bg-gray-500 btn-p-circle"
        >
          <LineIcon icon="search" size="lg" className="text-white" />
        </Button>
      }
      {...other}
    />
  );
}

export default SearchInput;
