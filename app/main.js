'use strict';

import './main.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './component.jsx';

main();

function main() {
    ReactDOM.render(<App />, document.getElementById('app'));
}