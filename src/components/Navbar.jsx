import React from "react";

const Navbar=()=>{

    const navLinks=[
        {name:"HOME", redirectLink:"/"},
        {name:"LEARN", redirectLink:"/learn"},
    ]


    return(
        <div className="w-full sticky top-0 z-10 sm:px-16 sm:py-2 md:px-10">
            <div className="flex justify-between items-center md:pb-0 md:flex">
                <div>
                    <h1>Anku</h1>
                </div>
                <div>
                    <ul className="flex flex-row gap-5">
                        {navLinks.map((navLink)=>(
                            <li key={navLink.name} >
                                <a href={navLink.redirectLink} className="text-white">{navLink.name}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar;