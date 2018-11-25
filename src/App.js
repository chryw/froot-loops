import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import SiteNav from './Components/SiteNav/SiteNav';
import AppState from './AppState';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = ({
      routes: [],
    });

    this.createRoutes = (pages) => {
      let routes = [];
      pages.forEach((page) => {
        routes.push(
          <Route
            exact={page.isHomePage}
            key={page.key}
            path={page.url}
            component={page.component}
          />,
        );
        if (page.pages) {
          routes = routes.concat(this.createRoutes(page.pages));
        }
      });
      return routes;
    };

    this.getRoutes = () => {
      let routes = [];
      routes = this.createRoutes(AppState.pages);
      return routes;
    };
  }

  componentWillMount() {
    this.setState({
      routes: this.getRoutes(AppState.pages),
    });
  }

  render() {
    const { routes } = this.state;
    return (
      <Router basename="/">
        <div className="App" dir="ltr">
          <SiteNav pages={AppState.pages} />
          <div
            className="ms-Fabric ms-normalize"
          >
            <Suspense fallback={<div>Loading...</div>}>
              {routes}
            </Suspense>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
