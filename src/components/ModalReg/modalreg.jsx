import React, { useEffect, useMemo, useRef, useState } from "react";
import './modalreg.scss';
import { createPortal } from 'react-dom';
import close from '../../assets/icon/close.png';


const modalRootElement =  document.querySelector('#modal');
const html = document.querySelector('html');

export const ModalReg = function(props){
    const [step, SetStep] = useState(1);
    const username = useRef();
    const password = useRef();
    const fname = useRef();
    const lname = useRef();
    const tel = useRef();
    const ready = useRef();
    const btn = useRef();
    let object = new Object;
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
        if(step === 1){
            return(createPortal(
                
                <div className="modalreg-wrap">
                <button onClick={()=>{
                    CloseHandler();
                }} className="modal-close"><img className="img-fluid" src={close} alt="close-icon" /></button>
                <div className="modal-progress">
                    <div className="progress-step">
                        <div className="step-box step-box-active">
                            <p className="m-0">1</p>
                        </div>
                        <p className="m-0">Account setup</p>
                    </div>
                    <div className="progress-step">
                        <div className="step-box">
                            <p className="m-0">2</p>
                        </div>
                        <p className="m-0">Account setup</p>
                    </div>
                    <div className="progress-step">
                        <div className="step-box">
                            <p className="m-0">3</p>
                        </div>
                        <p className="m-0">Account setup</p>
                    </div>
                    
                    
                </div>
                <div className="modal-window">
                    <h2 className="modal-title">Create your account</h2>
                    <h4 className="modal-subtitle">This is step 1</h4>
                    <div className="modal-main">
                        <div className="modal-inputs">
                            <input ref={username} type="text" placeholder='Username' />
                            <input ref={password} type='password' placeholder="Password" />
                            <button ref={btn} onClick={()=>{
                                object.username = username.current.value;
                                object.password = password.current.value;
                                SetStep(2);
                            }}>Next</button>
                        </div>
                    </div>
                    
                </div>
            </div>
            
     
            ,element))
        }
        if(step === 2){
            return(createPortal(
           
                <div className="modalreg-wrap">
                    <button onClick={()=>{
                    CloseHandler();
                }} className="modal-close"><img className="img-fluid" src={close} alt="close-icon" /></button>
                <div className="modal-progress">
                    <div className="progress-step">
                        <div className="step-box step-box-active active-link">
                            <p className="m-0">1</p>
                        </div>
                        <p className="m-0">Account setup</p>
                    </div>
                    <div className="progress-step">
                        <div className="step-box step-box-active">
                            <p className="m-0">2</p>
                        </div>
                        <p className="m-0">Account setup</p>
                    </div>
                    <div className="progress-step">
                        <div className="step-box">
                            <p className="m-0">3</p>
                        </div>
                        <p className="m-0">Account setup</p>
                    </div>
                    
                    
                </div>
                <div className="modal-window">
                    <h2 className="modal-title">Compleate your account</h2>
                    <h4 className="modal-subtitle">Provide us your name</h4>
                    <div className="modal-main">
                        <div className="modal-inputs">
                            <input ref={fname} type="text" placeholder='First Name' />
                            <input ref={lname} type='text' placeholder="Last Name" />
                            <div className="button-wrap d-flex gap-5">
                            <button onClick={()=>SetStep(step-1)}>Previous</button>
                            <button ref={btn} onClick={()=>{
                                object.firstName = fname.current.value;
                                object.lastName = lname.current.value;
                                SetStep(3);
                            }}>Next</button>
                            </div>
                            
                        </div>
                    </div>
                    
                </div>
            </div>
            
     
            ,element))
        }
        if(step === 3){
            return(createPortal(
           
                <div className="modalreg-wrap">
                    <button onClick={()=>{
                    CloseHandler();
                }} className="modal-close"><img className="img-fluid" src={close} alt="close-icon" /></button>
                <div className="modal-progress">
                    <div className="progress-step">
                        <div className="step-box step-box-active active-link">
                            <p className="m-0">1</p>
                        </div>
                        <p className="m-0">Account setup</p>
                    </div>
                    <div className="progress-step">
                        <div className="step-box step-box-active active-link">
                            <p className="m-0">2</p>
                        </div>
                        <p className="m-0">Account setup</p>
                    </div>
                    <div className="progress-step">
                        <div className="step-box step-box-active">
                            <p className="m-0">3</p>
                        </div>
                        <p className="m-0">Account setup</p>
                    </div>
                    
                    
                </div>
                <div className="modal-window">
                    <h2 className="modal-title">Add more information</h2>
                    <h4 className="modal-subtitle">The last step</h4>
                    <div className="modal-main">
                        <div className="modal-inputs">
                            <input ref={tel} type="tel" placeholder='Contact Number' />
                            <div className="select-wrap d-flex gap-5">
                                <p>Are you searching team?</p>
                                <select ref={ready} name="select">
                                <option value="true">Yes</option>
                                <option value="false" selected>No</option>
                                </select>
                            </div>
                            <div className="button-wrap d-flex gap-5">
                            <button onClick={()=>SetStep(step-1)}>Previous</button>
                            <button ref={btn} onClick={()=>{
                                object.contacts = tel.current.value;
                                object.lookingForTeam = ready.current.value;
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
                                postData('http://localhost:8080/user', object)
                                .then((data) => {
                                    console.log(data); 
                                  });
                                SetStep(1);
                                CloseHandler();
                            }}>Compleate</button>
                            
                            </div>
                            
                        </div>
                    </div>
                    
                </div>
            </div>
            
     
            ,element))
        }
        
    }
    else{
        return null;
    }
}