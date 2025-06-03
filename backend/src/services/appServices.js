import bcrypt from "bcrypt";
import {checkModel} from "../models/appModels.js";
import { addUserModel } from "../models/appModels.js";



// REGISTER USERS 
export async function registerService(body){
    const saltRound = 10;
  try{
    const {email,password} = body;
    const result = await checkModel(email);
    if (result) {
       
         const error = new Error ('!! User Found !!');
                error.status = 401; 
                throw error;
    }

     const response= await new Promise((resolve,reject)=>{
        bcrypt.hash(password, saltRound, async (err, hash)=>{
            if(err)
                 {
                const error = new Error ('Unable to register, try again');
                error.status = 500; 
                 reject(err) 
                 }
            try
            {
                const newUser = await addUserModel(email,hash);
                return resolve(newUser);
            }
            catch(dberror)
            {
                reject(dberror);
            }
                // INSERT INTO USERS (email,hash)  sql code 
        })
     });
     console.log(response);
     return response;
    

    } catch (err){
        throw (err);
    }

}



// CHECK IF THIS CUSTOM ERROR HANDLING HANDLER CONSTRUCTOR WILL WORK
// const ErrorHandling = (message,status)=>{
//     this.message = message;
//     this.status = status;
//     const error = new Error (message);
//     error.status(status);
//     throw error;
// };

// USAGE
 // new ErrorHandling('User found services',400);
