import { createContext, useContext, useEffect, useState } from "react";
import { registerRequestA, loginRequestA, verityTokenRequet } from "../api/auth.js";
import Cookies from "js-cookie";

export const AuthContextA = createContext();

export const useAuth = () => {
    const context = useContext(AuthContextA);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProviderA = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [plan, setPlan] = useState(null);

    const signup = async (user) => {
        try {
            const userData = { ...user, plan: plan }; 
            const res = await registerRequestA(userData);
            console.log(res.data);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            setErrors(error.response.data)
        }
    };

    const signin = async (user)=>{
        try{
            const res = await loginRequestA(user)
            console.log(res)
            setIsAuthenticated(true)
            setUser(res.data)
        }catch(error){
            if(Array.isArray(error.response.data)){
               return setErrors(error.response.data)
            }
            setErrors([error.response.data.message])
        }
    }

    const logout = (navigate) => {
        Cookies.remove("token");
        setIsAuthenticated(false);
        setUser(null);
        navigate("/IngresarAd");
    };

    useEffect(()=>{
        if(errors.length > 0){
           const timer = setTimeout(()=>{
                setErrors([])
            }, 5000)
            return()=> clearTimeout(timer)
        }
    }, [errors])

    useEffect(()=>{
       async function checkLogin (){
        const cookies = Cookies.get()
        if(!cookies.token){
            setIsAuthenticated(false)
            setLoading(false);
            return setUser(null)
        }
        try {
            const res= await verityTokenRequet(cookies.token)
            if(!res.data){
                setIsAuthenticated(false)
                setLoading(false);
                return
            } 
            setIsAuthenticated(true)
            setUser(res.data)
        } catch (error) {
            setIsAuthenticated(false)
            setUser(null)
            setLoading(false);
        }
       }
       checkLogin();
    },[])

    return (
        <AuthContextA.Provider
            value={{
                signup,
                signin,
                logout,
                loading,
                user,
                isAuthenticated,
                errors,
                plan,
            }}
        >
            {children}
        </AuthContextA.Provider>
    );
};
