import React from 'react';
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Container from './components/Container/Container'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import LinearBuffer from './components/Preloader/Preloader'

import classes from './App.module.scss'

import LoginScreen from './screens/LoginScreen/LoginScreen'
import RegisterScreen from './screens/RegisterScreen/RegisterScreen'
import HomeScreen from './screens/HomeScreen'
import AnalyticsScreen from './screens/AnalyticsScreen/AnalyticsScreen';
import QualityControlScreen from './screens/QualityControlScreen/QualityControlScreen'
import HandbookScreen from './screens/HandbookScreen/HandbookScreen'

import { useSelector } from 'react-redux'

function App() {

  const preloaderStore = useSelector( state => state.preloader )
  const { preLoading } = preloaderStore

  return (
    <Router>
      <Header/>
        <main className={classes.main}>
        {
          preLoading && <LinearBuffer />
        }
          <Route path="/login" component={LoginScreen}/> 
          <Route path="/register" component={RegisterScreen}/> 
          <Container>
            <Route path="/qualitycontrol" component={QualityControlScreen} exact/>
            <Route path="/analytics" component={AnalyticsScreen} exact/>
            <Route path="/handbook" component={HandbookScreen} exact/>
            <Route path="/" component={HomeScreen} exact/>
          </Container>
        </main>
      <Footer/>
    </Router>
  );
}

export default App;
