import React, { useEffect, useState } from "react";
import { Card, CardContent, Tabs, Tab} from "@mui/material";

const API_BASE="https://flashcards-93eh.onrender.com"

const Dashboard=()=>{
    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true)
    useEffect(()=>{
        const fetchUser= async ()=>{
            const token = localStorage.getItem("token");
            try{
                const res=await fetch(`${API_BASE}/user`,{
                    method: "GET",
                    headers: {
                        "Content-Type":"application/json",
                        Authorization: `Bearer ${token}`
                    }
                });
                if(!res.ok){
                    throw new Error("Failed to fetch user data.");
                }
                const data=await res.json();
                setUser(data);
            }catch(err){
                console.log("Error fetching user:",err);
            }finally{
                setLoading(null);
            }
        };
        fetchUser();
    },[]);

    return(
        <div className="flex-1 overflow-auto">
            <div className="container max-w-7xl p-4 md:p-6 lg:p-8">
                <div className="flex flex-col gap-1">
                    {loading?(<p>Loading User Data</p>):user?(<h1 className="text-3xl font-bold">Welcome back, {user.username}</h1>):(<p>User Not Found</p>)}
                    <p className="text-muted-foreground">Here's an overview of your flashcards and progress.</p>
                </div>

                <div className="mt-6 grid gap-6 md:grid-cols-3">
                    <Card variant="outlined">
                        <CardContent>
                            <div className="text-black font-bold text-2xl">Total Flashcards</div>
                            <div>444</div>
                            <p>Across 4 decks.</p>
                        </CardContent>
                    </Card>
                    <Card variant="outlined">
                        <CardContent>
                            <div className="text-black font-bold text-2xl">Study Streak</div>
                            <div>7 days</div>
                            <p>Keep it up!</p>
                        </CardContent>
                    </Card>
                    <Card variant="outlined">
                        <CardContent>
                            <div className="text-black font-bold text-2xl">Overall progress</div>
                            <div>55%</div>
                            <p>Across 4 decks.</p>
                            {/* <LinearProgress value={50}></LinearProgress> */}
                        </CardContent>
                    </Card>
                </div>
                {/* <div className="flex items-center justify-between mt-8">
                    <Tabs>
                        <Tab label="All Decks"></Tab>
                        <Tab label="Recently Studied"></Tab>
                        <Tab label="Favorites"></Tab>
                    </Tabs>
                </div> */}
            </div>
        </div>
    )
}

export default Dashboard;