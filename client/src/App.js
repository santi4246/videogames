import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Landing from './Components/Landing';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Game from './Components/Game';
import Create from './Components/Create';
import axios from 'axios';
axios.defaults.baseURL = 'https://videogames-4hv5.onrender.com/api';

function App() {  
  return (
    <>
      <Route exact path = '/' component={Landing} />
      <Route exact path = '/home' component={Navbar} />
      <Route exact path = '/home' component={Home}/>
      <Route path = '/home/game/:id' component = {Game}/>
      <Route path = '/home/create' component = {Create}/>
    </>
  );
}

export default App;