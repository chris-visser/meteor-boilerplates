import { h, Component } from 'preact';
import Router from 'preact-router';
import AsyncRoute from 'preact-async-route';

import Layout from './Layout.jsx';

export default class App extends Component {
  render() {
    const { location } = this.props;

    const customHistory = location ? {
      getCurrentLocation: () => location.path,
    } : undefined;

    return (
      <Layout>
        <Router history={customHistory}>

          <AsyncRoute
            path="/"
            getComponent={() => import('./pages/Home').then(module => module.default)}
          />
          <AsyncRoute
            path="/about"
            getComponent={() => import('./pages/About').then(module => module.default)}
          />

        </Router>
      </Layout>
    )
  }
}