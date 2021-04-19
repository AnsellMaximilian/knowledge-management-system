import { Container, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import './App.css';
import bg from './assets/images/bg.svg';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import { User } from './types';
import { auth, db } from './utils/firebase';

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

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if(user){
        let userObj: User = {
          ...user,
          name: ''
        }
        db.collection('userProfiles').doc(user.uid).get()
          .then(userProfileRef => {
            userObj = {
              ...userObj,
              ...userProfileRef.data()
            }
            setUser(userObj)
          })
          .catch(err => {
            setUser(userObj);
          })
      }else{
        setUser(user);
      }
    })
  }, [])

  return (
    <Router>
      <div>
        <Header/>
        {user?.email}
        <main className={`App ${classes.content}`}>
          <Container maxWidth="md">
            <Switch>
              <Route exact path="/">
                <Home/>
              </Route>
              
              <Route exact path="/signup">
                 {user ? <Redirect to={process.env.PUBLIC_URL + "/"}/> : <SignUp/>}
              </Route>

              <Route exact path="/signin">
                 {user ? <Redirect to={process.env.PUBLIC_URL + "/"}/> : <SignIn/>}
              </Route>
            </Switch>
          </Container>
        </main>
      </div>
    </Router>
    
  );
}

export default App;
