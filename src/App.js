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
import Profile from './components/Profile/profile';
import CreateTeamPage from './components/CreateTeamPage/CrTeamPage';

// window.onl= function() {
//   // Змінюємо URL шлях на новий
//   var newPath = "/teamify-front";
//   window.location.replace(newPath + window.location.search);
// };


function App() {
  const [RegOpen, SetRegOpen] = useState(false);
  const [LogOpen, SetLogOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [userSigned, SetUserSigned] = useState(false);
  const [signed, Setsigned] = useState(false);
  
  

  window.onresize = () =>{
    setWindowWidth(window.innerWidth);

  
  }
  // useEffect(()=>{
  //   alert('Reander');
  // })
  
 
  return (
    <div className="root-wrap">
      <Header Setsigned={Setsigned} signed={signed} SetopenR = {SetRegOpen} width={windowWidth} SetopenL = {SetLogOpen} SetUserSigned = {SetUserSigned} isSigned = {userSigned}/>
      <Humburger Setsigned={Setsigned} signed={signed} width={windowWidth} SetopenR = {SetRegOpen} SetopenL = {SetLogOpen} />
      <Routes>
        <Route path='/' element={ 
             <>
              <HeaderBanner />
              <Createteam />
              <Categories />
             </>
          }>
        </Route>
        <Route path='/my-profile' element={
          <>
            <Profile />
          </>
        }> 
        </Route>
        <Route path='/create-team' element={
          <>
            <CreateTeamPage />
          </>
        }></Route>
      </Routes>
      <ModalReg Setsigned={Setsigned} openR={RegOpen} SetopenR = {SetRegOpen} openL={LogOpen} SetopenL = {SetLogOpen} ></ModalReg>
    </div>
  );
}

export default App;
