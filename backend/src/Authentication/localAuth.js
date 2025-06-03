import passport from "passport";
import { Strategy } from "passport-local";
import bcrypt from "bcrypt";
import loginData from "../../loginData.js";

export default passport.use(
    new Strategy ({usernameField:'email'}, (email,password,done)=>{
        try{  
            // sql code: SELECT * from user(table for login) Where userEmail(column) == email
            const findUser = loginData.find((user)=> user.email == email);

            if(!findUser) {
                const error = new Error("User not found localAuth"); error.status = 404; throw error;
            }

            let databasePass = findUser.password;

            bcrypt.compare(password,databasePass,(err,valid)=>{
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
                // user pasword is valid so it is true
                return done(null,findUser, {code:201});
            })
            

        } catch(err){
            return done(err,null);
        }
    })

)

// THIS IS USED TO PARSE USER INFORMATION INTO THE SESSION THAT IS UNIQUE TO 
// THE USER eg USER.ID, AND THIS ID IS ACCESSED EVERYWHERE , the user == findUser from the done(null,findUser);

passport.serializeUser((user,done)=>{
    done(null,user.email)
    // Tells passport to store user.id into the session data
})


passport.deserializeUser((id,done)=>{
    // takes the user.id (id above) passed from serialUser() to search the database 
    // and the response (user) found is saved in the Request(req) object to be assesed 
    // with req.isAuthenticated()

    try{
        // write the sql code
        const user = loginData.find((user)=> user.email == id);

        if(!user) throw new Error ("User not found deserialize");

        done(null,user);
    } catch(err){

        done(err,null);
    }

}); 