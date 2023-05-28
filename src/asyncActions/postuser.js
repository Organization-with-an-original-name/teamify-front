import { addUserActionCreator, updateUserStatusActionCreator } from "../Redux/userReducer";

export const postUser = (object) => {
    let ob = object;
    return function(dispatch){
        fetch('http://18.184.249.86/user',{
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json' 
            },
            body: JSON.stringify(ob)
            })
            .then(response =>{
                if(response.ok){
                    dispatch(addUserActionCreator(object));
                    dispatch(updateUserStatusActionCreator())
                    alert('Fetch doned');
                }
                else{
                    alert('Problem')
                }
                console.log(response)
            })
            .catch(error => {
            
              console.log(error);
            });
    }
}