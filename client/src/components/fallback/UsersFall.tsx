import { useState } from 'react';
import LoginModal from '../models/LoginModel';
import Image from 'next/image';


const  UsersFall = () =>{

   const [isOpen,setIsOpen] = useState(false);
   
    return(
        <div className="p-4e  w-full flex justify-center items-center">
       
        <button className="mt-4 bg-purple-500 cursor-pointer font-semibold px-10 py-4 text-white rounded-md" onClick={()=>setIsOpen(true)}>
         Login / Sign Up
        </button>

        {/* The modal component, controlled by the setIsOpen state */}
         {isOpen &&   <LoginModal isOpen={isOpen} setIsOpen={setIsOpen} becomeASeller={false} />}
         </div>
    )
}

export default UsersFall;