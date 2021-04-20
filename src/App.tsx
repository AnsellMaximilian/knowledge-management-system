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
import UserContext from './contexts/UserContext';
import Forum from './pages/Forum';
import urlFormatter from './utils/urlFormatter';
import CreateArticle from './pages/CreateArticle';

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
      <UserContext.Provider value={user}>
        <div>
          <Header/>
          <main className={`App ${classes.content}`}>
            <Container maxWidth="md">
              <Switch>
                <Route exact path={urlFormatter("/")}>
                  <Home/>
                </Route>

                <Route exact path={urlFormatter("/forum")}>
                  <Forum/>
                </Route>

                <Route exact path={urlFormatter("/forum/create")}>
                  <CreateArticle/>
                </Route>
                
                <Route exact path={urlFormatter("/signup")}>
                  {user ? <Redirect to={process.env.PUBLIC_URL + "/"}/> : <SignUp/>}
                </Route>

                <Route exact path={urlFormatter("/signin")}>
                  {user ? <Redirect to={process.env.PUBLIC_URL + "/"}/> : <SignIn/>}
                </Route>
              </Switch>
            </Container>
          </main>
        </div>
      </UserContext.Provider>
    </Router>
    
  );
}

export default App;
