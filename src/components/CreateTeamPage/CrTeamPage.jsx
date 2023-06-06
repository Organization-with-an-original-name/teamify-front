import React, { useEffect, useRef, useState } from "react";
import './CrTeamPage.scss';
import UserContext from "../../UserContext";
import { Link, NavLink, useNavigate } from "react-router-dom";
import pointed from '../../assets/img/pointedleft.png';
import { createTeamActionCreator } from "../../Redux/userReducer";


const CreateTeamPage = function(props){

    const navigate = useNavigate();
    const nameRef = useRef();
    const descrRef = useRef();
    const inputs = [nameRef, descrRef];
    let object = {};
    // object.leaderId = 

    const CreateHandler = function (acessToken){
       return function(dispatch){
        fetch('http://18.184.249.86/team', {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              "Access-token" : acessToken
            },
            body: JSON.stringify(object)
          })
            .then(response =>{
                if(response.ok){
                    alert('Team was created!');
                    // dispatch(createTeamActionCreator(object));
                    navigate('/');
                
                }   
                else{
                    alert('This team already exists!')
                }
            })
            .catch(error => {
              
                console.error('Error:', error);
            });
       }
    }
    const ClearInputs = function(){
        inputs.forEach(input => input.current.value = '');
    }

    return(
        <UserContext.Consumer>
            {
                (user) =>{
                    let state = user.getState();
                    object.leaderId= state.user.profile.id;
                    console.log(object.leaderId);

                    return(
                        <section className="create-team-page">
                            <div className="create-team-page-wrap">
                                <div className="create-team-page-banner"></div>
                                <div className="container mt-3">
                                    <div className="create-team-page-head">
                                        <h2 className="p-0">Create your Team</h2>
                                        
                                    </div>
                                    <p className="create-team-page-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, nihil atque alias amet inventore suscipit dolor! Quaerat quis atque, iusto temporibus incidunt modi. Eaque dolores exercitationem quod dolor. Incidunt, quas.</p>
                                    <div className="row">
                                        <div className="col-6 create-team-page-head-form">
                                            <h4 className="form-title">Name:</h4>
                                            <input ref={nameRef} className="form-input" type="text" placeholder="Name" onChange={(e)=>{
                                                object.name = e.target.value;
                                            }}/>
                                            <h4 className="form-title">Description</h4>
                                            <textarea ref={descrRef} className="form-input form-textarea" name="form-descr" placeholder="Description" onChange={(e)=>{
                                                object.description = e.target.value;
                                            }} ></textarea>
                                            <button onClick={()=>{
                                                user.dispatch(CreateHandler(state.user.accessToken));
                                                ClearInputs();
                                              
                                                
                                            }} className="form-submit"></button>
                                        </div>
                                        <div className="col-6 pointed-man">
                                            <img className="pointed-man-img" src={pointed} alt="" />
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </section>
                    );
                    
                }
            }
        </UserContext.Consumer>
    );
 


}

export default CreateTeamPage;