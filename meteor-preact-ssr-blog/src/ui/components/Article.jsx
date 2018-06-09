import { h } from 'preact';
import { Link } from 'preact-router/match';

const Tags = ({ tags }) => {
  return (
    <ul className="article-tags">
      {tags.map(tag => (
        <li className="article-tag" key={tag}>
          <Link className="tag" href={`tags/${tag}`}>{tag}</Link>
        </li>
      ))}
    </ul>
  )
};

const Body = ({ body }) => (
  <section id="article-body" dangerouslySetInnerHTML={{ __html: body }} />
);

const Meta = ({ author, publishedAt }) => (
  <p className="article-meta">
    Written by <Link href="/about">{author.name}</Link> on{' '}

    <time itemProp="published" dateTime={publishedAt.toLocaleDateString('en-US')}>
      {publishedAt.toLocaleDateString('en-US')}
    </time>
  </p>
);

export default ({ title, tags, intro, body, author, publishedAt, hideHeading }) => {
  return (
    <article className="block">
      {!hideHeading &&
      <header className="block-heading">
        <h1 className="block-title">{title}</h1>
        <p>{intro}</p>
        <Meta author={author} publishedAt={publishedAt} />
      </header>
      }
      <Body body={body} />
      <footer>
        <Meta author={author} publishedAt={publishedAt} />
        <Tags tags={tags} />
      </footer>
    </article>
  )
}