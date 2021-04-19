import { Container, makeStyles } from '@material-ui/core';
import React from 'react';
import './App.css';
import LightBulbAndSwitch from './components/LightBulbAndSwitch';
import bg from './assets/images/bg.svg';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';

const useStyles = makeStyles(theme => ({
  content: {
    backgroundImage: `url(${bg})`,
    // backgroundColor: theme.palette.secondary.main,
    minHeight: 1000,
    backgroundSize: 'fit',
    backgroundRepeat: 'no-repeat'
  }
}))

function App() {
  const classes = useStyles();
  return (
    <Router>
      <div>
        <Header/>
        <main className={`App ${classes.content}`}>
          <Container maxWidth="md">
            <Route exact path="/">
              <Home/>
            </Route>
          </Container>
        </main>
      </div>
    </Router>
    
  );
}

export default App;
