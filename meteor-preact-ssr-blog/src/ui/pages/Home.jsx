import { h, Component } from 'preact';

import Seo from '../components/Seo';
import ArticlesList from '../components/ArticlesList';
import AboutBlock from '../components/AboutBlock';
import RelatedArticlesBlock from '../components/RelatedArticlesBlock';

export default class Home extends Component {
  //
  // state = {
  //   articles: [],
  // };
  //
  // componentDidMount() {
  //   Meteor.call('getArticles', (error, articles) => {
  //     error ? console.log(error) : this.setState({ articles })
  //   });
  // }

  render() {
    const { context } = this.props;
    const { articles, rootUrl } = context;
    return (
      <main className="page">

        <Seo />

        <header id="page-heading">
          <h1 id="page-title">Cloudspider.io</h1>
        </header>

        <section id="page-body">
          <ArticlesList articles={articles} />
        </section>

        <div id="page-aside">
          <AboutBlock />
          <RelatedArticlesBlock />
        </div>
      </main>
    );
  }
}
