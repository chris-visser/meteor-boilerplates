import { h, render } from 'preact';
import { onPageLoad } from 'meteor/server-render';

import App from '../ui/App.jsx';

onPageLoad(async sink => {
  const root = document.getElementById("app");
  render(<App />, root.parentElement, root);
});