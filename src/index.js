import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

// import Home from './PageHome';
// import About from './PageAbout';
// import Topics from './PageTopics';

import asyncComponent from './components/AsyncComponent';
// OLD CODE STYLE
// const Home = await require.ensure([], require => require('./Home').default, 'home');
const Home = asyncComponent(() => import('./containers/PageHome')
  .then(module => module.default), { name: 'Home Page' });
const About = asyncComponent(() => import('./containers/PageAbout')
  .then(module => module.default), { name: 'About Page' });
const Topics = asyncComponent(() => import('./containers/PageTopics')
  .then(module => module.default), { name: 'Topics Page' });

const BasicExample = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/topics">Topics</Link></li>
      </ul>

      <hr/>

      <Route exact path="/" component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/topics" component={Topics}/>
    </div>
  </Router>
)

ReactDOM.render(<BasicExample />, document.getElementById('root'));
registerServiceWorker();
