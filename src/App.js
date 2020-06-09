import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Input, Chip, List, ListItem, ListItemText } from '@material-ui/core';
import Dropdown from './dropdown';

const MultiSelect = React.memo(props => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const onChange = (event, value) => {
    setInputValue(value);
  };
  const onSelect = (value, item) => {
    if (selectedItems.includes(value)) {
      setSelectedItems(selectedItems.filter(item => item !== value));
    }
    setSelectedItems([...selectedItems, value]);
  };
  const onSelectedItemClick = value => {
    setSelectedItems(selectedItems.filter(item => item !== value));
  };
  const renderInput = (inputProps) => {
    return props.renderInput(inputProps, onSelectedItemClick);
  };

  return (
    <Dropdown
      value={inputValue}
      selectedValue={selectedItems}
      onChange={onChange}
      onSelect={onSelect}
      {...props}
      renderInput={renderInput}
    />
  );
});

const SingleSelect = React.memo(props => {
  const [value, setValue] = useState('');
  const onChange = (event, value) => {
    setValue(value);
  };
  const onSelect = (value, item) => {
    setValue(value);
  };

  return (
    <Dropdown
      value={value}
      onChange={onChange}
      onSelect={onSelect}
      {...props}
    />
  );
});

SingleSelect.propTypes = {
  items: PropTypes.array.isRequired,
  renderInput: PropTypes.func.isRequired,
  filterItems: PropTypes.func.isRequired,
  renderItem: PropTypes.func.isRequired,
  getItemValue: PropTypes.func.isRequired,
  renderMenu: PropTypes.func,
}

MultiSelect.propTypes = {
  items: PropTypes.array.isRequired,
  renderInput: PropTypes.func.isRequired,
  filterItems: PropTypes.func.isRequired,
  renderItem: PropTypes.func.isRequired,
  getItemValue: PropTypes.func.isRequired,
  renderMenu: PropTypes.func,
};

SingleSelect.defaultProps = {
  items: [],
  filterItems: (items, value) => {
    return items.filter(item => item.toLowerCase().includes(value.toLowerCase()))
  },
  renderMenu: ({ renderedItems }) => <List>{renderedItems}</List>,
  renderInput: ({selectedValue, ...props}) => <Input variant="outlined" {...props} />,
  renderItem: (item, isHilighted) => {
    return (
      <ListItem selected={isHilighted}>
        <ListItemText>{item}</ListItemText>
      </ListItem>
    );
  },
  getItemValue: item => item
};

MultiSelect.defaultProps = {
  items: [],
  filterItems: (items, value, selectedValue) => {
    return items
      .filter(item => !selectedValue.includes(item.toLowerCase()))
      .filter(item => item.toLowerCase().includes(value.toLowerCase()))
  },
  renderMenu: ({ renderedItems }) => <List>{renderedItems}</List>,
  renderInput: ({ selectedValue, ...props }, handleClick) => {
    return (
      <>
        <Input {...props} variant="outlined" />
        {
          selectedValue.map(item => (
            <Chip
              label={item}
              onDelete={() => handleClick(item)}
              variant="outlined"
            />
          ))
        }
      </>
  )
  },
  renderItem: (item, isHilighted) => {
    return (
      <ListItem selected={isHilighted}>
        <ListItemText>{item}</ListItemText>
      </ListItem>
    );
  },
  getItemValue: item => item
};


export default React.memo(({multiSelect, ...props}) => {
  if (multiSelect) {
    return <MultiSelect {...props} />
  } else {
    return <SingleSelect {...props} />
  }
})
