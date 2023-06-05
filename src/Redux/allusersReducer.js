const LOAD_USERS= 'LOAD-USERS';
const UPDATE_KEY= 'UPDATE-KEY';
// const DELETE_USER = 'DELETE-USER';

let initialState =  {
    userlist: [],
    keyword: '',
   
}

const allusersReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_USERS:  
            state.userlist = action.users;
            console.log('From reducer:', state.userlist)
            return state;
        case UPDATE_KEY:  
            state.keyword = action.keyword;
            return state;
        // case DELETE_USER:  
        //     state.profile = {};
        //     state.isSigned = false;
        //     console.log('state:', state);
        //     return state;
        default:
            return state;
    }
}
export const loadUsersActionCreator = (userslist) => {
    return {
        type: LOAD_USERS,
        users: userslist
    }
}
export const updateKeywordActionCreator = (key) => {
    return {
        type: UPDATE_KEY,
        keyword: key
        
    }
}
// export const deleteUserStatusActionCreator = () => {
//     return {
//         type: DELETE_USER,
        
//     }
// }
export default allusersReducer;