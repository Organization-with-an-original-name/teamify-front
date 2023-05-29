const ADD_USER= 'ADD-USER';
const UPDATE_STATUS= 'UPDATE-STATUS';
const DELETE_USER = 'DELETE-USER';

let initialState =  {
    profile: {},
    isSigned: false,
   
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_USER:  
            state.profile = action.profile;
            state.isSigned = true;
            console.log('From reducer:', action.profile)
            return state;
        case UPDATE_STATUS:  
            state.isSigned = true;
            return state;
        case DELETE_USER:  
            state.profile = {};
            state.isSigned = false;
            console.log('state:', state);
            return state;
        default:
            return state;
    }
}
export const addUserActionCreator = (userToAdd) => {
    return {
        type: ADD_USER,
        profile: userToAdd
    }
}
export const updateUserStatusActionCreator = () => {
    return {
        type: UPDATE_STATUS,
        
    }
}
export const deleteUserStatusActionCreator = () => {
    return {
        type: DELETE_USER,
        
    }
}
export default userReducer;