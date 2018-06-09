import { Meteor } from 'meteor/meteor';
import { h } from 'preact';
import { render } from 'preact-render-to-string';
import { onPageLoad } from 'meteor/server-render';
import Helmet from 'preact-helmet';

import '../api/main';
import App from '../ui/App';

const ROOT_URL = process.env.ROOT_URL;

// console.log('ROOT_URL:', ROOT_URL);
// console.log('MONGO_URL:', process.env.MONGO_URL);

// const pickLanguageFromHeader = headerValue => {
//   if(!headerValue) {
//     return 'en-gb';
//   }
//   const isoCountryCodeRegex = /[a-z]{2}|[a-z]{2}-[A-Z]{2}/;
//   const languages = headerValue.split(/[,;]/).filter(language => isoCountryCodeRegex.test(language));
//   return languages[0];
// };


/**
 * We're pushing the user's locale as en-GB for now (we don't have registered users)
 * We let the client side handle any translations. Therefore on the server we can just
 * push a default value.
 * @todo When translated articles will be added, change this to have the user's preferred
 */
onPageLoad(sink => {
  // Fetch articles without body
  const articles = Meteor.call('getArticles');
  // const language = pickLanguageFromHeader(sink.request.headers['accept-language']);

  const context = {
    isServer: true,
    rootUrl: ROOT_URL || 'http://localhost:3000',
    articles
  };

  const html = render(<App context={context} location={sink.request.url} />);

  const head = Helmet.rewind();

  sink.statusCode = context.statusCode; // Can be set in any component (this case only the NotFound component)

  // sink.responseHeaders = {
  //   Link: `<${ROOT_URL}${context.canonical}>; rel="canonical"`,
  // };

  // NOTE: Below assumes the static-html package to fetch any .html file with a <head> and/or <body> tag.
  // https://atmospherejs.com/meteor/static-html

  sink.appendToHead(head.title.toString());
  sink.appendToHead(head.meta.toString());
  sink.appendToHead(head.link.toString());

  sink.renderIntoElementById('app', html);
});