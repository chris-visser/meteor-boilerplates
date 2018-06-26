import React from 'react';
import ReactDOM from 'react-dom';
import { onPageLoad } from 'meteor/server-render';
import { EJSON } from 'meteor/ejson';

const initialState = EJSON.parse(JSON.stringify(window.__PRELOADED_STATE__));

onPageLoad(async sink => {
  const App = (await import('../ui/App.jsx')).default;
  ReactDOM.hydrate(
    <App initialState={initialState}/>,
    document.getElementById('app')
  );
});