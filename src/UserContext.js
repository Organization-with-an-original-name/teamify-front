import React from "react";


const UserContext = React.createContext(null);

export const Provider = (props) =>{
    return <UserContext.Provider value={props.store}>
        {props.children}
    </UserContext.Provider>
} 

export default UserContext;