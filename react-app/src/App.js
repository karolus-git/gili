import React from 'react';
import {AuthProvider} from 'react-auth-kit'
import RoutesComponent from './Routes';
import NavBar from "./components/layout/NavBar"
import Footer from "./components/layout/Footer"
import background from "./assets/joanna-kosinska-3BgkveM3y_k-unsplash_a50.jpg";

import "./App.css"

var sectionStyle = {
  backgroundImage: `url(${background})`, 
  backgroundSize: "cover",
  backgroundAttachment: "fixed",
  width: '100vw',
  height: '100vh',
  opacity: 1.0
}

function App() {
  return (
    <AuthProvider
      authName={"_auth"} authType={"cookie"}
    >
        <div
          className='p-5 text-center bg-image'
          style={sectionStyle}
        >

            <RoutesComponent/> 
          </div>         
          <Footer/>

        
    </AuthProvider>
  );
}

export default App;