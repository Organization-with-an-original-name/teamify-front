import React, { useEffect, useRef, useState } from "react";
import './profile.scss';
import UserContext from "../../UserContext";
import { Link } from "react-router-dom";
import person from '../../assets/img/human.jpeg';
import fb from '../../assets/icon/fb.png';
import inst from '../../assets/icon/inst.png';
import linked from '../../assets/icon/linked.png';
import tg from '../../assets/icon/tg.png';
import avaliable from '../../assets/icon/check.png';
import Notavaliable from '../../assets/icon/exclamation.png';


function Profile (props) {


    return(
       <UserContext.Consumer>
            {
                (user) =>{
                    let profile = user.getState().user.profile;
                    return(
                        <section className="profile mt-5">
                            <div className="profile-wrap">
                                <div className="profile-header">
                        
                                </div>
                                <div className="profile-main">
                                    <div className="row p-5 m-0">
                                        <div className="profile-left d-flex flex-column col-lg-5 col-md-12">
                                            <div className="profile-img">
                                                <img src={person} alt="" />
                                            </div>
                                           
                                            {
                                            profile.lookingForTeam === true?
                                                <p className="profile-status"><img src={avaliable} alt="check" /> Looking for a Team!</p>
                                            :
                                                <p className="profile-status"><img src={Notavaliable} alt="check" /> Not needing a Team!</p>
                                            }
                                            <button className="provile-btn"></button>
                                        </div>
                                        <div className="profile-desct col-lg-7 col-md-12">
                                            <h2 className="m-0 profile-name">Hi, I`m <span>{profile.firstName} {profile.lastName}</span></h2>
                                            <h4 className="profile-position mb-4">web-developer & web-designer</h4>
                                            <p className="profile-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quam, dolorem sunt. Ratione molestiae voluptas esse deleniti incidunt fuga possimus cumque fugit adipisci placeat beatae laboriosam debitis ipsa consequuntur, asperiores accusantium.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quam, dolorem sunt. Ratione molestiae voluptas esse deleniti incidunt fuga possimus cumque fugit adipisci placeat beatae laboriosam debitis ipsa consequuntur, asperiores accusantium.</p>
                                            <hr />
                                            <div className="profile-details">
                                                <div className="row p-0 m-0">
                                                    <div className="col-6 p-0">
                                                        <div className="details-line">
                                                            Age: <span className="details-value">value</span>
                                                        </div>
                                                        <div className="details-line">
                                                            Age: <span className="details-value">value</span>
                                                        </div>
                                                        <div className="details-line">
                                                            Address: <span className="details-value">{profile.location}</span>
                                                        </div>
                                                    </div>
                                                    <div className="col-6 p-0">
                                                     
                                                            <div className="details-line">
                                                                Age: <span className="details-value">value</span>
                                                            </div>
                                                            <div className="details-line">
                                                                Age: <span className="details-value">value</span>
                                                            </div>
                                                            <div className="details-line">
                                                                Age: <span className="details-value">value</span>
                                                            </div>
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="profile-social">
                                                <p>Social Links</p>
                                                <div className="social-line d-flex gap-3 align-items-center">
                                                  
                                                    <a href="#"><img src={fb} alt="link" /></a>
                                                    <a href="#"><img src={inst} alt="link" /></a>
                                                    <a href="#"><img src={linked} alt="link" /></a>
                                                    <a href="#"><img src={tg} alt="link" /></a>
                                                 
                                                </div>
                                            </div>
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

export default Profile;