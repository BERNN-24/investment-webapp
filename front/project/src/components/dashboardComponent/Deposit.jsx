import React from "react";


// import useUser from "../../hooks/Usercontext";

// const {thisUser} = useUser();
// const {walletAddress} = thisUser;
import { trxAddress } from "../../utils/trxAddress";

// ICONS
import copy from 'copy-text-to-clipboard';
import { FaCopy } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";


const walletAddress = [
  {name : "btc",
    wallet_address : "btcwallet"
  },
  {name : "eth",
    wallet_address : "ethwallet"
  }
]

 export function SelectAddress({selectValue, onChange}){

    return <>
   
    <select

        name="crypto"
        value={selectValue}
        onChange={(e)=>onChange(e)}
        className="w-full p-2 mb-4 border border-[#67557a] rounded-lg bg-[#F9FAFB] text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#7F00FF]"
      >
         {walletAddress.map((address, index)=>{
            return <option key={index} value={address.name}>{address.name.toUpperCase()}</option>
         })}
      </select>
    </>
 }





export function CryptoAddress ({clickedCrypto}){
      function handleCopy(event){
              const copied = document.querySelector("#depAddress").textContent;
              copy(copied);
          }
      return <div className="mt-4 text-sm text-[#1F2937] flex items-center gap-2">
               <span id="depAddress" className="font-mono">{trxAddress(walletAddress ,clickedCrypto)}</span>
               <span onClick={handleCopy} className="cursor-pointer text-[#7F00FF] hover:text-[#5A00B3]">
                 <FaCopy />
               </span>
             </div>

   }


   export function ModalHeader({content , onClick }){
    return(
           <>
              <span> <h3 className="text-lg font-semibold text-[#1F2937] mb-4">{content}</h3></span>
              <span onClick = {(event)=>{
                event.preventDefault();
                onClick(event)
              }}> <MdCancel className="w-6 h-6 bg-black text-white"/> </span>
             </>
    );
}
// className="flex justify-between items-center mb-5"
// "text-lg font-semibold text-[#1F2937] mb-4"
//  max-w-md w-full mx-auto fixed inset-0 z-10 flex justify-center backdrop-blur-md pointer-events-auto