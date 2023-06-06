import React from "react";
import './header-banner.scss';
import UserContext from "../../UserContext";
import { useNavigate } from "react-router-dom";
import { loadAllTeamsActionCreator } from "../../Redux/teamsReducer";




export const HeaderBanner = function(){
    const navigate = useNavigate();
    // function GetAllTeams(){
    //     return function(dispatch){
    //         fetch('http://18.184.249.86/team')
    //         .then(response => response.json())
    //         .then(teams =>{
    //             dispatch(loadAllTeamsActionCreator(teams)); 
    //             // SetFlag(!flag);
    //         } );
        
    //     }
    // }
    
    return(
        <UserContext.Consumer>
            {
                (store) =>{
                    let state = store.getState();
                    
                    return(
                        <section className="header-banner">
                            <div className="header-banner-wrap">
                                <div className="header-banner-container">
                                    <h2 className="banner-text mb-3">Find the most exciting Team!</h2>
                                    <div className="banner-search d-flex">
                                        {/* <div className="search-input-wrap">
                                            <input className="search-input" placeholder="Enter teammate" type="text" onClick={(e)=>{
                                                // store.dispatch(updateKeywordActionCreator(e.target.value));
                                                // store.dispatch(LoadUsers());
                                                // console.log(state);
                                               
                                            }} />
                                        </div> */}
                                        {/* <div className="search-input-wrap">
                                            <input className="search-input" placeholder="Enter lorem" type="text" />
                                        </div> */}
                                 
                                        <input className="search-submit" value="Find Team" type="submit" onClick={()=>{
                                            navigate('/team-search');
                                            // store.dispatch(GetAllTeams());

                                        }} />
                                    </div>
                                </div>
                            </div>
                        </section>
                    );
                 
                }
            }
        </UserContext.Consumer>
    );


    // return(
    //     <section className="header-banner">
    //         <div className="header-banner-wrap">
    //             <div className="header-banner-container">
    //                 <h2 className="banner-text mb-3">Find the most exciting Team!</h2>
    //                 <div className="banner-search d-flex">
    //                     <div className="search-input-wrap">
    //                         <input className="search-input" placeholder="Enter teammate" type="text" />
    //                     </div>
    //                     {/* <div className="search-input-wrap">
    //                         <input className="search-input" placeholder="Enter lorem" type="text" />
    //                     </div> */}
                 
    //                     <input className="search-submit" value="Find Team" type="submit" />
    //                 </div>
    //             </div>
    //         </div>
    //     </section>
    // );
}
