My goal is to provide you with a great starting point to build any SEO friendly website. If you are looking for a more complete boilerplate then have a look at my [Meteor Boilerplates repository](https://github.com/Redroest/meteor-boilerplates).

Don't need guidance and just want the code? Here's the [resulting boilerplate](https://github.com/Redroest/meteor-boilerplates/tree/master/meteor-react-ssr-bare-setup). Use it for anything you want! 

## SSR is not only about SEO
SEO friendly websites have a couple of things in common. They are at least Serverside Rendered. This allows Search engine crawlers to easily index it. Though a [some of people state that SSR is less important](https://medium.freecodecamp.org/seo-vs-react-is-it-neccessary-to-render-react-pages-in-the-backend-74ce5015c0c9), its still recommended. In any case its always better to be on the save side. Besides that, SSR is not only about SEO. Its also about user experience. SSR applications are generally able to load faster, because there is no need to download the javascript first. As soon as the HTML is in, it can be displayed. 

## Optimized for Meteor 1.7.0.1
Meteor's version is at 1.7. This means that we can finally get rid of the 'imports' directory. We are going to follow their best practices, with maybe some small tweaks to take into account the SSR part of our app.

## Recommended setup for a Meteor project
Meteor provides an excellent example of a file structure. It matches most cases so why change it? However, there's some stuff missing. Production worthy apps have so called Continuous Intergration (CI) and Continuous Deployment (CD) code. This is code that automates the tests and deployment of our project. 

CI & CD code (although very important) is 'not' part of the actual application. In fact it will never actually run on any production server. Only in test environments. Therefore its wise to keep that code separate, but still part of your repository! 

For now we will not 'yet' focus on this code, but lets take it into account in the planning of our file structure... Lets create the project folder first:

```
mkdir boilerplate && cd boilerplate
```

### Initialize Meteor in a 'src' folder
First make sure that you are using the latest version of Meteor by issuing the update command. Running it outside of any Meteor project will update your local copy of Meteor. From then on any new project will use Meteor's latest version. Simply run:
```
meteor update
```

On creation we take into account that our source code is in a different place then any CI & CD code. In our case we are going use a source folder called `src` (common naming practice) and put our Meteor application in it. We also use the `--bare` option in our command to specify that we require the minimum setup.

```
meteor create src --bare
```

### Creating the recommended folders
In our source folder we are going to just follow Meteor's default file structure as explained in this guide about the recommended [Meteor File Structure](https://guide.meteor.com/structure.html#javascript-structure). However, we do take into account that the imports folder is not needed anymore!

```
cd src && mkdir ui api startup
```

### Tweak the package.json to become 'your' project
Change project name to be the name of your project. In my case that would be along the lines of: `react-ssr-boilerplate`.

We don't want NPM to complain about a license field so lets add the that field. Use `"license" "MIT"` for open source projects. For private / closed source projects use `"license": "UNLICENSED"`. If you are going to put the project open to the world, then also remove the `"private": true` line.

## Install React and its dependencies
With Meteor you don't need to worry about any Babel or Webpack configurations. It's all done for you and its exactly where Meteor shines. We simply need to install the React dependencies to make it work!

Make sure that you are still in the `src` folder with your command line. Then use Meteor's node version to install any modules. This ensures that the right version of Node will be used to install the packages.

```
meteor npm install react react-dom
```

#### Install the server-render package for Meteor
Meteor's [server-render](https://atmospherejs.com/meteor/server-render) package is going to do the SSR part for our React blog. Its going to operate as the equivalent of an express route or cloud function. Read more about [Meteor's server-render package in the Meteor docs](https://docs.meteor.com/packages/server-render.html).

We also need to add the [static-html](https://atmospherejs.com/meteor/static-html) package to make meteor load any static HTML files. We need this to render our React app into an html document later on.

```
meteor add server-render static-html
```

## Creating the entry points
Since Meteor 1.7 we are now able to specify which files are loaded first. In our case we need 2 files. One to load the serverside application and the other to load the clientside.

Lets create 2 files into the ./startup folder: `server.js` and `client.js`. Like the files indicate, one is loaded on the server and the other on the client. 

Now we need to load these files on startup, to do this we simply need to reference them in our package.json as explained in this recent [Meteor 1.7 article](https://blog.meteor.com/meteor-1-7-and-the-evergreen-dream-a8c1270b0901): 

```json
  "meteor": {
    "mainModule": {
      "client": "startup/client.js",
      "server": "startup/server.js"
    }
  }
```

### Build a very basic React 'App' component
We need a very basic React App component. For now it will simply contain a bit of text. We can use this component on the next few steps to check if our React app is working as expected.
*./ui/App.jsx*

```
import React from 'react';

export default () => <h1>Its working!</h1>;
```

### Creating a static html document
The static html document will be eagerly loaded as explain before by the 'static-html' package. The server and client side will use it to attach our React app to the DOM. 

Note that Meteor takes care of putting the doctype and html root tag in our app. So we simply need the head and body tag like below:

*./startup/document.html*
```
<head>
  <meta charset="UTF-8">
</head>

<body>
  <div id="app"></div>
</body>
```

### Implementing React Server Side rendering in Meteor
The Meteor documentation provides some guidance on how to load React from the serverside. 

*./startup/server.js*
```javascript
import React from 'react';
import { renderToNodeStream } from 'react-dom/server';
import { onPageLoad } from 'meteor/server-render';

import App from '../ui/App.jsx';

onPageLoad(sink => {
  sink.renderIntoElementById('app', renderToNodeStream(
    <App location={sink.request.url} />
  ));
});
```

Note that this is a slightly different snippet then the one from the docs. We are simply referencing an App.jsx in the ui folder of the imports directory to keep it simple for now. 

We are also using React's `renderToNodeStream`. This decreases the Time To First Bytes (TTFB), because React already starts sending content (in the form of a NodeJS Stream) while its still rendering stuff.

Next, the client.js file. Same here, we reference the App.jsx file:

*./startup/client.js*

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { onPageLoad } from 'meteor/server-render';

onPageLoad(async sink => {
  const App = (await import('../ui/App.jsx')).default;
  ReactDOM.hydrate(
    <App />,
    document.getElementById('app')
  );
});
```

The above code uses a principal called hydration. Hydration is a way for (in this case) React to re-use the serverside rendered HTML. It simply attaches event listeners etc to existing DOM elements instead of building a completely new Clientside version (like a Clientside only app typically does). This reduces the initial load time of the app significantly.

## Test your application!
You should now be able to start your application with the below command (make sure you are in the `src` folder:

```
meteor
```

If you open your browser on http://localhost:3000, it should show you a big: "Its working!". Also right click in the page and click "View source". This source should contain `<h1>Its working</h1>`. This indicates that the SSR is also working correctly. 

## Next article
In my next article I will explain on how to include 'polymorphic' React routing. This means routing on both the Serverside and Clientside.   