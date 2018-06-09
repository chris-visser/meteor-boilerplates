import { Meteor } from 'meteor/meteor';
import { h, render } from 'preact';
import { onPageLoad } from 'meteor/server-render';

import App from '../ui/App.jsx';


onPageLoad(async sink => {
  const root = document.getElementById("app");

  Meteor.call('getArticles', (error, articles) => {
    const context = {
      isServer: false,
      articles,
    };

    render(<App context={context} />, root.parentElement, root);
  });
});