const ADD_USER= 'ADD-USER';
const UPDATE_STATUS= 'UPDATE-STATUS';
const DELETE_USER = 'DELETE-USER';
const LOAD_TOKEN  = 'LOAD-TOKEN';
const CREATE_TEAM = 'CREATE-TEAM';
const LOAD_MYTEAMS = 'LOAD-MYTEAMS';
const LOAD_TEAMS = 'LOAD-TEAMS';
const DELETE_ASS = 'DELETE-ASS';
const DELETE_SUB = 'DELETE-SUB';

const LOAD_SUB = 'LOAD-SUB';
const LOAD_ASS = 'LOAD-ASS';



let initialState =  {
    profile: {},
    isSigned: false,
    accessToken: '',
    createdTeams: [],
    assigned: [],
    submitted: []
   
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_USER:  
            state.profile = action.profile;
            state.isSigned = true;
         
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
            state.assigned = [];
            state.submitted = [];
            state.accessToken = '';
        
            return state;
        case LOAD_TOKEN:  
            state.accessToken = action.token;
         
            return state;
        case CREATE_TEAM:  
            state.createdTeams.push(action.team);
          
            return state;
        case LOAD_SUB:  
            state.submitted = action.sub;
            console.log('Sub:', state);
            return state;
        case LOAD_ASS:  
            state.assigned = action.ass;
            console.log('Ass:', state);
            return state;
        case LOAD_MYTEAMS:  
            state.createdTeams= action.teams;
            console.log('My:', state.createdTeams);
            return state;
        case DELETE_ASS:  
           state.assigned = state.assigned.filter((item) =>{
                if(item.id != action.ass.id){
                    return item;
                }
           })
            console.log('DEL ASS:', state.createdTeams);
            return state;
        case DELETE_SUB:  
            state.submitted= state.submitted.filter((item) =>{
                 if(item.id != action.sub.id){
                     return item;
                 }
            })
             console.log('DEL SUB:', state.createdTeams);
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
export const loadMyTeamsActionCreator = (teams) => {
    return {
        type: LOAD_MYTEAMS,
        teams: teams
        
    }
}
export const loadSubmittedActionCreator = (apps) => {
    return {
        type: LOAD_SUB,
        sub: apps
        
    }
}
export const loadAssignedActionCreator = (apps) => {
    return {
        type: LOAD_ASS,
        ass: apps
        
    }
}
export const deleteAssignedActionCreator = (ass) => {
    return {
        type: DELETE_ASS,
        ass: ass
        
    }
}
export const deleteSubmittedActionCreator = (sub) => {
    return {
        type: DELETE_SUB,
        sub: sub
        
    }
}
export default userReducer;