import React, { useEffect, useRef, useState } from "react";
import './history.scss';
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../UserContext";
import { deleteAssignedActionCreator, deleteSubmittedActionCreator, loadAssignedActionCreator, loadSubmittedActionCreator } from "../../Redux/userReducer";
import send from '../../assets/icon/send.png';
import request from '../../assets/icon/request.png';
import happy from '../../assets/icon/happy.png';
import unhappy from '../../assets/icon/unhappy.png';



const History = function(props){
   
    const mycontext= useContext(UserContext);
    const [applications, setApplications] = useState([]);
    const [flag, SetFlag] = useState(false);

    // useEffect(()=>alert('H rendering'))
    // let applicationsId = [];
    const getSubmitted = function(acessToken){
        return function(dispatch){
            fetch('http://18.184.249.86/application/submitted',{
            method: "GET",
            mode : "cors",
            headers:{
                  "Content-type": "application/json",
                  "Accept":"application/json",
                  "Access-token" : acessToken
            }
        })
        .then(response => {
            if(response.ok){
               
                return response.json();
               
       
            }
            else{
                alert('Some error was occured!')
            }
        })
        .then(data =>{ 
            console.log('Data:', data)
            dispatch( loadSubmittedActionCreator(data));
            SetFlag(!flag);

        })
        .catch(error => console.log('Error:', error))
        }

    }
    const getAssigned = function(acessToken){
        return function(dispatch){
            fetch('http://18.184.249.86/application/assigned',{
            method: "GET",
            mode : "cors",
            headers:{
                  "Content-type": "application/json",
                  "Accept":"application/json",
                  "Access-token" : acessToken
            }
        })
        .then(response => {
            if(response.ok){
               
                return response.json();
               
       
            }
            else{
                alert('Some error was occured!')
            }
        })
        .then(data =>{ 
            console.log('Data:', data)
            dispatch(loadAssignedActionCreator(data));
            SetFlag(!flag);

        })
        .catch(error => console.log('Error:', error))
        }

    }

    useEffect(()=>{
      
        mycontext.dispatch(getSubmitted(mycontext.getState().user.accessToken));
        mycontext.dispatch(getAssigned(mycontext.getState().user.accessToken));
        // console.log('tupich:', applications)
    }, [])



    return(
        <UserContext.Consumer>
            {
                (store) =>{
                    let state = store.getState();
                    return(
                        <section className="history">
                            <button onClick={()=>{
                                SetFlag(!flag);
                            }}>Reset</button>
                            {state.user.profile.id}
                            <div className="history-wrap">
                                <div className="container history-container">
                                    <h2 className="history-title">My History:</h2>
                                    {state.user.submitted.map(item => <SubmittedItem flag={flag} setflag={SetFlag} data={item} />)}
                                    <h2 className="mt-4 history-title">My Requests:</h2>
                                    {state.user.assigned.map(item => <AssignedItem flag={flag} setflag={SetFlag} data={item} />)}
                                </div>
                            </div>
                        </section>
                    );
                }
            }
        </UserContext.Consumer>
    );
}

export default History;

const SubmittedItem = function(props){

    const [flag, SetFlag] = useState(false);

    const [itemstate, setItemState] = useState({});
    const mycontext = useContext(UserContext);

    const getTeam = function(id){

        fetch(`http://18.184.249.86/team/${id}`)
            .then(response => {
            if(response.ok){
               
                return response.json();
               
       
            }
            else{
                alert('Some error was occured!')
            }
        })
        .then(data =>{ 
            console.log('Data pro timku:', data)
            setItemState(data);
            props.setflag(!props.flag);


        })
        .catch(error => console.log('Error:', error))
      
    }
    const deleteASS = function(id, accessToken){
        fetch(`http://18.184.249.86/application/${id}`,{
            method: 'DELETE',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              "Access-token" : accessToken
            },
        })
        
        .then(response => {
        if(response.ok){
            SetFlag(!flag);
            return response.json();
           
   
        }
        else{
            alert('Some error was occured!')
        }
    })
    // .then(data =>{ 
    //     console.log('Data from delete:', data);
    //     SetFlag(!flag)
       
     


    // })
    
    .catch(error => console.log('Error:', error))
    }
    
    useEffect(()=>{
        getTeam(props.data.teamId);
    }, [])

    if(props.data.status === 'NEW'){
        return(
        
            <div className="hisitem">
                <div className="hisitem-wrap d-flex align-items-center">
                    <p className="m-0 p-3"><span className="hisitem-icon"><img src={send} alt="send" /></span> Your application to <span className="team-name">"{itemstate.name}"</span> was succesfully sended!</p>
                    
                </div>
            </div>
        );
    }
    else if(props.data.status === 'REJECTED'){
        return(
        
            <div className="hisitem">
                <div className="hisitem-wrap d-flex align-items-center">
                    <p className="m-0 p-3"><span className="hisitem-icon"><img src={unhappy} alt="send" /></span> Your application to <span className="team-name">"{itemstate.name}"</span> was <span className="rejected">rejected</span> !</p>
                    
                </div>
            </div>
        );
    }
    else {
        return(
        
            <div className="hisitem">
                <div className="hisitem-wrap d-flex align-items-center">
                    <p className="m-0 p-3"><span className="hisitem-icon"><img src={happy} alt="send" /></span> Your application to <span className="team-name">"{itemstate.name}"</span> was <span className="approved">approved!</span> !</p>
                    <div className="hisitem-close">
                        <button className="hisitem-close-btn" onClick={()=>{
                            //  store.dispatch(deleteAssignedActionCreator(props.data));
                            let state = mycontext.getState();
                            //!!! deleteASS(props.data.id, state.user.accessToken);
                            mycontext.dispatch(deleteSubmittedActionCreator(props.data));
                            props.setflag(!props.flag);
                            
                            
                        }}>X</button>
                    </div>
                    
                </div>
            </div>
        );
    }

   
}

