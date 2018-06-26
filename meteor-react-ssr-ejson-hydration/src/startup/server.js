import React from 'react';
import { renderToNodeStream } from 'react-dom/server';
import { onPageLoad } from 'meteor/server-render';
import { EJSON } from 'meteor/ejson';

import App from '../ui/App.jsx';

onPageLoad(sink => {
  const initialState = {
    siteMeta: {
      owner: 'Chris Visser',
      version: '0.3.8',
      publishedAt: new Date('2018-05-10'),
    }
  };

  sink.renderIntoElementById('app', renderToNodeStream(
    <App location={sink.request.url} initialState={initialState}/>
  ));

  sink.appendToBody(`
    <script id="preloaded-state">
      window.__PRELOADED_STATE__ = ${EJSON.stringify(initialState)}
    </script>
  `)
});