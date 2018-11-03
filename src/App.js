import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SiteHeader from './Components/SiteHeader/SiteHeader';
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
      <SiteHeader />
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
