import React from 'react';
import ReactDOM from 'react-dom';
import { onPageLoad } from 'meteor/server-render';

onPageLoad(async sink => {
  const App = (await import('../ui/App.jsx')).default;
  ReactDOM.hydrate(
    <App />,
    document.getElementById('app')
  );
});