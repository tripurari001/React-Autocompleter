import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

/**
 * "Value" represent the Input value ( what is being typed and inside input )
 *
 * "selectedValue" represent what item or items are selected
*/

const Autocompleter = React.memo(props => {
  const inputEl = useRef(null);
  const [open, setOpen] = useState(false);
  const [hilightIndex, setHilightIndex] = useState(null);
  const instanceVariable = useRef({ ignoreBlur: false });
  const { current: instanceVars } = instanceVariable;

  const handleFocus = event => {
    setOpen(true);
  };
  const handleBlur = event => {
    if (instanceVars.ignoreBlur) {
      return;
    }
    setOpen(false);
  };
  const handleChange = event => {
    props.onChange(event, event.target.value);
  };
  const handleSelect = (value, item) => {
    setOpen(false);
    props.onSelect(value, item);
  };

  const renderMenu = () => {
    const { filterItems, items, value, selectedValue } = props;
    const renderedItems = filterItems(items, value, selectedValue).map((item, index) => {
      const isHilighted = hilightIndex === index;
      const renderedItem = props.renderItem(item, isHilighted);
      return React.cloneElement(
        renderedItem, {
          onClick: event => {
            const value = props.getItemValue(item);
            handleSelect(value, item);
          }
        }
      );
    });
    const renderedMenu = props.renderMenu({
      renderedItems,
      selectedValue,
      value,
    });
    return React.cloneElement(renderedMenu, {
      onMouseEnter: () => (instanceVars.ignoreBlur = true),
      onMouseLeave: () => (instanceVars.ignoreBlur = false),
    });
  }

  return (
    <div>
      {props.renderInput({
        ref: inputEl,
        ...props.propsForInput,
        value: props.value,
        selectedValue: props.selectedValue,
        onFocus: handleFocus,
        onBlur: handleBlur,
        onChange: handleChange,
      })}
      { open && renderMenu() }
    </div>
  )
});

Autocompleter.defaultProps = {
  propsForInput: {},
  renderInput(props) { return (<input { ...props } />); },
  onChange() {},
  renderMenu({ renderedItems, value}) { return (<div>{ renderedItems }</div>); },
};

Autocompleter.propTypes = {
  items: PropTypes.array.isRequired,
  renderInput: PropTypes.func.isRequired,
  filterItems: PropTypes.func.isRequired,
  renderItem: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  getItemValue: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  renderMenu: PropTypes.func,
  propsForInput: PropTypes.object,
};

export default Autocompleter;
