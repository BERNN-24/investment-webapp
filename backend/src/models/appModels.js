
import loginData from "../../loginData.js";


export function checkModel(email){
        // sql, SELECT email from USERS where email == email 
        const user = loginData.find((user)=> user.email == email);
        if(user) return true;
        return false;
       
}

export async function addUserModel (email,hash){
    // sql INSERT INTO Users email,password returning *;
    loginData.push({"email": email, "password": hash});
    const addedUser = loginData.find((user)=>user.email == email);
    return addedUser;
}