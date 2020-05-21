import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

let ignoreBlur = false;
let blurOnNextRender = false;

const  keyHandlers = {
    ArrowDown({ event, props, hilightIndex, setOpen, setHilightIndex, open }) {
      event.preventDefault();
      const items = props.filterItems(props.items, props.value);
      if (!items.length) {
        return
      }
      let index = hilightIndex === null ? -1 : hilightIndex;
      const p = (index + 1) % items.length
      index = p
      if (index > -1 && index !== hilightIndex) {
        setOpen(true);
        setHilightIndex(index);
      }
    },

    ArrowUp({ event, props, hilightIndex, setOpen, setHilightIndex, open }) {
      event.preventDefault()
      const items = props.filterItems(props.items, props.value);
      if (!items.length) {
        return;
      }
      let index = hilightIndex === null ? items.length : hilightIndex
      const p = (index - 1 + items.length) % items.length;
      index = p
      if (index !== items.length) {
        setOpen(true);
        setHilightIndex(index);
      }
    },

    Enter({ event, props, hilightIndex, setOpen, setHilightIndex, open, inputEl, blurInputOnNextRender}) {
      if (event.keyCode !== 13) {
        return
      }
      ignoreBlur = false;
      if (!open) {
        return;
      } else if (hilightIndex == null) {
        setOpen(false);
      } else {
        event.preventDefault();
        const item =  props.filterItems(props.items, props.value)[hilightIndex];
        const value = props.getItemValue(item);
        props.onSelect(value, item);
        setOpen(false);
        setHilightIndex(null)
        blurInputOnNextRender()
      }
    },

    Escape({ setOpen, setHilightIndex }) {
      ignoreBlur = false;
      setOpen(false);
      setHilightIndex(null);
    },

    Tab() {
      ignoreBlur = false;
    }
  }

const Autocompleter = React.memo(({ className = '', ...props}) => {
  const inputEl = useRef(null);
  const [open, setOpen] = useState(false);
  const [hilightIndex, setHilightIndex] = useState(null);

  useEffect(() => {
    if (blurOnNextRender) {
      blurOnNextRender = false;
      inputEl.current && inputEl.current.blur();
    }
  });

  const handleFocus = event => {
    setOpen(true);
  };

  const handleBlur = event => {
    if (ignoreBlur) {
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

  const handleKeyDown = event => {
    const handler = keyHandlers[event.key];
    if (typeof handler === 'function') {
      handler({
        event,
        props,
        hilightIndex,
        setOpen,
        setHilightIndex,
        open,
        inputEl,
        blurInputOnNextRender: () => {
          blurOnNextRender = true;
        }
      });
    }
  };

  const renderMenu = () => {
    const renderedItems = props.filterItems(props.items, props.value)
      .map((item, index) => {
        const renderedItem = props.renderItem(item, hilightIndex === index);
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
      value: props.value
    });

    return React.cloneElement(renderedMenu, {
      onMouseEnter: () => (ignoreBlur = true),
      onMouseLeave: () => (ignoreBlur = false),
    });
  }
  return (
    <div className={`autocompleter-root ${className}`}>
      {props.renderInput({
        ref: inputEl,
        ...props.propsForInput,
        value: props.value,
        onFocus: handleFocus,
        onBlur: handleBlur,
        onChange: handleChange,
        onKeyDown: handleKeyDown,
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
