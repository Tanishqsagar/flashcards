import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL=import.meta.env.VITE_BACKEND_URL


const Login=()=>{
    const[FormData,setFormData]=useState({email:"", password:""});
    const[error,setError]=useState("");
    const navigate=useNavigate();

    const handleChange=(e)=>{
        setFormData({...FormData,[e.target.name]:e.target.value})
    }

    const handleSubmit= async (e)=>{
        e.preventDefault();
        setError("");

        console.log(FormData);

        const res= await fetch(`${API_BASE_URL}/login`,{
            method:"POST",
            headers:{"content-type":"application/json"},
            body:JSON.stringify(FormData)
        })



        const data=await res.json();
        console.log("data:",data);
        if(res.ok) {
            localStorage.setItem("token", data.token);
            console.log("token:",data.token);
            navigate("/home");
        }else{
            setError(data.error || "Sign In Failed!");
        }
    }

    return(
        <div className="flex items-center justify-center min-h-screen -mt-10">
            <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Login</h2>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* <input type="text" name="username" placeholder="Username" onChange={handleChange} className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"></input> */}
                    <input type="email" name="email" placeholder="Email" onChange={handleChange} className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"></input>
                    <input type="password" name="password" placeholder="Password" onChange={handleChange} className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"></input>
                    <button type="submit" className="bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition-all">Login</button>
                </form>
                <p className="text-center mt-4 text-gray-700">
                    Doesn't have an account?{" "}<a href="/signup" className="text-blue-900 no-underline not-hover:text-blue-900">Sign Up</a>
                </p>
            </div>
        </div>
    )
}

export default Login;
