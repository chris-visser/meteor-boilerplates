import { h, Component } from 'preact';

import ArticleIntro from './ArticleIntro';

export default class Articles extends Component {
  render() {
    const articles = this.props.articles.filter(article => !article.isPage);

    return (
      <div id="articles-list">
        {articles.map(article => <ArticleIntro key={article.id}{...article} />)}
      </div>
    )
  }
}