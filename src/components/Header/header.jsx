import React from "react";
import './header.scss';
import logo from '../../assets/icon/log.png';
export const Header = function(){
    return(
        <header className="header">
            <div className="header-wrap">
                <div className="container d-flex align-items-center p-0 gap-lg-5 gap-md-3">
                    <div className="logo-container d-flex align-items-center">
                        <img className="header-logo" src={logo} alt="logo" />
                        <h4 className="logo-title"><span>Find your</span><br /> perfect team</h4>
                    </div>
                    <div className="header-links d-flex gap-5 gap-md-3 m-0">
                            <ul className="p-0">
                                <li>lorem</li>
                                <li>lorem</li>
                                <li>lorem</li>
                                <li>lorem</li>
                                <li>lorem</li>
                            </ul>
                    </div>
                    <div className="header-btns d-flex">
                        <button className="btn-reg">Register</button>
                        <button className="btn-log">Login</button>
                    </div>
                   
                </div>
            </div>
        </header>
    );
} 