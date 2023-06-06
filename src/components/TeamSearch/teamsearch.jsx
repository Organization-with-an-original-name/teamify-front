import React, { useEffect, useRef, useState } from "react";
import './teamsearch.scss';
import { Link, NavLink, useNavigate } from "react-router-dom";
import { loadAllTeamsActionCreator } from "../../Redux/teamsReducer";
import UserContext from "../../UserContext";
import { Collapse } from "../Profile/TeamSection/TeamCard/TeamCard";
import { useContext } from "react";

const TeamSearch = function(props){
    const navigate = useNavigate();
    const mycontext = useContext(UserContext);
    console.log(mycontext.getState())
    
    const [flag, SetFlag] = useState(false);
  
    function GetAllTeams(){
        return function(dispatch){
            fetch('http://18.184.249.86/team')
            .then(response => response.json())
            .then(teams =>{
                dispatch(loadAllTeamsActionCreator(teams));
                SetFlag(!flag);
            } );
        
        }
    }
  
    useEffect(()=>{
        mycontext.dispatch(GetAllTeams());
        
    }, [])
   

    return(
        <UserContext.Consumer>
            {
                (store) =>{
                    let state = store.getState();
                    // store.dispatch(GetAllTeams());
                    
                
                    let teams = state.teams.allteams;
                    return(
                     
                        <section className="team-search">
                            <div className="team-search-wrap">
                                <div className="container search-container p-0">
                                    <h2 className="search-title mt-4"> Avaible teams:</h2>
                                    {teams.map(team=> <TeamSCard flag={flag} SetFlag={SetFlag} data={team}/>)}
                                    
                                </div>
                            </div>
                            
                        </section>
                    );
                }
                
            }
        </UserContext.Consumer>
    );
}

const TeamSCard = function(props){
    return(
        <UserContext.Consumer>
            {
                (user) => {
                    let state = user.getState();
                   
                    return(
                        props.data.leaderId === state.user.profile.id?
                        <div className="teamcard">
                            <div className="teamcard-wrap bg-light">
                                <div className="teamcard-name d-flex">
                                    <h4 className="m-0">Name:</h4>
                                    <p className="m-0">"{props.data.name}"</p>
                                    <div className="teamcard-sub">
                                        <button disabled className="disabled teamcard-sub-btn" onClick={()=>alert('You`re the owner of this team!')}>Send request</button>
                                    </div>
                                </div>
                                <Collapse description={props.data.description}/>
                            </div>
                         </div>
                         :
                         <div className="teamcard">
                            <div className="teamcard-wrap bg-light">
                                <div className="teamcard-name d-flex">
                                    <h4 className="m-0">Name:</h4>
                                    <p className="m-0">"{props.data.name}"</p>
                                    <div className="teamcard-sub">
                                        <button className="teamcard-sub-btn">Send request</button>
                                    </div>
                                </div>
                                <Collapse description={props.data.description}/>
                            </div>
                         </div>
                    );
                    
                }
            }
        </UserContext.Consumer>
    );

    // return(
        // <div className="teamcard">
        //     <div className="teamcard-wrap bg-light">
        //         <div className="teamcard-name d-flex">
        //             <h4 className="m-0">Name:</h4>
        //             <p className="m-0">"{props.data.name}"</p>
        //             <div className="teamcard-sub">
        //                 <button className="teamcard-sub-btn">Send request</button>
        //             </div>
        //         </div>
        //         <Collapse description={props.data.description}/>
        //     </div>
        // </div>
    // );
}
// const TeamCard = function(props){
    
//     return(
//         <div className="team-card">
//             <div className="team-card-wrap">
//                 <div className="team-card-container">
//                     <div className="team-card-img"></div>
//                     <div className="team-card-name">{props.data.name}</div>
//                     <div className="team-card-descr">{props.data.description}</div>
//                     <div className="team-card-controls">
//                         <button>-</button>
//                         <button>+</button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

export default TeamSearch;