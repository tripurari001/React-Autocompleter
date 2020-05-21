import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Input, Grid, List, ListItem, ListItemText } from '@material-ui/core';
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

const ExampleMain = React.memo(props => {
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
      renderItem={(item, isHilighted) => (<ListItem selected={isHilighted}><ListItemText>{ item }</ListItemText></ListItem>)}
      getItemValue={item => item}
      onSelect={value => setValue(value)}
      renderInput={props => <Input id="outlined-basic" variant="outlined" { ...props } />}
      renderMenu={({ renderedItems }) => (<List>{ renderedItems }</List>)}
    />
  );
});

ReactDOM.render(
  <React.StrictMode>
    <div style={{
      textAlign: 'center',
      margin: '50px'
    }}>
      <ExampleAutoCompleter />
    </div>
    <div>
      <Grid container justify="center">
        <Grid item xs="auto" style={{
          textAlign: 'center'
        }}>
          <ExampleMain />
        </Grid>
      </Grid>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
