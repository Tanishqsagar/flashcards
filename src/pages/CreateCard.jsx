import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const CreateCard=()=>{

    const navigate=useNavigate();

    const search=(formData)=> {
        console.log(formData);
        // const question = formData.get("question");
        // console.log(question);
    }

    const API_BASE_URL=import.meta.env.VITE_BACKEND_URL


    const handleSubmit=(e)=>{
        e.preventDefault();
        const formData= new FormData(e.target);
        console.log(formData);

        const category= formData.get("category")
        const question= formData.get("question")
        const answer= formData.get("answer")

        
        axios
        .post(`${API_BASE_URL}/flashcards`,{
            category,
            question,
            answer
        })
        .then((response)=>{
            alert("Card Created");
            navigate("/home");
            console.log(response);
        })
        // search();
    }
    
    return( 
        <div className="flex flex-col items-center justify-center h-screen -mt-10 gap-12">
            <h1 className="text-3xl font-bold">Create a new Flashcard</h1>
            <form className="flex flex-col items-center gap-4" onSubmit={handleSubmit}>
                <input type="text" name="category" required placeholder="Category" className=" px-4 py-2 rounded-lg bg-amber-50 text-black"></input>
                <input type="text" name="question" required placeholder="Question" className=" px-4 py-2 rounded-lg bg-amber-50 text-black"></input>
                <input type="text" name="answer" required placeholder="Answer" className=" px-4 py-2 rounded-lg bg-amber-50 text-black"></input>
                <button type="submit" className="bg-blue-300 text-black px-6 py-2 rounded-lg mt-4 hover:cursor-pointer">Create</button>
            </form>
        </div>
    )
}

export default CreateCard;