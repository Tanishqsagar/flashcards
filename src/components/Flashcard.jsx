// import React, { useState } from "react";
// const Flashcard=({question,answer})=>{
//     const [flipped,setFlipped]=useState(false)
//     return(
//         // <div onClick={() => setFlipped((prev) => !prev)}>
//         //     <div className="h-70 w-70 bg-amber-50 rounded-lg flex justify-center items-center p-4 cursor-pointer transition-transform transform">
//         //     <h1 className="text-black text-4xl font-bold">
//         //         {flipped?"Hola":"Hello"}
//         //     </h1>
//         //     </div>
//         // </div>
//         <div
//       className="relative w-80 h-48 perspective-1000 cursor-pointer"
//       onClick={() => setFlipped((prev) => !prev)}
//     >
//       <div
//         className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${
//           flipped ? "rotate-y-180" : "rotateY(0deg)"
//         }`}
//       >
//         {/* Front Side */}
//         <div className="absolute w-full h-full flex items-center justify-center bg-blue-500 text-white text-xl font-semibold rounded-lg backface-hidden"
//         style={{
//             backfaceVisibility: "hidden",
//           }}>
//           {question}
//         </div>

//         {/* Back Side (Text stays readable) */}
//         <div className="absolute w-full h-full flex items-center justify-center bg-gray-800 text-white text-xl font-semibold rounded-lg backface-hidden rotate-y-180"
//         style={{
//             transform: "rotateY(180deg)",
//             backfaceVisibility: "hidden",
//           }}>
//           {answer}
//         </div>
//       </div>
//     </div>
//     )
// }

// export default Flashcard;

import React, { useState } from "react";

const Flashcard = ({ question, answer }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="w-80 h-48 cursor-pointer"
      onClick={() => setFlipped((prev) => !prev)}
      style={{
        perspective: "1000px", // enables 3D
      }}
    >
      <div
        className="relative w-full h-full transition-transform duration-500"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front Side */}
        <div
          className="absolute w-full h-full flex items-center justify-center bg-blue-500 text-white text-xl font-semibold rounded-lg"
          style={{
            backfaceVisibility: "hidden",
          }}
        >
          {question}
        </div>

        {/* Back Side */}
        <div
          className="absolute w-full h-full flex items-center justify-center bg-gray-800 text-white text-xl font-semibold rounded-lg"
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
          }}
        >
          {answer}
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
