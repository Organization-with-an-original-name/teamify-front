const ADD_USER= 'ADD-USER';
const UPDATE_STATUS= 'UPDATE-STATUS';
const DELETE_USER = 'DELETE-USER';
const LOAD_TOKEN  = 'LOAD-TOKEN';
const CREATE_TEAM = 'CREATE-TEAM';
const LOAD_TEAMS = 'LOAD-TEAMS';



let initialState =  {
    profile: {},
    isSigned: false,
    accessToken: '',
    createdTeams: []
   
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_USER:  
            state.profile = action.profile;
            state.isSigned = true;
            console.log('From reducer:', action.profile);
            // LoadTeams(state.profile.id);
            // state.createdTeams =[...LoadTeams(state.profile.id)];
            return state;
        case UPDATE_STATUS:  
            state.isSigned = true;
            return state;
        case DELETE_USER:  
            state.createdTeams = [];
            state.profile = {};
            state.isSigned = false;
            console.log('state:', state);
            return state;
        case LOAD_TOKEN:  
            state.accessToken = action.token;
            console.log('state:', state);
            return state;
        case CREATE_TEAM:  
            state.createdTeams.push(action.team);
            console.log('state:', state);
            return state;
        // case CREATE_TEAM:  
        //     state.createdTeams = action.teams;
        //     console.log('state:', state);
        //     return state;
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
export const loadAccessTokenActionCreator = (token) => {
    return {
        type: LOAD_TOKEN,
        token: token
        
    }
}
export const createTeamActionCreator = (team) => {
    return {
        type: CREATE_TEAM,
        team: team
        
    }
}
export const loadTeamsActionCreator = (teams) => {
    return {
        type: LOAD_TEAMS,
        teams: teams
        
    }
}
export default userReducer;