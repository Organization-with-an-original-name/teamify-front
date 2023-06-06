const LOAD_ALL_TEAMS= 'LOAD-ALL-TEAMS';
// const UPDATE_KEY= 'UPDATE-KEY';
// const DELETE_USER = 'DELETE-USER';

let initialState =  {
   allteams: []
   
}

const teamsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ALL_TEAMS:  
            state.allteams = action.allteams;
            console.log('From reducer:', state.allteams)
            return state;
        // case UPDATE_KEY:  
        //     state.keyword = action.keyword;
        //     return state;
        // case DELETE_USER:  
        //     state.profile = {};
        //     state.isSigned = false;
        //     console.log('state:', state);
        //     return state;
        default:
            return state;
    }
}
export const loadAllTeamsActionCreator = (allteams) => {
    return {
        type: LOAD_ALL_TEAMS,
        allteams: allteams
    }
}
// export const updateKeywordActionCreator = (key) => {
//     return {
//         type: UPDATE_KEY,
//         keyword: key
        
//     }
// }
// export const deleteUserStatusActionCreator = () => {
//     return {
//         type: DELETE_USER,
        
//     }
// }
export default teamsReducer;