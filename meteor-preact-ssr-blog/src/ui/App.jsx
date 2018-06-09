import { h, Component } from 'preact';
import Router from 'preact-router';
import Helmet from "preact-helmet";

import Layout from './Layout.jsx';

import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import ArticleDetail from './pages/ArticleDetail';

export default class App extends Component {

  getPath = (location) => {
    return location ? location.path : '/';
  };

  render() {
    const { location, context } = this.props;

    const path = this.getPath(location);

    return (
      <Layout>
        <Helmet
          link={[
            { rel: "canonical", href: `${context.rootUrl}${path}` },
          ]}
        />

        <Router url={location ? location.path : undefined} onChange={this.handleRoute}>

          <Home path="/" context={context} />

          <About path="/about" context={context} />
          <Skills path="/skills" context={context} />
          <ArticleDetail path="/:slug" context={context} />
          {/*<AsyncRoute*/}
            {/*path="/"*/}
            {/*getComponent={() => import('./pages/Home').then(module => module.default)}*/}
          {/*/>*/}
          {/*<AsyncRoute*/}
            {/*path="/about"*/}
            {/*getComponent={() => import('./pages/About').then(module => module.default)}*/}
          {/*/>*/}

        </Router>
      </Layout>
    )
  }
}