import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { BrowserRouter as Router, Route } from "react-router-dom";

import App from './view/App';
import InGame from './view/InGame';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Router>
      <div>
        <Route exact path="/" component={App} />
        <Route exact path="/play" component={InGame} />
      </div>
    </Router>
    ,
  document.getElementById('root')
);
registerServiceWorker();
