import React, { useEffect, useMemo, useRef, useState } from "react";
import './modalreg.scss';
import { createPortal } from 'react-dom';


const modalRootElement =  document.querySelector('#modal');
const html = document.querySelector('html');

export const ModalReg = function(props){
    const username = useRef();
    const fname = useRef();
    const btn = useRef();
    let scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    const CloseHandler = function(){
        html.style.overflowY = '';
        html.style.top = '';
        window.scrollTo(0, scrollPosition);
        props.SetopenR(false);
    }
    const element = useMemo(()=> document.createElement('div'), []);
    element.classList.add('modalreg');
    useEffect(()=>{
        modalRootElement.appendChild(element); 
        return() =>{
            modalRootElement.removeChild(element);
        }
    });
    if(props.openR){
        html.style.overflowY = 'hidden'; // заборона прокрутки сторінки
        html.style.top = `-${scrollPosition}px`;
        return(createPortal(
            <div className="modalreg-wrap">
                <div className="modal-window">
                    <h2 className="modal-title">Sign in</h2>
                    <div className="modal-main">
                        <div className="modal-inputs">
                            <input ref={username} type="text" placeholder='Username' />
                            <input ref={fname} type="text" placeholder="Firstname" />
                            <button ref={btn} onClick={()=>{
                                let obj = {
                                 username: username.current.value,
                                 firstName: fname.current.value,
                                 lastName: "Test",
                                 lookingForTeam: true,
                                 contacts: [
                                    {
                                      type: "PHONE",
                                      value: "string",
                                      shareable: true
                                    }
                                  ]};
                                const postData = async (url = ' ', data = {}) => {
                                    const response = await fetch(url, {
                                      method: 'POST',
                                      headers: {
                                        'Content-Type': 'application/json',
                                        'accept' : '*/*'
                                      },
                                      body: JSON.stringify(data)
                                    });
                                   
                                    return response.json(); 
                                  }
                                postData('http://localhost:8080/user', obj)
                                .then((data) => {
                                    console.log(data); 
                                  });
                                 
                                CloseHandler();
                            }}>Sign in</button>
                        </div>
                    </div>
                    
                </div>
            </div>
        ,element))
    }
    else{
        return null;
    }
}