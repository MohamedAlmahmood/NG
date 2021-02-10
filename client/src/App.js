import './App.css';
import {useState} from "react";
import Axios from 'axios';
import Home from './Home.js';
import {Route, Link} from 'react-router-dom';
import Login from './login.js';
import NavBar from "./NavBar.js";

function App() {
  return(
    <div className="App">
      <Route exact path="/" component={Login} />
      <Route exact path="/Home" component={Home}/>
      <NavBar></NavBar>
    </div>
  )
}

export default App;
