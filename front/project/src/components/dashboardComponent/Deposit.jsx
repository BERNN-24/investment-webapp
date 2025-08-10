import React from "react";

import useUser from "../../hooks/Usercontext";

const {thisUser} = useUser();
const {walletAddress} = thisUser;
import { trxAddress } from "../../utils/trxAddress";

// ICONS
import copy from 'copy-text-to-clipboard';
import { FaCopy } from "react-icons/fa6";



 export function SelectAddress({selectValue, onChange}){

    return <>
   <h3 className="text-lg font-semibold text-[#1F2937] mb-4">Select a cryptocurrency</h3>
    <select
        name="crypto"
        value={selectValue}
        onChange={(e)=>onChange(e)}
        className="w-full p-2 mb-4 border border-[#67557a] rounded-lg bg-[#F9FAFB] text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#7F00FF]"
      >
         {walletAddress.map((address)=>{
            return <option value ={address.name}>{address.name.toUpperCase()}</option>
         })}
      </select>
    </>
 }





export function CryptoAddress (clickedCrypto){
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


   //  FORMAL CODE   
     {/* <h3 className="text-lg font-semibold text-[#1F2937] mb-4">Select a cryptocurrency</h3>

      <select
        name="crypto"
        value={selectValue.crypto}
        onChange={handleChange}
        className="w-full p-2 mb-4 border border-[#D6B4FC] rounded-lg bg-[#F9FAFB] text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#7F00FF]"
      >
        <option value="">Choose</option>
        <option value="usdt">USDT</option>
        <option value="btc">BTC</option>
        <option value="eth">ETH</option>
      </select> */}


      // <div className="mt-4 text-sm text-[#1F2937] flex items-center gap-2">
      //       <span id="depAddress" className="font-mono">{trxAddress(selectValue)}</span>
      //       <span onClick={handleCopy} className="cursor-pointer text-[#7F00FF] hover:text-[#5A00B3]">
      //         <FaCopy />
      //       </span>
      //     </div>