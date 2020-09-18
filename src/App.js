import React, { createContext, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import NoMatch from './components/NoMatch/NoMatch';
import Login from './components/Login/Login';
import Hotel from './components/Hotel/Hotel';
import Blog from './components/Blog/Blog';
import News from './components/News/News';
import PlaceDetails from './components/PlaceDetails/PlaceDetails';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function Copyright() {
  return (
    <Typography variant="body2" color="textPrimary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://knowaminul.com/">
        knowaminul
    </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Header/>
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route path="/home">
            <Home/>
          </Route>
          <Route path="/news">
            <News/>
          </Route> 
          <Route path="/blog">
            <Blog/>
          </Route>                   
          <Route path="/place/:name">
            <PlaceDetails/>
          </Route>
          <Route path="/login">
            <Login/>
          </Route>
          <PrivateRoute path="/hotel/:name">
            <Hotel/>
          </PrivateRoute>
          <Route path="*">
            <NoMatch/>
          </Route>
        </Switch>
        </Router>
      <Box mt={5}>
        <Copyright />
      </Box>
    </UserContext.Provider>
  );
}

export default App;
