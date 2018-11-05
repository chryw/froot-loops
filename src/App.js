import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SiteNav from './Components/SiteNav/SiteNav';
import AppState from './AppState';
import {
  Home,
  Icons,
  Illustrations,
  Brands,
} from './Pages/index';
import './App.css';

const App = () => (
  <Router basename="/">
    <div className="App ms-Fabric ms-normalize" dir="ltr">
      <SiteNav pages={AppState.pages} />
      <div className="Site-body">
        <Route exact path="/" component={Home} />
        <Route path="/icons" component={Icons} />
        <Route path="/illustrations" component={Illustrations} />
        <Route path="/brands" component={Brands} />
      </div>
    </div>
  </Router>
);

export default App;
