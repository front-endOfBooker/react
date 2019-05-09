import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import App from './App';
import Home from './Home';
import Todos from './Todos';

// const BasicRouter = () => {
//   <HashRouter>
//     <Switch>
//       <Route exact path="/" component={Home} />
//       <Route exact path="/app" component={App} />
//     </Switch>
//   </HashRouter>
// }

class BasicRouter extends React.Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/app" component={App} />
          <Route exact path="/todos" component={Todos} />
        </Switch>
      </HashRouter>
    )
  }
}

export default BasicRouter
