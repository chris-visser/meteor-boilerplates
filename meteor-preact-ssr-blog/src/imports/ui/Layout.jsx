import { h } from 'preact';
import { Link } from 'preact-router/match';

export default ({ children }) => (
  <div className="container">
    <header>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
      </nav>
    </header>
    {children}
  </div>
)