const AssignedItem = function(props){
    const [flag, SetFlag] = useState(false);

   
    const [itemstate, setItemState] = useState({});
    const [userstate, setUserState] = useState({});


    const approve = function(id, accessToken){
        fetch(`http://18.184.249.86/application/${id}/approve`,{
            method: 'PATCH',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              "Access-token" : accessToken
            },
        })
        
        .then(response => {
        if(response.ok){
           
            return response.json();
           
   
        }
        else{
            alert('Some error was occured!')
        }
    })
    .then(data =>{ 
        console.log('Data pro approve:', data);
        SetFlag(!flag)
       
     


    })
    
    .catch(error => console.log('Error:', error))
    }
    const disapprove = function(id, accessToken){
        fetch(`http://18.184.249.86/application/${id}/reject`,{
            method: 'PATCH',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              "Access-token" : accessToken
            },
        })
        
        .then(response => {
        if(response.ok){
           
            return response.json();
           
   
        }
        else{
            alert('Some error was occured!')
        }
    })
    .then(data =>{ 
        console.log('Data pro approve:', data);
        SetFlag(!flag)
       
     


    })
    
    .catch(error => console.log('Error:', error))
    }
    // const deleteASS = function(id, accessToken){
    //     fetch(`http://18.184.249.86/application/${id}`,{
    //         method: 'DELETE',
    //         mode: 'cors',
    //         headers: {
    //           'Content-Type': 'application/json',
    //           'Accept': 'application/json',
    //           "Access-token" : accessToken
    //         },
    //     })
        
    //     .then(response => {
    //     if(response.ok){
           
    //         return response.json();
           
   
    //     }
    //     else{
    //         alert('Some error was occured!')
    //     }
    // })
    // // .then(data =>{ 
    // //     console.log('Data from delete:', data);
    // //     SetFlag(!flag)
       
     


    // // })
    
    // .catch(error => console.log('Error:', error))
    // }

    const getTeam = function(id){

        fetch(`http://18.184.249.86/team/${id}`)
            .then(response => {
            if(response.ok){
               
                return response.json();
               
       
            }
            else{
                alert('Some error was occured!')
            }
        })
        .then(data =>{ 
            console.log('Data pro timku:', data)
            setItemState(data);
          
           
           
         


        })
    
      
        
        .catch(error => console.log('Error:', error))
      
    }
    const getUser= function(id){

        fetch(`http://18.184.249.86/user/${id}`)
            .then(response => {
            if(response.ok){
               
                return response.json();
               
       
            }
            else{
                alert('Some error was occured!')
            }
        })
        .then(data =>{ 
            console.log('Data pro usera:', data)
            setUserState(data);
          
           
        
            


        })
        .catch(error => console.log('Error:', error))
      
    }

   
          

    
    useEffect(()=>{
        getTeam(props.data.teamId);
        getUser(props.data.applicantId);
        
        
        
       
    }, [])
   
    return(
        <UserContext.Consumer>
            {
                (store) =>{
                    let state = store.getState();
                    return(
     
                        <div className="assitem">
                            <div className="hisitem-wrap d-flex align-items-center">
                                <p className="m-0 p-3"><span className="hisitem-icon"><img src={request} alt="send" /></span> <span className="username">@{userstate.username}</span> want to join your team: <span className="team-name">"{itemstate.name}"</span>!</p>
                                <div className="hisitem-controls">
                                    <button className="hisitem-controls-btn btn-yes" onClick={()=>{
                                        approve(props.data.id, state.user.accessToken);
                                        store.dispatch(deleteAssignedActionCreator(props.data));
                                        // deleteASS(props.data.id, state.user.accessToken);
                                       
                                    }}>Yes</button>
                                    <button className="hisitem-controls-btn btn-no" onClick={()=>{
                                         disapprove(props.data.id, state.user.accessToken);
                                         store.dispatch(deleteAssignedActionCreator(props.data));
                                        //  deleteASS(props.data.id, state.user.accessToken);
                                    }}>No</button>
                                </div>
                            </div>
                        </div>
                    );
                }   
            }
        </UserContext.Consumer>
    );

    // return(
     
    //     <div className="assitem">
    //         <div className="hisitem-wrap d-flex align-items-center">
    //             <p className="m-0 p-3"><span className="hisitem-icon"><img src={request} alt="send" /></span> <span className="username">@{userstate.username}</span> want to join your team: <span className="team-name">"{itemstate.name}"</span>!</p>
    //             <div className="hisitem-controls">
    //                 <button className="hisitem-controls-btn btn-yes" onClick={()=>{
    //                     approve(props.data.id, )
    //                 }}>Yes</button>
    //                 <button className="hisitem-controls-btn btn-no">No</button>
    //             </div>
    //         </div>
    //     </div>
    // );
}