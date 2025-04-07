import React from "react";
import {Link} from "react-router-dom"

const Home=()=>{
    return(
        <div className="flex justify-center align-middle -mt-10">
            <div className="flex flex-col gap-4 h-screen align-middle justify-center">
                <div>
                    <h1 className="text-4xl text-center font-bold">Master Any Subject with Smart Flashcards</h1>
                </div>
                <div>
                    <p className="text-m text-center align-middle">Learn faster and remember longer with our scientifically-proven spaced repetition system. Create, study, and share flashcards on any device.<br/></p>
                </div>
                <div className="flex gap-4 align-middle justify-center">
                    <Link to={"/learn"}>
                        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg mt-4 hover:cursor-pointer">Start Learning</button>
                    </Link>
                    <Link to="/create">
                        <button className="bg-blue-200 text-black px-6 py-2 rounded-lg mt-4 hover:cursor-pointer">Create Flashcards</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Home;