# Tooling talk

1. how many people use React, Typescript, Modern JS features (es6 import, decorators), Reason, Flow, etc.?
  1. how many people have used CRA
  2. have you noticed this `react-scripts` thing right here?
  3. have we dug into it, seen what it does, tried to write our own?
2. Let's go back to the foundations of web based applciations
  1. index.html index.js styles.css
  2. we can do everything we want with these three files
  3. what happens if we want to do something like this?
  4. `const { log } = require('./log');`
4. Introduce bundling
  0. The tldr; of bundling is it recursively resolves your imports, and creates a depdency tree of your application. It then puts it all together into one script, so your payloads can stay small, but your app code can still be expressive and modular
  1. `browserify index.js -o bundle.js`
  2. run the app
  3. it does one thing and one thing well!
  4. Not only do we want code that we wrote, we may also want some packages right?

5. Introduction to package management
  1. `yarn` & `npm`
  2. you can init a project and you get a package json, where you put scripts, that's actually the first place that these tools look when you run commands
  3. yarn commands, are just `node` programs!
  4. from inside a `node` project, you can call commands which will be able to reach into `node_modules/bin` and call more programs!
  5. so let's try turn this into a project `yarn init`, fill in some details
  6. let's also try out this script thing and make
  ```json
  { "scripts": { "build": "browserify index.js -o bundle.js" } }
  ```
  7. `yarn build` just works now!
  8. let's add some packages, something realistic, like `react` & `react-dom`
  9. quick explaination on the "dependencies"/"devDependencies" semantic differnece

6. 
  5. Let's try write some react
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

7. But noone really writes React like this right??
  1. first of all we use `<Jsx />` instead of createElement
  2. second of all, we usually use es6 `import` rather than require
  3. So let's give this a quick refactor
  
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

8. So what's going on here?
  1. We're using syntax that simply does not work in a browser by default
  2. We're using key words we don't even know about 😱
  3. What do we do!?

9. Introducing Transpilation
  1. shimming/polyfilling & transpilation/code-mod
  2. Generating an AST of your code and changing your code into something tha t may be more platform appropriate, i.e. a browser
  3. Like babel? Yes. like babel.

10. Before we actually play with this let's have a look at webpack!
  1. So we were doing bundling before this, but browserify was expecting each file to be parseable, pretty much vanilla JS
  2. We're going to need something a little bit more modular than this, something which lets us pass files into our own plugins that can do the parsing
  3. Weback solves this problem!
  4. Loaders -> babel-loader
  5. Plugins

11. back to transpilation
  1. a bit about babel and the babel-loader
  2. So babel So we want to be able to do deal with react, so we'll need `@babel/preset-react`
  3. Let's go a bit nuts and add a few other things like static class properties, decorators, runtime/env
  4. Let's write some cool react


12. Adding typescript
  1. What are the options? Another Loader? Use Babel?!
  2. How do we type check, via loader? via forked checker?!
  3. For now just to illustrate plugins, and how they're just background

13. Adding HMR
  1. One thing we've come to love in the last few years is HMR right?
  2. at the moment, we use webpack as our main program to run our app
  3. let's write a cheeky little node script which serves our bundle using HMR, HDR
  4. let's put this in a `run.js` file
  5. Let's change 

14. Tidy up a little bit
  1. Let's put all of this `non-app` code into a folder and call it scripts 😉
  2. Now you remember how we said that yarn scripts are just a program which can look in `node_modules/bin`
  3. Let's pull this webpack config out into our own package, and why don't we publish it! `@uqcs/react-scripts-demo` `{ "bin": { "uq-scripts": "run.js" } }`
  4. yarn add -D `@uqcs/react-scripts/demo` into the old project
  5. `{ "scripts": { "start": "uq-scripts main.js" } }`
  6. 🎉 🍾 🎉



15. Summary

Now, our setup here is pretty simple, but still quite powerful, and extensible, and now we know exactly what's going on! However learning about tooling doesn't stop here, there are plenty more tools for optimisation, linting, auto formatting, code-modding, etc. that I haven't covered that are used at scale:

1. Static tools:
  1. eslint & prettier

2. Optimisations:
  1. uglify/terser
  2. tree shaking
  3. code-splitting

3. Testing!!

I don't recommend that you take the small tool we've built today and try to use it, or, extend it, the take home here is that you should build your own, and understand what the pieces are doing. This will give you the power to improve the developer experience of any team you're a part of, by either picking a tool that's right for that problem, or building your own if you can't find one.
