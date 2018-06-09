import { h, Component } from 'preact';
import Helmet from "preact-helmet";

import Seo from '../components/Seo';
import NotFound from '../components/NotFound';
import Article from '../components/Article';
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
    const { context, matches } = this.props;
    const { articles } = context;

    const article = articles.find(article => article.slug === matches.slug);

    return (
      <article className="page">
        {article && <Seo
          title={article.title}
          meta={[
            {
              name: "description",
              content: article.intro
            },
            { property: "og:type", content: "article" }
          ]}
        />}

        <section id="page-body">
          {article ? <Article {...article} /> : <NotFound context={context} />}
        </section>

        <div id="page-aside">
          <AboutBlock />
          <RelatedArticlesBlock />
        </div>
      </article>

    );
  }
}
