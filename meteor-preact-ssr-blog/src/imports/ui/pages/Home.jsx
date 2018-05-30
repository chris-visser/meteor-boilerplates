import { h, Component } from 'preact';
import { Meteor } from 'meteor/meteor';

import Article from '../components/Article';

export default class Home extends Component {
  state = {
    articles: []
  };

  componentDidMount() {
    Meteor.call('getArticles', 10, (error, articles) => {
      if (error) {
        console.log(error);
        this.setState({ error });
      } else {
        this.setState({ articles })
      }
    });
  }

  render() {
    const { articles } = this.state;
    return (
      <div id="home-page" className="page">
        <h1>Welcome</h1>
        <section className="articles">
          {articles.map(article => <Article key={article.id} {...article} />)}
        </section>
      </div>

    );
  }
}
