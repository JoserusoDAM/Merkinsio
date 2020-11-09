import React, { useEffect, useState } from 'react'
import Login from './components/Login'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Tabla from './Views/Tabla'
import { fire } from './config/init-firebase'



const App = () => {

  const logOut = () => {
    fire.auth().signOut().then(function () {
      console.log('Sign-out successful')
      localStorage.clear()
    }).catch(function (error) {
      // An error happened.
    });
  }


  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const unsuscribe = fire.auth().onAuthStateChanged(function(user) {
      if (user) {
        setIsLogged(true)
      } else {
        setIsLogged(false)
      }
    });
    return () => unsuscribe();
  })

  

  const uid = localStorage.getItem('uid');

  return (
    <Router>
      <div className="container mt-3">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <span className="navbar-brand" >Merkinsio</span>
          <div className="collapse navbar-collapse"
            id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link to="/login">Log in</Link>
              </li>
            </ul>
            <ul className={`nav-item active ${isLogged ? "visible" : "d-none"}`}>
              <Link onClick={logOut} to="/">Log out</Link>
            </ul>
          </div>
        </nav>

        <Switch>
          <Route exact path="/">
            <h1>Bienvenido</h1>
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/logged">
            <Tabla />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
