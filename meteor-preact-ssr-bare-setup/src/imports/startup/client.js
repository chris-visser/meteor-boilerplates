import * as React from 'preact';
import { onPageLoad } from 'meteor/server-render';

onPageLoad(async sink => {
  const App = (await import('../ui/App.jsx')).default;

  const root = document.getElementById("app");
  React.render(<App />, root.parentElement, root);
});