import { useState } from 'react';
import LoginModal from '../models/LoginModel';
import Image from 'next/image';


const  UsersFall = () =>{

   const [isOpen,SetIsOpen] = useState(false);
   
   const isopen = () =>{
      SetIsOpen(true);
   }

    return(
        <div className="p-4 text-center">
        <Image src="/images/avatar.png" alt='Error image' className="w-20 h-20 rounded-full mx-auto" width={100} height={100}/>
         <p className="text-gray-500 text-sm">
          Oops you not logged in !!
        </p>
        <button className="mt-4 bg-black text-white px-4 py-2 rounded-md" onClick={isopen}>
         Login / Sign Up
        </button>

        {/* The modal component, controlled by the SetIsOpen state */}
         <LoginModal isOpen={isOpen} setIsOpen={SetIsOpen} becomeASeller={false} />
         </div>
    )
}

export default UsersFall;