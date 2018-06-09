import { h } from 'preact';

import Seo from '../components/Seo';
import Article from '../components/Article';

export default ({ context }) => {


  return (
    <main className="page">

      <Seo />

      <header id="page-heading">
        <h1 id="page-title">Skills & Expertises</h1>
      </header>

      <section id="page-body" className="grid">
        <div className="item-1">Item 1</div>
        <div className="item-2">Item 2</div>
        <div className="item-3">Item 3</div>
        <div className="item-4">Item 4</div>
        <div className="item-5">Item 5</div>
        <div className="item-6">Item 6</div>
      </section>

    </main>
  );
};