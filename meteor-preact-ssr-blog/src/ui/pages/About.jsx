import { h } from 'preact';

import Seo from '../components/Seo';
import Article from '../components/Article';

export default ({ context }) => {

  const article = context.articles.find(article => article.slug === 'about');

  return (
    <main className="page">
      <Seo />

      <header id="page-heading">
        <h1 id="page-title">Chris Visser</h1>
        <p id="page-intro">
          <strong>Senior Fullstack Software Developer</strong>
        </p>
      </header>
      <section id="page-body">
        <Article key={article.id} {...article} hideHeading className="article-intro" />
      </section>
    </main>
  );
};