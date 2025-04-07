import React from "react";

const Navbar=()=>{

    const navLinks=[
        {name:"HOME", redirectLink:"/home"},
        {name:"LEARN", redirectLink:"/learn"},
        {name:"Dash Board", redirectLink:"/dashboard"},
    ]


    return(
        <div className="w-full sticky top-0 z-10 bg-blue-700 shadow-md sm:px-16 sm:py-3 md:px-10">
            <div className="flex justify-between items-center py-0">
                <div>
                    <h1 className="text-white text-2xl font-bold">Anki Deck</h1>
                </div>
                <div>
                    <ul className="flex gap-6">
                        {navLinks.map((navLink)=>(
                            <li key={navLink.name} >
                                <a href={navLink.redirectLink} className="text-white text-lg font-medium hover:text-gray-200 transition duration-300">{navLink.name}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar;