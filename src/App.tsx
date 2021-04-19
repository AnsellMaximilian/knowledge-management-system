import { Container, makeStyles } from '@material-ui/core';
import React from 'react';
import './App.css';
import bg from './assets/images/bg.svg';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import SignUp from './pages/SignUp';

const useStyles = makeStyles(theme => ({
  content: {
    backgroundImage: `url(${bg})`,
    minHeight: 740,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    paddingTop: theme.spacing(5)
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
            <Switch>
              <Route exact path="/">
                <Home/>
              </Route>
              
              <Route exact path="/signup">
                <SignUp/>
              </Route>
            </Switch>
          </Container>
        </main>
      </div>
    </Router>
    
  );
}

export default App;
