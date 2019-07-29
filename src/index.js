import React from 'react';
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import './index.css';
import Website from './components/Website';
import Projects from './components/Projects';
import * as serviceWorker from './serviceWorker';
import { Router, Route, Link } from 'react-router-dom';

//ReactDOM.render(<Website />, document.getElementById('root'));
ReactDOM.render(
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/projects/">Projects</Link>
            </li>
          </ul>
        </nav>

        <Route path="/" exact component={Website} />
        <Route path="/projects/" component={Projects} />
      </div>
    </Router>,document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
