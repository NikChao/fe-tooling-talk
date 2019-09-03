import React from 'react';
import ReactDOM from 'react-dom';
import Header from './header';
const root = document.querySelector('#root');

ReactDOM.render(<Header color='tomato' title='Hello, Webpack 🔥' />, root);

if (module.hot) {
  module.hot.accept();
}
