import { h } from 'preact';
import { Link } from 'preact-router/match';

export default ({ children }) => (
  <div className="container">
    <div id="topbar">
      <nav id="main-navigation">
        <Link href="/" className="main-navigation-link">Home</Link>
        <Link href="/about" className="main-navigation-link">About</Link>
        <Link href="/skills" className="main-navigation-link">Skills</Link>
      </nav>
    </div>
    {children}
  </div>
)