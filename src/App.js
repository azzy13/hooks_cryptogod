import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/common/Header';
import NotFound from './components/notfound/NotFound';
import List from './components/list/List';
import Detail from './components/detail/Detail';
import './index.css';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route exact path='/hooks_cryptogod/' component={List} />
          <Route
            exact
            path='/hooks_cryptogod/currency/:id'
            component={Detail}
          />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
