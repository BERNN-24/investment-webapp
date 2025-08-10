import React, {createContext,useContext, useState} from "react";

const UserContext = createContext();

function useUser(){
    return useContext(UserContext);
}

function UserProvider({children}){
    const [thisUser, setThisUser] = useState(null);

    return (<UserContext.Provider value={{thisUser, setThisUser}}>
        {children}
    </UserContext.Provider>);
}

export default useUser;
export {UserProvider};