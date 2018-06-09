import { HTTP } from 'meteor/http';
import marked from 'marked';
import { highlightAuto } from 'highlight.js';

marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function (code) {
    return highlightAuto(code).value;
  },
  pedantic: false,
  gfm: true,
  tables: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: true
});



export const articles = [{
  id: 'article-1',
  title: 'How to set up Meteor & React with SSR',
  slug: 'how-to-set-up-meteor-react-with-ssr',
  intro: 'It might have been difficult with Meteor in the past. Serverside Rendering (SSR). Times have changed however. Modern libraries like React and Vue have made their entrance. Thanks to React and Vue its now actually quite easy to build an SSR application in Meteor! I will explain it to you in some easy to follow steps.',
  url: 'https://s3-eu-west-1.amazonaws.com/cloudspider.io/articles/how-to-set-up-meteor-react-with-ssr.md',
  createdAt: new Date('2018-05-29 11:00:00'),
  publishedAt: new Date('2018-05-30 12:00:00'),
  tags: ['meteor', 'ssr', 'react', 'guide', 'boilerplate'],
  author: {
    id: 'chris-visser',
    name: 'Chris Visser',
  }
}, {
  id: 'article-2',
  title: 'Meteor SEO with SSR and Preact in a few easy steps.',
  slug: 'meteor-seo-with-ssr-and-preact-in-a-few-easy-steps',
  intro: 'A clear and concise guide with some easy steps on how to easily set up a very fast, small, SSR and SEO optimized blog using Meteor and Preact.',
  url: 'https://s3-eu-west-1.amazonaws.com/cloudspider.io/articles/meteor-seo-with-ssr-and-preact-in-a-few-easy-steps.md',
  createdAt: new Date('2018-06-01 11:00:00'),
  publishedAt: new Date('2018-06-02 12:00:00'),
  tags: ['meteor', 'ssr', 'seo', 'preact', 'guide', 'boilerplate', 'blog'],
  author: {
    id: 'chris-visser',
    name: 'Chris Visser',
  }
}, {
  id: 'article-3',
  title: 'Chris Visser - Cloudspider',
  slug: 'about',
  intro: '',
  url: 'https://s3-eu-west-1.amazonaws.com/cloudspider.io/articles/about.md',
  createdAt: new Date('2018-06-02 11:00:00'),
  publishedAt: new Date('2018-06-03 12:00:00'),
  isPage: true,
  tags: ['chris visser', 'about', 'full-stack', 'developer', 'javascript', 'meteor', 'react'],
  author: {
    id: 'chris-visser',
    name: 'Chris Visser',
  }
}];

console.log('Extending article documents with markdown content from s3.');
const articlesWithMarkdown = articles.map(doc => ({
  ...doc,
  body: marked(Assets.getText(`articles/${doc.slug}.md`)),
}));

export default articlesWithMarkdown;
