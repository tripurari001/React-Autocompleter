import React from 'react';
import ReactDOM from 'react-dom';
import Autocompleter from './App';
import {Grid} from '@material-ui/core';
import './index.css';

const Examples = React.memo(props => {
  return (
    <Grid container spacing={5}>
      <Grid item xs={4}>
        <Autocompleter multiSelect items={['option 1', 'option 2', 'option 3', 'option 4', 'option 5', 'option 6']} />
      </Grid>
      <Grid item xs={4}>
        <Autocompleter items={['option 1', 'option 2', 'option 3', 'option 4', 'option 5', 'option 6']} />
      </Grid>
      <Grid item xs={4}>
        <Autocompleter />
      </Grid>
    </Grid>
  );
});

ReactDOM.render(
  <React.StrictMode>
    <Examples />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
