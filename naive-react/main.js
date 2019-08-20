const React = require('react');
const ReactDOM = require('react-dom');

const element = React.createElement('p', { style: { color: 'red' } }, 'Hello, world');
const root = document.querySelector('#root');

ReactDOM.render(element, root);