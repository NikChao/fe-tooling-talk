# Tooling talk

- how many people use React, Typescript, Modern JS features (es6 import, decorators), Reason, Flow, etc.?
  - how many people have used CRA
  - have you noticed this `react-scripts` thing right here?
  - have we dug into it, seen what it does, tried to write our own?
- Let's go back to the foundations of web based applciations
  - index.html index.js styles.css
  - we can do everything we want with these three files
  - what happens if we want to do something like this?
  - `const { log } = require('./log');`
- Introduce bundling
  - The tldr; of bundling is it recursively resolves your imports, and creates a depdency tree of your application. It then puts it all together into one script, so your payloads can stay small, but your app code can still be expressive and modular
  - `browserify index.js -o bundle.js`
  - run the app
  - it does one thing and one thing well!
  - Not only do we want code that we wrote, we may also want some packages right?

- Introduction to package management
  - `yarn` & `npm`
  - you can init a project and you get a package json, where you put scripts, that's actually the first place that these tools look when you run commands
  - yarn commands, are just `node` programs!
  - from inside a `node` project, you can call commands which will be able to reach into `node_modules/bin` and call more programs!
  - so let's try turn this into a project `yarn init`, fill in some details
  - let's also try out this script thing and make
  ```json
  { "scripts": { "build": "browserify index.js -o bundle.js" } }
  ```
  - `yarn build` just works now!
  - let's add some packages, something realistic, like `react` & `react-dom`
  - quick explaination on the "dependencies"/"devDependencies" semantic differnece

- 
  - Let's try write some react
  ```bash
  yarn init && yarn add react react-dom
  ```

  ```js
    const React = require('react');
    const ReactDOM = require('react-dom');

    const element = React.createElement('p', {
      style: { color: 'red' }
    }, 'Hello, React');

    const root = document.querySelector('#root');
  
    ReactDOM.render(element, root);
  ```

  ```bash
  browserify index.js -o bundle.js
  ```

- But noone really writes React like this right??
  - first of all we use `<Jsx />` instead of createElement
  - second of all, we usually use es6 `import` rather than require
  - So let's give this a quick refactor
  
  ```jsx
    import React from 'react';
    import ReactDOM from 'react-dom';

    const root = document.querySelector('#root');

    ReactDOM.render(
      <p style={{ color: 'red' }}>Hello, world</p>,
      root
    );
  ```

  ```bash
  browserify index.js -o bundle.js
  // this now breaks, Parsing error!?
  ```

- So what's going on here?
  - We're using syntax that simply does not work in a browser by default
  - We're using key words we don't even know about 😱
  - What do we do!?

- Introducing Transpilation
  - shimming/polyfilling & transpilation/code-mod
  - Generating an AST of your code and changing your code into something tha t may be more platform appropriate, i.e. a browser
  - Like babel? Yes. like babel.

- Before we actually play with this let's have a look at webpack!
  - So we were doing bundling before this, but browserify was expecting each file to be parseable, pretty much vanilla JS
  - We're going to need something a little bit more modular than this, something which lets us pass files into our own plugins that can do the parsing
  - Weback solves this problem!
  - Loaders -> babel-loader
  - Plugins

- back to transpilation
  - a bit about babel and the babel-loader
  - So babel So we want to be able to do deal with react, so we'll need `@babel/preset-react`
  - Let's go a bit nuts and add a few other things like static class properties, decorators, runtime/env
- Let's write some cool react


- Adding typescript
  - What are the options? Another Loader? Use Babel?!
  - How do we type check, via loader? via forked checker?!
  - For now just to illustrate plugins, and how they're just background

- Adding HMR
  - One thing we've come to love in the last few years is HMR right?
  - at the moment, we use webpack as our main program to run our app
  - let's write a cheeky little node script which serves our bundle using HMR, HDR
  - let's put this in a `run.js` file
  - Let's change 

- Tidy up a little bit
  - Let's put all of this `non-app` code into a folder and call it scripts 😉
  - Now you remember how we said that yarn scripts are just a program which can look in `node_modules/bin`
  - Let's pull this webpack config out into our own package, and why don't we publish it! `@uqcs/react-scripts-demo` `{ "bin": { "uq-scripts": "run.js" } }`
  - yarn add -D `@uqcs/react-scripts/demo` into the old project
  - `{ "scripts": { "start": "uq-scripts main.js" } }`
  - 🎉 🍾 🎉



- Summary

Now, our setup here is pretty simple, but still quite powerful, and extensible, and now we know exactly what's going on! However learning about tooling doesn't stop here, there are plenty more tools for optimisation, linting, auto formatting, code-modding, etc. that I haven't covered that are used at scale:

- Static tools:
  - eslint & prettier

- Optimisations:
  - uglify/terser
  - tree shaking
  - code-splitting

- Testing!!

I don't recommend that you take the small tool we've built today and try to use it, or, extend it, the take home here is that you should build your own, and understand what the pieces are doing. This will give you the power to improve the developer experience of any team you're a part of, by either picking a tool that's right for that problem, or building your own if you can't find one.
