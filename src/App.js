import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import Home from './Pages/Home/Home';
import Icons from './Pages/Icons/Icons';
import Illustrations from './Pages/Illustrations/Illustrations';
import Brands from './Pages/Brands/Brands';
import './App.css';

const App = () => (
  <Router basename="/">
    <div className="App ms-Fabric" dir="ltr">
      <Header />
      <div className="Content">
        <Route exact path="/" component={Home} />
        <Route path="/icons" component={Icons} />
        <Route path="/illustrations" component={Illustrations} />
        <Route path="/brands" component={Brands} />
      </div>
    </div>
  </Router>
);

export default App;
