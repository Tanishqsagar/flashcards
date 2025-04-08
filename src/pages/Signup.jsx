    import React, { useState } from "react";
    import { useNavigate } from "react-router-dom";

    const API_BASE_URL=import.meta.env.VITE_BACKEND_URL

    const Signup=()=>{
        const [formData,setFormData]=useState({username:"", email:"", password:""});
        const [error,setError]=useState("");
        const navigate=useNavigate();

        const handleChange=(e,types)=>{
            setFormData({...formData,[types]:e.target.value});
        }

        const handleSubmit=async (e)=>{
            e.preventDefault();
            setError("");
            console.log(formData);
            
            const res=await fetch(`${API_BASE_URL}/signup`,{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(formData)
            });

            const data=await res.json();
            if(res.ok) {
                navigate("/home");
            }else{
                setError(data.error || "Signup Failed!");
            }
        }

        return(
            <div className="flex items-center justify-center min-h-screen -mt-10">
                <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Signup</h2>
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <input type="text" name="username" placeholder="Username" value={formData.username} onChange={(e)=>handleChange(e,"username")} className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"></input>
                        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={(e)=>handleChange(e,"email")} className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"></input>
                        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={(e)=>handleChange(e,"password")} className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"></input>
                        <button type="submit" className="bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition-all">Signup</button>
                    </form>
                    <p className="text-center mt-4 text-gray-700">
                        Already have an account?{" "}<a href="/login" className="text-blue-900">Login</a>
                    </p>
                </div>
            </div>
        )
    }

    export default Signup;
