import React from 'react';
import ReactDOM from 'react-dom/client';
import {Route,BrowserRouter,Routes} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import './App.css'
import Header from './components/Header';
import Footer from './components/Footer';
import Single from './components/Single'
import Search from './components/Search';
import Register from './components/Register'


const routing = (
  <BrowserRouter>
  <React.StrictMode>
    <Header/>
    <Routes>
      <Route exact path='/' Component={App}/>
      <Route path='/post/:slug' Component={Single}/>
      <Route path='/search' Component={Search}/>
      <Route path='/register' Component={Register}/>
    </Routes>
  <Footer/>
  </React.StrictMode>
  </BrowserRouter>

)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(routing)
