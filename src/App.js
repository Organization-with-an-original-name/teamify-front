import './App.scss';
import { Header } from './components/Header/header';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js';
import "bootstrap/dist/js/bootstrap.bundle.min";
import { HeaderBanner } from './components/Header-Banner/header-banner';
import { Categories } from './components/Categories/categories';
import { Createteam } from './components/CreateTeam/createteam';
import { ModalReg } from './components/ModalReg/modalreg';
import { useEffect, useState } from 'react';
import Humburger from './components/HamburgerHeader/humburger';
// import {Routes, Route, BrowserRouter} from 'react-router-dom';


function App() {
  const [RegOpen, SetRegOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  window.onresize = () =>{
    setWindowWidth(window.innerWidth);
  
  }
 
  return (
    <div className="root-wrap">
      
      <Header SetopenR = {SetRegOpen} width={windowWidth}/>
      <Humburger width={windowWidth} SetopenR = {SetRegOpen}/>
      <HeaderBanner />
      <Createteam />
      <Categories />
      <ModalReg openR={RegOpen} SetopenR = {SetRegOpen}></ModalReg>
    </div>
  );
}

export default App;
