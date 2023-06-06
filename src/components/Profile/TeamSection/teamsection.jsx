import React, { useContext, useEffect, useRef, useState } from "react";
import './teamsection.scss';
import UserContext from "../../../UserContext";
import { Link } from "react-router-dom";
import TeamCard from "./TeamCard/TeamCard";
import { createTeamActionCreator, loadMyTeamsActionCreator } from "../../../Redux/userReducer";


const TeamSection = function (){

    const mycontext = useContext(UserContext);
    const [flag, SetFlag] = useState(false);

    const LoadTeams = function(){
        return function(dispatch){
           fetch(`http://18.184.249.86/team?`, {
           })
          .then(response => response.json())
          .then(data =>{
               let temp = [];
               data.forEach(item =>{
                if(item.leaderId === mycontext.getState().user.profile.id){
                    temp.push(item);
                    // dispatch(createTeamActionCreator(item));
                  
                }
                dispatch(loadMyTeamsActionCreator(temp));
               });
               SetFlag(!flag);
           
               return data;
          })
          .catch(error => {
              console.error('Error:', error);
          });
        }
    } 
    useEffect(()=>{
        mycontext.dispatch(LoadTeams());
    }, [])
    
    return(
        <UserContext>
            {
                (user) =>{
                    let state = user.getState();
                    let teams = state.user.createdTeams;
                    console.log('Created teams:', teams)
                    return(
                        <section className="team-section">
                            <div className="team-section-wrap">
                                <h2 className="team-section-title mb-3">Created Teams:</h2>
                                <div className="team-section-container">
                                    {teams.map(team=><TeamCard data={team} />)}
                                </div>
                            </div>
                        </section>
                    );
                }
            }
        </UserContext>
    );
}
export default TeamSection;