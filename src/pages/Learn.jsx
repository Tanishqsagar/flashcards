import React, { useState,useEffect } from "react";
import Flashcard from "../components/Flashcard";
import axios from "axios";

const Learn=()=>{
    const [currentIndex,setCurrentIndex]= useState(0);
    const [flashcards,setFlashCards]=useState([])
    const prevCard=()=> {if(currentIndex>0){setCurrentIndex(currentIndex-1)}}
    const nextCard=()=> {if(currentIndex<flashcards.length-1){setCurrentIndex(currentIndex+1)}}

    useEffect(() => {
        getFlashcards();
    },[]);

    const API_BASE_URL=import.meta.env.VITE_BACKEND_URL

    const getFlashcards= async ()=>{
        try{
            const response= await axios.get(`${API_BASE_URL}/flashcards`)
            console.log(response.data);
            setFlashCards(response.data);
        }catch(error){
            console.error("Error fetching flashcards:",error);
            return [];
        }
    }

    const shuffleCards= ()=>{
        setFlashCards(shuffleArray(flashcards))
    }
    return(
        <div className="flex items-center h-screen flex-col justify-around -mt-10">
            <h1 className="text-3xl font-bold">Learn Flashcards</h1>
            {flashcards.length>0 ? (<Flashcard
                question={flashcards[currentIndex].question}
                answer={flashcards[currentIndex].answer}
            ></Flashcard>) : 
            (<p>No flashcards available.</p>)
            }
            {/* <Flashcard
                question={flashcards[currentIndex].question}
                answer={flashcards[currentIndex].answer}
            /> */}
            <div className="flex items-center gap-4">
                <button onClick={prevCard}
                    className="bg-blue-300 text-black px-6 py-2 rounded-lg mt-4 hover:cursor-pointer"
                >Prev Card</button>
                {/* <button className="bg-white text-black px-4 py-2 rounded-lg mt-4 hover:cursor-pointer" onClick={shuffleCards}>Shuffle</button> */}
                <button onClick={nextCard}
                    className="bg-blue-300 text-black px-6 py-2 rounded-lg mt-4 hover:cursor-pointer"
                >Next Card</button>
            </div>
        </div>
    )
}
export default Learn;