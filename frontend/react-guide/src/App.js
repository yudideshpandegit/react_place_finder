import React, {useEffect, useState, useCallback} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import PlaceForm from './places-form/component/PlacesForm';
import Auth from './signup/component/auth';
import Places from './my-places/component/Places';
import User from './user/component/User';
import { AuthContext } from './shared/validation/auth-context';


function App() {

  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);

  useEffect(() => { 
    document.body.style.backgroundColor = 'rgb(' + 0 + ',' + 0 + ',' + 0 + ','+ 0.8 +')';

}, [])

const login = useCallback((userId, token) => {

  console.log(userId, token);
  setToken(token);
  setUserId(userId);

}, []);

const logout = useCallback(() => {

  setToken(null);
  setUserId(null);

}, []);


let routes;

if(token){

  routes = (

    <Switch>
      <Route path = '/' exact>
        <User />
      </Route>
      <Route path = '/:userId/places' exact>   
        <Places />
      </Route>
      <Route path = '/places/new' exact>
        <PlaceForm />
      </Route>
    </Switch>

  )

}

else{

  routes = (
    
    <Switch>
      <Route path = '/' exact>
        <User />
      </Route>
      <Route path = '/:userId/places'>   
        <Places />
      </Route>
      <Route path = '/places/new'>
        <PlaceForm />
      </Route>
      <Route path = '/auth'>
        <Auth />
      </Route>
    </Switch>

  )

}

  return (
  <AuthContext.Provider
  value={{
    isLoggedIn: !!token,
    token: token,
    userId: userId,
    login: login,
    logout: logout
  }}>
  <Router>
      <main>
        {routes}
      </main>
    </Router>
    </AuthContext.Provider>

  );
}

export default App;
