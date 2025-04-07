import React from "react";
import { createContext, useState, useEffect, Children } from "react";

export const AuthContext= createContext();

const AuthProvider=({children})=>{
    const [user,setUser]=useState(null);

    useEffect(()=>{
        const token=localStorage.getItem("token");
        if(token){
            setUser(token);
        }
    },[]);

    const login=(token)=>{
        localStorage.setItem("token",token);
        setUser({token});
    }

    const logout=()=>{
        localStorage.removeItem("token");
        setUser(null);
    }

    return(
        <AuthContext.Provider value={{user,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthProvider;