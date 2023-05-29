import React, { useEffect, useMemo, useRef, useState } from "react";
import './modalreg.scss';
import { createPortal } from 'react-dom';
import close from '../../assets/icon/close.png';
import { json } from "react-router-dom";
import UserContext from "../../UserContext";
import { addUserActionCreator, updateUserStatusActionCreator } from "../../Redux/userReducer";
import axios from "axios";
import { useDispatch } from "react-redux";
import { postUser } from "../../asyncActions/postuser";


const modalRootElement =  document.querySelector('#modal');
const html = document.querySelector('html');
let object = new Object;

export const ModalReg = function(props){
    const [step, SetStep] = useState(1);
    const username = useRef();
    const password = useRef();
    const fname = useRef();
    const lname = useRef();
    const tel = useRef();
    const ready = useRef();
    const btn = useRef();
    const loc = useRef();
    const signUsername= useRef();
    const signPassword= useRef();
    
    const GetUser = () => {
        return function(dispatch){
            fetch('http://18.184.249.86/user/1')
            .then(response =>{
                if(response.ok){
                    return response.json();
                }
                else{
                    alert('This user doesn`t exist. Please, create an account!')
                }
            })
            .then(data =>{
                dispatch(addUserActionCreator(data));
                console.log(data)
                props.Setsigned(true);
            })
            .catch(error => {
            
              console.log('Error:',error);
            });
        }
}
 
    
    let scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    const CloseHandler = function(){
        html.style.overflowY = '';
        html.style.top = '';
        window.scrollTo(0, scrollPosition);
        props.SetopenR(false);
    }
    const CloseHandlerL = function(){
        html.style.overflowY = '';
        html.style.top = '';
        window.scrollTo(0, scrollPosition);
        props.SetopenL(false);
    }
    const element = useMemo(()=> document.createElement('div'), []);
    element.classList.add('modalreg');
    useEffect(()=>{
        modalRootElement.appendChild(element); 
        return() =>{
            modalRootElement.removeChild(element);
        }
    });
    //-------------------------------
    return(
        <UserContext.Consumer>
            {
                (user) =>{
                    const loadUser = (userProfile)=> user.dispatch(addUserActionCreator(userProfile));
                    const updateUserStatus = () => user.dispatch(updateUserStatusActionCreator());
                    let state = user.getState();
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
                                                // object.password = password.current.value;
                                                username.current.value = '';
                                                password.current.value = '';
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
                                                fname.current.value = '';
                                                lname.current.value = '';
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
                                            <input ref={loc} type="text" placeholder='Location' />
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
                                                object.lookingForTeam = ready.current.value;
                                                object.location = loc.current.value;
                                                object.contacts = [{type: "PHONE",
                                                value: tel.current.value,
                                                shareable: true}];
                                              
                                                tel.current.value='';
                                                ready.current.value='';
                                                loc.current.value = '';
                                                //--------------
                                                fetch('http://18.184.249.86/user', {
                                                    method: 'POST',
                                                    mode: 'cors',
                                                    headers: {
                                                      'Content-Type': 'application/json',
                                                      'Accept': 'application/json' 
                                                    },
                                                    body: JSON.stringify(object)
                                                  })
                                                    .then(response =>{
                                                        if(response.ok){
                                                         
                                                            loadUser(object);
                                                            props.Setsigned(true);
                                                            
                                                           
                                                            
                                                            
                                                        }
                                                        else{
                                                            alert('This user already exists!')
                                                        }
                                                    })
                                                    .catch(error => {
                                                      
                                                        console.error('Error:', error);
                                                    });
                                                 
                                                  
                                                //--------------
                                                // axios.post('http://18.184.249.86/user', object)
                                                //   .then(function (response) {
                                                //     if(response.status === 201){
                                                //         loadUser(object);
                                                //         updateUserStatus();
                                                //         SetStep(1);
                                                           
                                                //     }
                                                    
                                                //   })
                                                //   .catch(function (error) {
                                                //     console.log(error);
                                                //   });





                                                //--------------
                                                // const asyncfetch = ()=>{
                                                //     return function(dispatch){
                                                //         fetch('http://18.184.249.86/user', {
                                                //         method: 'POST',
                                                //         mode: 'cors',
                                                //         headers: {
                                                //             'Content-Type': 'application/json',
                                                //             'Accept': 'application/json' 
                                                //         },
                                                //         body: JSON.stringify(object)
                                                //         })
                                                //         .then(response =>{
                                                //             if(response.ok){
                                                //                 // loadUser(object);
                                                //                 // updateUserStatus();
                                                //                 dispatch(addUserActionCreator(object));
                                                //                 dispatch(updateUserStatusActionCreator());
                                                //                 SetStep(1);
                                                //                 CloseHandler();        
                                                //             }
                                                //         })
                                                //         .catch(error => {
                                                //             console.log(error);
                                                //          });
                                                //     }
                                                // }
                                                
                                                // user.dispatch(asyncfetch());
                                                //--------------
                                                // user.dispatch(postUser(object));
                                               
                                                
                                                //--------------






                                                SetStep(1);
                                                CloseHandler();
                                                
                                                    
                                                    
                                            }}>Complete</button>
                                            
                                            </div>
                                            
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                            
                     
                            ,element))
                        }
                        
                    }
                    if(props.openL){
                        html.style.overflowY = 'hidden'; // заборона прокрутки сторінки
                        html.style.top = `-${scrollPosition}px`;
                        return(createPortal(
                                
                            <div className="modalreg-wrap">
                            <button onClick={()=>{
                                CloseHandlerL();
                            }} className="modal-close"><img className="img-fluid" src={close} alt="close-icon" /></button>
                            <div className="modal-window">
                                <h2 className="modal-title">Sign in your account</h2>
                                <h4 className="modal-subtitle">Provide your information</h4>
                                <div className="modal-main">
                                    <div className="modal-inputs">
                                        <input ref={signUsername} type="text" placeholder='Username' />
                                        <input ref={signPassword} type='password' placeholder="Password" />
                                        <button ref={btn} onClick={()=>{
                                            // object.username = username.current.value;
                                            // // object.password = password.current.value;
                                            signUsername.current.value = '';
                                            signPassword.current.value = '';
                                            // SetStep(2);
                                            //--------------------------
                                            // fetch('http://18.184.249.86/user/1')
                                            // .then(response => {
                                            //     if(response.ok){
                                                    
                                            //         object= response.json();
                                            //         console.log('objkect:',object)
                                            //         loadUser(object);
                                            //         props.Setsigned(true);
                                            //     }
                                            //     else{
                                            //         alert('This user doesn`t exist. Please, create account! ')
                                            //     }
                                               

                                            // })
                                          
                                            // .catch(error => {
                                            //   // Обробка помилок
                                            //   console.error('Error:', error);
                                            // });
                                            //--------------------------
                                            user.dispatch(GetUser());
                                            


                                            //--------------------------

                                            // loadUser(userProfile);
                                            // updateUserStatus();
                                            CloseHandlerL();
                                            
                                        }}>Log In</button>
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
            }
        </UserContext.Consumer>
    );


    //-------------------------------






    // if(props.openR){
    //     html.style.overflowY = 'hidden'; // заборона прокрутки сторінки
    //     html.style.top = `-${scrollPosition}px`;
    //     if(step === 1){
    //         return(createPortal(
                
    //             <div className="modalreg-wrap">
    //             <button onClick={()=>{
    //                 CloseHandler();
    //             }} className="modal-close"><img className="img-fluid" src={close} alt="close-icon" /></button>
    //             <div className="modal-progress">
    //                 <div className="progress-step">
    //                     <div className="step-box step-box-active">
    //                         <p className="m-0">1</p>
    //                     </div>
    //                     <p className="m-0">Account setup</p>
    //                 </div>
    //                 <div className="progress-step">
    //                     <div className="step-box">
    //                         <p className="m-0">2</p>
    //                     </div>
    //                     <p className="m-0">Account setup</p>
    //                 </div>
    //                 <div className="progress-step">
    //                     <div className="step-box">
    //                         <p className="m-0">3</p>
    //                     </div>
    //                     <p className="m-0">Account setup</p>
    //                 </div>
                    
                    
    //             </div>
    //             <div className="modal-window">
    //                 <h2 className="modal-title">Create your account</h2>
    //                 <h4 className="modal-subtitle">This is step 1</h4>
    //                 <div className="modal-main">
    //                     <div className="modal-inputs">
    //                         <input ref={username} type="text" placeholder='Username' />
    //                         <input ref={password} type='password' placeholder="Password" />
    //                         <button ref={btn} onClick={()=>{
    //                             object.username = username.current.value;
    //                             // object.password = password.current.value;
    //                             username.current.value = '';
    //                             password.current.value = '';
    //                             SetStep(2);
    //                         }}>Next</button>
    //                     </div>
    //                 </div>
                    
    //             </div>
    //         </div>
            
     
    //         ,element))
    //     }
    //     if(step === 2){
    //         return(createPortal(
           
    //             <div className="modalreg-wrap">
    //                 <button onClick={()=>{
    //                 CloseHandler();
    //             }} className="modal-close"><img className="img-fluid" src={close} alt="close-icon" /></button>
    //             <div className="modal-progress">
    //                 <div className="progress-step">
    //                     <div className="step-box step-box-active active-link">
    //                         <p className="m-0">1</p>
    //                     </div>
    //                     <p className="m-0">Account setup</p>
    //                 </div>
    //                 <div className="progress-step">
    //                     <div className="step-box step-box-active">
    //                         <p className="m-0">2</p>
    //                     </div>
    //                     <p className="m-0">Account setup</p>
    //                 </div>
    //                 <div className="progress-step">
    //                     <div className="step-box">
    //                         <p className="m-0">3</p>
    //                     </div>
    //                     <p className="m-0">Account setup</p>
    //                 </div>
                    
                    
    //             </div>
    //             <div className="modal-window">
    //                 <h2 className="modal-title">Compleate your account</h2>
    //                 <h4 className="modal-subtitle">Provide us your name</h4>
    //                 <div className="modal-main">
    //                     <div className="modal-inputs">
    //                         <input ref={fname} type="text" placeholder='First Name' />
    //                         <input ref={lname} type='text' placeholder="Last Name" />
    //                         <div className="button-wrap d-flex gap-5">
    //                         <button onClick={()=>SetStep(step-1)}>Previous</button>
    //                         <button ref={btn} onClick={()=>{
    //                             object.firstName = fname.current.value;
    //                             object.lastName = lname.current.value;
    //                             fname.current.value = '';
    //                             lname.current.value = '';
    //                             SetStep(3);
    //                         }}>Next</button>
    //                         </div>
                            
    //                     </div>
    //                 </div>
                    
    //             </div>
    //         </div>
            
     
    //         ,element))
    //     }
    //     if(step === 3){
    //         return(createPortal(
           
    //             <div className="modalreg-wrap">
    //                 <button onClick={()=>{
    //                 CloseHandler();
    //             }} className="modal-close"><img className="img-fluid" src={close} alt="close-icon" /></button>
    //             <div className="modal-progress">
    //                 <div className="progress-step">
    //                     <div className="step-box step-box-active active-link">
    //                         <p className="m-0">1</p>
    //                     </div>
    //                     <p className="m-0">Account setup</p>
    //                 </div>
    //                 <div className="progress-step">
    //                     <div className="step-box step-box-active active-link">
    //                         <p className="m-0">2</p>
    //                     </div>
    //                     <p className="m-0">Account setup</p>
    //                 </div>
    //                 <div className="progress-step">
    //                     <div className="step-box step-box-active">
    //                         <p className="m-0">3</p>
    //                     </div>
    //                     <p className="m-0">Account setup</p>
    //                 </div>
                    
                    
    //             </div>
    //             <div className="modal-window">
    //                 <h2 className="modal-title">Add more information</h2>
    //                 <h4 className="modal-subtitle">The last step</h4>
    //                 <div className="modal-main">
    //                     <div className="modal-inputs">
    //                         <input ref={tel} type="tel" placeholder='Contact Number' />
    //                         <input ref={loc} type="text" placeholder='Location' />
    //                         <div className="select-wrap d-flex gap-5">
    //                             <p>Are you searching team?</p>
    //                             <select ref={ready} name="select">
    //                             <option value="true">Yes</option>
    //                             <option value="false" selected>No</option>
    //                             </select>
    //                         </div>
    //                         <div className="button-wrap d-flex gap-5">
    //                         <button onClick={()=>SetStep(step-1)}>Previous</button>
    //                         <button ref={btn} onClick={()=>{
    //                             object.lookingForTeam = ready.current.value;
    //                             object.location = loc.current.value;
    //                             object.contacts = [{type: "PHONE",
    //                             value: tel.current.value,
    //                             shareable: true}];
                              
    //                             tel.current.value='';
    //                             ready.current.value='';
    //                             loc.current.value = '';
    
    //                             fetch('http://18.184.249.86/user', {
    //                                 method: 'POST',
    //                                 mode: 'cors',
    //                                 headers: {
    //                                   'Content-Type': 'application/json',
    //                                   'Accept': 'application/json' // Заголовок для встановлення типу медіа
    //                                 },
    //                                 body: JSON.stringify(object)
    //                               })
    //                                 .catch(error => {
    //                                   console.log(error);
    //                                 });
    //                             SetStep(1);
    //                             CloseHandler();
    //                         }}>Complete</button>
                            
    //                         </div>
                            
    //                     </div>
    //                 </div>
                    
    //             </div>
    //         </div>
            
     
    //         ,element))
    //     }
        
    // }
    // if(props.openL){
    //     html.style.overflowY = 'hidden'; // заборона прокрутки сторінки
    //     html.style.top = `-${scrollPosition}px`;
    //     return(createPortal(
                
    //         <div className="modalreg-wrap">
    //         <button onClick={()=>{
    //             CloseHandlerL();
    //         }} className="modal-close"><img className="img-fluid" src={close} alt="close-icon" /></button>
    //         <div className="modal-window">
    //             <h2 className="modal-title">Sign in your account</h2>
    //             <h4 className="modal-subtitle">Provide your information</h4>
    //             <div className="modal-main">
    //                 <div className="modal-inputs">
    //                     <input ref={signUsername} type="text" placeholder='Username' />
    //                     <input ref={signPassword} type='password' placeholder="Password" />
    //                     <button ref={btn} onClick={()=>{
    //                         // object.username = username.current.value;
    //                         // // object.password = password.current.value;
    //                         signUsername.current.value = '';
    //                         signPassword.current.value = '';
    //                         // SetStep(2);
    //                         fetch('http://18.184.249.86/user/1')
    //                         .then(response => response.json())
    //                         .then(data => {
    //                           // Обробка отриманих даних
    //                           console.log(data);
    //                         })
    //                         .catch(error => {
    //                           // Обробка помилок
    //                           console.error('Виникла помилка:', error);
    //                         });
    //                         CloseHandlerL();
                            
    //                     }}>Log In</button>
    //                 </div>
    //             </div>
                
    //         </div>
    //     </div>
        
 
    //     ,element))
    // }
    // else{
    //     return null;
    // }
}