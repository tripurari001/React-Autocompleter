import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Autocompleter from './App';
import * as serviceWorker from './serviceWorker';

const ExampleAutoCompleter = React.memo(props => {
  const [value, setValue] = useState('');
  return (
    <Autocompleter
      items={[
        'A',
        'AB',
        'Abc',
        'slkjdf',
        'lsdkfj',
      ]}
      value={value}
      onChange={event => setValue(event.target.value)}
      filterItems={(items, value) => items.filter(item => item.toLowerCase().includes(value.toLowerCase()))}
      renderItem={(item, isHilighted) => <div>{item} {isHilighted ? ' hilighted' : ''}</div>}
      getItemValue={item => item}
      onSelect={value => setValue(value)}
    />
  );
});

ReactDOM.render(
  <React.StrictMode>
    <ExampleAutoCompleter />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
