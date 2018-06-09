This boilerplate represents a very simple blog build 
with Meteor and Preact. A couple of best practices are taken 
into account. Including SSR and Code Splitting (on page level)

With this boilerplate I want to prove just how simple it is to create 
any website with Meteor. 

Bundle size: 103kb!

## Setting up the boilerplate

As documented in previous tutorial about setting up a 
Meteor Preact project

## Using Babel to transform jsx into h() calls
According to the Preact documentation there are a number of 
ways to do this. In this case I've chosen the Babel way.

```
meteor npm install --save-dev @babel/core @babel/plugin-transform-react-jsx
```
Add a .babelrc file in ./src:

*./src/.babelrc*
```json
{
  "plugins": [
    ["transform-react-jsx", { "pragma":"h" }]
  ]
}
```

## Adding route functionality

### Install the needed packages
```
meteor npm install --save preact-router
```

### Create 2 simple page components
The home page will contain some state later on, so lets 
make that one a class:

#### The home page
This page will contain our posts eventually so we want this to be a stateful component
*./imports/ui/pages/Home.jsx*
```javascript
import { h, Component } from 'preact';

export default class Home extends Component {
  render() {
    return (
      <h1>Blog home!</h1>
    );
  }
}
```
#### The about page
Just a simple stateless component. 
Its just going to have some static content for now

*./imports/ui/pages/About.jsx*
```javascript
import { h } from 'preact';

export default () => <h1>About me!</h1>;
```
### A basic preact-router implementation
Note that this (in contrast to React Router 4) will also work on the server!
This means that we simply need to follow their docs and put it in our App.jsx:

*./imports/ui/App.jsx*
```javascript
import { h, Component } from 'preact';
import Router from 'preact-router';

import Layout from './Layout.jsx';

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Home path="/" />
          <About path="/about" />
        </Router>
      </div>
    )
  }
}
```

## Create a basic layout
The layout will be referenced from our App.jsx. This is where we will create  
our blog layout. For now lets add a simple component to represent a very basic navigation

*./imports/ui/Layout.jsx*
```javascript
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
```

## Adding the layout to our App
```javascript
import { h, Component } from 'preact';

import Layout from './Layout.jsx';

export default class App extends Component {
  render() {

    return (
      <Layout>
        <Router>
          <Home path="/" />
          <About path="/about" />
        </Router>
      </Layout>
    )
  }
}
```

Now lets start the app and check out the result. You might have already noticed a glitch by now. 
When you navigate to /about and press ctrl + f5 to refresh the page without cache. 
It will first load the Home page and then quickly switch to the /about page.

This happens because the serverside router is not aware yet of the current url
so it will load the home page. 

### Fixing the serverside router
We somehow need to pass the current client url to the App.jsx 
where the Router is located. 

In the previous tutorial I pushed Meteor's sink request url to the App.jsx.
and this piece of code is actually responsible for pushing that url already!
Below is the `./imports/startup/server.js`

```javascript
onPageLoad(sink => {

  sink.renderIntoElementById('app', render(
    <App location={sink.request.url} /> // passing url prop
  ));
});
```

The only thing we need to do is to put that url into our Router and heres how 
you do it:

*./imports/ui/App.jsx*

```javascript
import { h, Component } from 'preact';

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
          <Home path="/" />
          <About path="/about" />
        </Router>
      </Layout>
    )
  }
}
```

The above extension of our App.jsx code uses the location property 
as given from Meteor sink's url property and provides the path parameter 
to the serverside router in the form of a simple history object.

If no location is given, we must be on the clientside so no history object needed.

## Applying basic styles 

