import React from "react";
import './createteam.scss';
import { Link } from "react-router-dom";

export const Createteam = function (){
    return(
        <section className="createteam mt-5">
            <div className="createteam-wrap">
                <div className="createteam-items">
                    <h4 className="createteam-undertitle">Lorem ipsum dolor sit amet</h4>
                    <h1 className="createteam-title mb-5">Create your own team and enjoy your experiance now!</h1>
                    <Link className="createteam-btn" to='/create-team'>Create Team</Link>
                </div>
            </div>
        </section>
    );
}