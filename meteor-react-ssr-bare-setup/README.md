## Preparing the project
Before we dive into specific implementations, its good to have some 
best practices in place when it comes to project setup. 
Meteor has a great guide already on how to make a workable 
and maintainable project structure. I'm simply following that guide 
but provide some additional considerations and solutions in the process

### Setup Meteor with basic file structure

```
mkdir blog && cd blog
```

#### Init meteor in src folder
```
meteor create src
```

#### Create required folders

```
cd src && mkdir imports && cd imports && mkdir ui api startup && cd ../
```

#### Change edit package.json

Change project name to be `cloudspider-blog`

Add license to MIT for open  
or UNLICENSED for closed source projects

#### Install node_modules
We are going to add other dependencies later on. First we want to see 
if the default Meteor installation was successful. In order to check it 
we first need to install its required node modules. So lets run:
```
meteor npm install
```
This will install the @babel/runtime package and some node stubs 
for meteor.

#### Configure webstorm
Now we need to start Meteor. But lets leverage our IDE to handle this 
for us. 

##### Configure the start script

Goto `Run` -> `Edit configurations`
Click the plus sign
Select NPM
- Now enter the project name (mine is just 'blog')
- On the line of package.json, click on the right 
side on the button (marked with 3 dots). Select 
the package.json in the src folder
- On the scripts line select 'start'
- Now click "apply" and "Ok" to close the window
- On the right top of the IDE press the green 'play' button
This should start Meteor for you and after startup it will 
be available on `http://localhost:3000`
- Open your browser to see if Meteor works as expected
- You should see a test app with a button

Note that this test app is based on Blaze. Meteor's initial and default 
templating language. We want to use React, but lets first prepare our IDE 
a bit before we switch template language

##### Configure language version
Now if you would open one of the javascript files 
you'll notice that there are a lot of errors given 
This is because Webstorm's default configuration checks our code based 
on an old Javascript version. We need to configure the IDE to understand 
Ecmascript and JSX code.

GOTO File -> Settings -> Languages & Frameworks -> Javascript
Set Javascript language version to React JSX (es 6)


### Switching to React and Include SSR
We now have a running app. But we want to switch to React. Since we are 
building a Blog, we do want to have Server side rendering. So lets take 
that into account as-well. 

#### Remove unwanted Meteor packages.
The default is always to remove autopublish and insecure.
We are also going to remove 2 Meteor packages that are used when you 
use Blaze, but not when you use React.

```
meteor remove autopublish insecure blaze-html-templates reactive-var
```

#### Install React modules
```
meteor npm install react react-dom
```

#### Install the server-render package for Meteor
This package is going to do the SSR part for our React blog
```
meteor add server-render
```
We also need to add static-html to make meteor load static HTML files
We need this to render our React app into an html document later on.

```
meteor add static-html
```

#### Creating startup files for client and server
Create 2 files into the imports/startup folder: 
`server.js` and `client.js`. Like the files indicate. One is loaded on 
the server and the other on the client. 

Now we need to load these files on startup, to do this we simply need 
to reference them. Remove any boilerplate code in client/main.js and 
replace it with the below line:
```javascript
import '../imports/startup/client';
```
Do exactly the same on server/main.js, but reference the server.js file 
instead:
```javascript
import '../imports/startup/server';
```

#### Server Side loading using server-render
Here are the official Meteor docs on SSR: 
https://docs.meteor.com/packages/server-render.html We are simply 
basing it on Meteor's documentation. 

Create a server.js file in `src/imports/startup` and 
put the following code stuff in it:

*imports/startup/server.js*
```javascript
import React from 'react';
import { renderToString } from 'react-dom/server';
import { onPageLoad } from 'meteor/server-render';

import App from '../ui/App.jsx';

onPageLoad(sink => {
  sink.renderIntoElementById('app', renderToString(
    <App location={sink.request.url} />
  ));
});
```
Note that this is a slightly different snippet then the one from the docs
we are referencing an App.jsx in the ui folder of the imports directory. 
it becomes clear later on why we do this.

Next, the client.js file. Same here, we reference the App.jsx file:

*imports/startup/client.js*

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

The only thing left for us todo here is to implement the App.jsx. This 
is going to be our app's entry point. For not its just going to be a 
simple "Hello World" title

*imports/ui/App.jsx*
```javascript
import React, { Component } from 'react';

export default class App extends Component {
  render() {
    return (
      <h1>Hello!</h1>
    )
  }
}
```

Note that this is a class and not a function component. 
The reason is that this component is going to be stateful. 

### Finished for now!
You now have a working React App with Serverside Rendering in Meteor.
There's still stuff todo but I will cover that in the follow up about: 
"Meteor + React, Consistency, Code Style and Continuous Refactoring"