import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import Helmet from 'react-helmet';
import { loadableReady } from '@loadable/component';
import RootComponent from './home.jsx';
import { init } from './delayed-loader';

global.React = React;
global.ReactDOM = ReactDOM;
global.ReactDOMServer = ReactDOMServer;

global.Helmet = Helmet;
global.loadableReady = loadableReady;

global.RootComponent = RootComponent;
global.DelayedLoader = { init };
