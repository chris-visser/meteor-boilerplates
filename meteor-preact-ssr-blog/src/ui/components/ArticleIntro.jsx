import { h } from 'preact';
import { Link } from 'preact-router/match';

export default ({ title, slug, intro, author, publishedAt }) => {
  return (
    <article className="block">
      <header>
        <h2 className="block-title">
          <Link href={`/${slug}`}>{title}</Link>
        </h2>
        <p>{intro}</p>
      </header>
      <footer>
        <p className="article-meta">
          Written by <Link href="/about">{author.name}</Link> on{' '}

          <time itemProp="published" dateTime={publishedAt.toLocaleDateString('en-US')}>
            {publishedAt.toLocaleDateString('en-US')}
          </time>
        </p>
      </footer>
    </article>
  )
}