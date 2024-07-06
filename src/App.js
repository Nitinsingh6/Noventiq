
import React, { useEffect } from 'react';
import './App.css';
import Header from './Header/header';
import Router from './routes';
import Footer from './Footer/footer';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function App() {
  // useEffect(() =>{

  // },[]) 

  return (
    <div className="App">
      <Header />
      <Router />
      <Footer />
      
    </div>
  );
}

export default App;
