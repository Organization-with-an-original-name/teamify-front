import React, { useEffect, useRef, useState } from "react";
import './teamsection.scss';
import UserContext from "../../../UserContext";
import { Link } from "react-router-dom";
import TeamCard from "./TeamCard/TeamCard";


const TeamSection = function (){
    
    return(
        <UserContext>
            {
                (user) =>{
                    let state = user.getState();
                    let teams = state.user.createdTeams;
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