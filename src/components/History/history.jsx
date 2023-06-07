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
import empty from '../../assets/icon/box.png';


const History = function(props){
   
    const mycontext= useContext(UserContext);
    const [applications, setApplications] = useState([]);
    const [flag, SetFlag] = useState(false);
    const [flag1, SetFlag1] = useState(false);
    const [flag2, SetFlag2] = useState(false);

    // useEffect(()=>alert(mycontext.getState().user.assigned.length))
    // let applicationsId = []; applications.length
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
            SetFlag1(!flag1);

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
            SetFlag2(!flag2);

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
                        <section className="history mt-5">
                            
                        
                            <div className="history-wrap">
                                <div className="container history-container">
                                <button className="reset-btn" onClick={()=>{
                                SetFlag(!flag);
                                    }}></button>
                                    <h2 className="history-title">My History:</h2>
                                    {state.user.submitted.length === 0?
                                    <div className="history-noitems">Empty <img src={empty} alt="box" /></div>
                                    :
                                    state.user.submitted.map(item => <SubmittedItem flag={flag} setflag={SetFlag} data={item} />)
                                    }
                                    <h2 className="mt-4 history-title">My Requests:</h2>
                                    {state.user.assigned.length === 0?
                                        <div className="history-noitems">Empty <img src={empty} alt="box" /></div>
                                    :
                                    state.user.assigned.map(item => <AssignedItem flag={flag} setflag={SetFlag} data={item} />)
                                    }
                                    
            
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
    .catch(error => console.log('Error:', error))
    }
    

    useEffect(()=>{
        async function fetchData() {
            const response = await fetch(`http://18.184.249.86/team/${props.data.teamId}`);
            const json = await response.json();
            setItemState(json);
        }
        fetchData();
       
        // getTeam(props.data.teamId);
    },[]);
    
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
                    <div className="hisitem-close">
                        <button className="hisitem-close-btn" onClick={()=>{
                            //  store.dispatch(deleteAssignedActionCreator(props.data));
                            let state = mycontext.getState();
                            deleteASS(props.data.id, state.user.accessToken);
                            mycontext.dispatch(deleteSubmittedActionCreator(props.data));
                            props.setflag(!props.flag);
                            
                            
                        }}></button>
                    </div>
                    
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
                            deleteASS(props.data.id, state.user.accessToken);
                            mycontext.dispatch(deleteSubmittedActionCreator(props.data));
                            props.setflag(!props.flag);
                            
                            
                        }}></button>
                    </div>
                    
                </div>
            </div>
        );
    }
}

//--------------------------
const AssignedItem = function(props){
    const [flag, SetFlag] = useState(false);
    const yes = useRef();
    const no = useRef();
   
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
                                    <button ref={yes} className="hisitem-controls-btn btn-yes" onClick={()=>{
                                        approve(props.data.id, state.user.accessToken);
                                        // store.dispatch(deleteAssignedActionCreator(props.data));
                                        yes.current.classList.add('disabled-btn');
                                        no.current.classList.remove('disabled-btn');
                                        
                                       
                                    }}>Yes</button>
                                    <button ref={no} className="hisitem-controls-btn btn-no" onClick={()=>{
                                         disapprove(props.data.id, state.user.accessToken);
                                        //  store.dispatch(deleteAssignedActionCreator(props.data));
                                        no.current.classList.add('disabled-btn');
                                        yes.current.classList.remove('disabled-btn');
                                       
                                    }}>No</button>
                                </div>
                            </div>
                        </div>
                    );
                }   
            }
        </UserContext.Consumer>
    );
}