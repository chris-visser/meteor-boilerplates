# Meteor React and SSR
This boilerplate is build with Meteor and React. It serves as an example to illustrate how to hydrate 
Clientside React components using EJSON to prevent rich content types like Dates from getting lost.

Here's the [guide on how this boilerplate was created](https://www.chrisvisser.io/meteor/meteor-react-with-ssr-hydrating-initial-state-with-ejson)

## Getting started (development)
Navigate to the Meteor project
```
cd src
```
Install dependencies
```
npm install
```

Start the Meteor app in development mode

```
npm start
```

## Note on the 'src' folder
The file structure contains a `src` folder. This is where all 
Meteor and React code should be placed. Anything outside of the src 
folder is considered, documentation, build scripts or anything that 
is not part of the core application.