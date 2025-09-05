import passport from "passport";
import { Strategy } from "passport-local";
import bcrypt from "bcrypt";
import {checkModel , getDeserializeInfo} from "../models/appModels.js";

export default passport.use(
    new Strategy ({usernameField:'email'}, async (email,password,done)=>{
        try{  
            const {rows} = await checkModel(email);

            if(rows.length == 0) {
                const error = new Error("User not found localAuth"); error.status = 404; throw error;
            }
            const [user] = rows;
            const {password_hash} = user;

            bcrypt.compare(password,password_hash,(err,valid)=>{
                // the done function takes 2 argument(error, user info found or not found)  i.e done(error, user( found || false) ); 
                
                // IF an error occured, done(err,null) or done(err)
                if (err) {
                    const error = new Error(err.message); error.status = 500; 
                    return done(error);
                } 

                if(!valid){
                    
                //if password is not valid from bycrypt the user becomes false hence done(null, false)
                    return done(null,false, {code:401});
                }
                // DELETE PASSWORD SO IT IS NOT SENT TO THE req.login
                delete user.password_hash;
                // user pasword is valid so it is true
                return done(null, user, {code:201});
            })
            

        } catch(err){
            return done(err,null);
        }
    })

)

// THIS IS USED TO PARSE USER INFORMATION INTO THE SESSION THAT IS UNIQUE TO 
// THE USER eg USER.ID, AND THIS ID IS ACCESSED EVERYWHERE , the user == findUser from the done(null,findUser);

passport.serializeUser((user,done)=>{
    done(null,user.id)
    // Tells passport to store user.id into the session data
})


passport.deserializeUser(async (id,done)=>{
    // takes the user.id (id above) passed from serialUser() to search the database 
    // and the response (user) found is saved in the Request(req) object to be assesed 
    // with req.isAuthenticated()

    try{
        const result = await getDeserializeInfo(id); 
        if(result.length == 0) throw new Error ("User not found deserialize");
         // The data that i want to be sent to the front-end
        const [user] = result;
        // const userData = {
        //     id : user.id,
        //     username : user.username,
        //     role : user.role,
        //     access: user.access,
        // }

        done(null,user);
    } catch(err){

        done(err,null);
    }

}); 