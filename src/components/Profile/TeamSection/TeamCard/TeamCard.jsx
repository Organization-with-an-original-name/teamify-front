import React, { useEffect, useRef, useState } from "react";
import './TeamCard.scss';
import { Link, useSearchParams } from "react-router-dom";
// import { Accordion } from 'react-bootstrap-accordion'



const TeamCard = function(props){

    return(
        <div className="teamcard">
            <div className="teamcard-wrap bg-light">
                <div className="teamcard-name d-flex">
                    <h4 className="m-0">Name:</h4>
                    <p className="m-0">"{props.data.name}"</p>
                </div>
                <Collapse description={props.data.description} id={props.data.leaderId}/>
               
               
               
              
  


            </div>
        </div>
    );
}

export function Collapse (props){
    const [collapsed, Setcollapsed] = useState(false);
    const descr = useRef();
    const colbtn = useRef();
    const title = useRef();
    useEffect(()=>{
        if(collapsed){
            descr.current.classList.add('disp-block');
            colbtn.current.classList.add('collapsed-btn');
            title.current.classList.add('collapse-title-active');

        }
        else{
            title.current.classList.remove('collapse-title-active');
            descr.current.classList.remove('disp-block');
            colbtn.current.classList.remove('collapsed-btn');
        }
       
    })

    return(
        <div className="collapse-body d-flex flex-column">
            <h4 ref={title} className="collapse-title m-0" onClick={()=>Setcollapsed(!collapsed)}>Description <svg ref={colbtn} onClick={()=>Setcollapsed(!collapsed)} className="notcollapsed-btn" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path d="m2.5 15.25l7.5-7.5l7.5 7.5l1.5-1.5l-9-9l-9 9z"/></svg></h4>
            <p ref={descr} className="collapse-text">{props.description}</p>
            {/* <p>{props.leaderId}</p> */}
        </div> 
    );
}
export default TeamCard;
