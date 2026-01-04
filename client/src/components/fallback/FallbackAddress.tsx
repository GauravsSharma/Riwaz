import { useState } from "react";
import LoginModal from "../models/LoginModel";



const FallbackAddress = () =>{
     const [isOpen,SetIsOpen] = useState(false);
       
       const isopen = () =>{
          SetIsOpen(true);
       }
    
    return (
        <div className="p-6 border rounded-md text-center">
        <h2 className="text-xl font-semibold">No Address Found</h2>
        <p className="text-gray-500 mt-2">
        Please log in to add or manage your addresses.
         </p>
        <button className="mt-4 bg-black text-white px-4 py-2 rounded-md" onClick={isopen}>
         Login to Continue
         </button>
         
         {/* The modal component, controlled by the SetIsOpen state */}
         <LoginModal isOpen={isOpen} setIsOpen={SetIsOpen} becomeASeller={false} />
                  
        </div>

    )
}

export default FallbackAddress;