import './App.scss';
import { Header } from './components/Header/header';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js';
import "bootstrap/dist/js/bootstrap.bundle.min";
import { HeaderBanner } from './components/Header-Banner/header-banner';
import { Categories } from './components/Categories/categories';
import { Createteam } from './components/CreateTeam/createteam';
import { ModalReg } from './components/ModalReg/modalreg';
import { useContext, useEffect, useState } from 'react';
import Humburger from './components/HamburgerHeader/humburger';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import  UserContext  from './UserContext';


function App() {
  const [RegOpen, SetRegOpen] = useState(false);
  const [LogOpen, SetLogOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [userSigned, SetUserSigned] = useState(false);

  

  window.onresize = () =>{
    setWindowWidth(window.innerWidth);

  
  }
  // useEffect(()=>{
  //   alert('Reander');
  // })
  
 
  return (
    <div className="root-wrap">
      <Header SetopenR = {SetRegOpen} width={windowWidth} SetopenL = {SetLogOpen} SetUserSigned = {SetUserSigned} isSigned = {userSigned}/>
      <Humburger width={windowWidth} SetopenR = {SetRegOpen}/>
      <Routes>
        <Route path='/' element={ 
             <>
              <HeaderBanner />
              <Createteam />
              <Categories />
             </>
          }>
        </Route>
      </Routes>
      <ModalReg openR={RegOpen} SetopenR = {SetRegOpen} openL={LogOpen} SetopenL = {SetLogOpen} ></ModalReg>
    </div>
  );
}

export default App;
