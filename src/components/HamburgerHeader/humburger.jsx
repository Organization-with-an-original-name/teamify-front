import React, { useEffect, useRef, useState } from 'react';
import {
  MDBContainer,
  MDBCollapse,
  MDBNavbar,
  MDBNavbarToggler,
  MDBIcon,
  MDBBtn,
} from 'mdb-react-ui-kit';
import './humburger.scss';
import logo from '../../assets/icon/log.png';
import {IoMdMenu} from 'react-icons/io';

export default function Humburger(props) {
  const [showNavExternal3, setShowNavExternal3] = useState(false);
  const humburger = useRef();
  useEffect(()=>{
    if(props.width > 1090){
        humburger.current.style.display = 'none';
    }
    else{
        humburger.current.style.display = 'block';
    }
   
    

  });
  return (
    <div ref={humburger} className='humburger mb-2'>
      <div className="logo-container d-flex align-items-center">
            <img className="header-logo img-fluid" src={logo} alt="logo" />
            <h4 className="logo-title"><span>Find your</span><br /> perfect team</h4>
        </div>
      <MDBNavbar>
        <MDBContainer fluid className='humburger-container'>
          <MDBNavbarToggler
            className='ms-auto humburger-icon'
            type='button'
            data-target='#navbarToggleExternalContent'
            aria-controls='navbarToggleExternalContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => setShowNavExternal3(!showNavExternal3)}
            
          >
            Menu <IoMdMenu />
            <MDBIcon icon='bars' fas />
          </MDBNavbarToggler >
        </MDBContainer>
      </MDBNavbar>

      <MDBCollapse className='humburger-collapse' show={showNavExternal3}>
        <div className='humburger-bg shadow-3 p-4'>
          <a href="#" className='humburger-bg-link'>lorem</a>
          <a href="#" className='humburger-bg-link'>lorem</a>
          <a href="#" className='humburger-bg-link'>lorem</a>
          <a href="#" className='humburger-bg-link'>lorem</a>
          <a href="#" className='humburger-bg-link'>lorem</a>
          <div className="header-btns d-flex pt-3">
                <button className="humburger-btn btn-reg" onClick={props.SetopenR}></button>
                <button className="humburger-btn btn-log">Login</button>
          </div>
        </div>
      </MDBCollapse>
    </div>
  );
}