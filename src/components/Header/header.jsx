import React, { useEffect, useRef } from "react";
import './header.scss';
import logo from '../../assets/icon/log.png';
export const Header = function(props){
    const fixedHeader = useRef();
    const header = useRef();
    const RegHandler = props.SetopenR;
    useEffect(()=>{
        window.onscroll = ()=>{
            if(window.pageYOffset>120){
                fixedHeader.current.style.display = 'block';
                setTimeout(function() {
                    fixedHeader.current.style.transition = 'transform 0.5s ease';
                    fixedHeader.current.style.transform = 'translateY(120px)';
                  }, 100);
              
            }
            else{
                fixedHeader.current.style.display = 'none';
                setTimeout(function() {
                    fixedHeader.current.style.transition = 'transform 0.5s ease';
                    fixedHeader.current.style.transform = 'translateY(-120px)';
                  }, 100);
              
            }
        }
        if(props.width <= 1090){
            header.current.style.display = 'none';
        }
        else{
            header.current.style.display = 'block';
        }
    });
    return(
        <header ref={header} className="header">
            <div className="header-wrap">
                <div className="header-container d-flex align-items-center p-0">
                    <div className="logo-container d-flex align-items-center">
                        <img className="header-logo img-fluid" src={logo} alt="logo" />
                        <h4 className="logo-title"><span>Find your</span><br /> perfect team</h4>
                    </div>
                    <div className="header-links d-flex m-0">
                            <ul className="p-0 m-0">
                                <li>lorem</li>
                                <li>lorem</li>
                                <li>lorem</li>
                                <li>lorem</li>
                                <li>lorem</li>
                            </ul>
                    </div>
                    <div className="header-btns d-flex">
                        <button className="btn-reg" onClick={RegHandler}></button>
                        <button className="btn-log">Login</button>
                    </div>
                   
                </div>
            </div>
            <div ref={fixedHeader} className="fixedheader-wrap">
                <div className="header-container d-flex align-items-center p-0">
                    <div className="logo-container d-flex align-items-center">
                        <img className="header-logo img-fluid" src={logo} alt="logo" />
                        <h4 className="logo-title"><span>Find your</span><br /> perfect team</h4>
                    </div>
                    <div className="header-links d-flex m-0">
                            <ul className="p-0 m-0">
                                <li>lorem</li>
                                <li>lorem</li>
                                <li>lorem</li>
                                <li>lorem</li>
                                <li>lorem</li>
                            </ul>
                    </div>
                    <div className="header-btns d-flex">
                        <button className="btn-reg" onClick={RegHandler}></button>
                        <button className="btn-log">Login</button>
                    </div>
                </div>
            </div>
        </header>
    );
} 