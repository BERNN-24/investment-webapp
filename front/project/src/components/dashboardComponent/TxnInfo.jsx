import React, {useState , lazy , Suspense} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

import { useAuth } from "../../hooks/Auth_Provider";

import {lazyLoad} from "../../hooks/LazyLoading";

// LAZY LOADING COMPONENTS

const SelectAddress = lazyLoad("./Deposit","SelectAddress");

const CryptoAddress = lazyLoad("./Deposit" , "CryptoAddress");
// UTILS
import { arePropertiesNotEmpty } from "../../utils/objectCheck";

export function Add (){

    const {user} = useAuth();
    const navigate = useNavigate();
    // STATES
    const [selectValue, setSelectValue] = useState({
       txnType: "deposit",
      crypto : '',
      amount : '',
    })
    const [showDetail, setShowDetail] = useState(false);

    
    // STATE FOR ADD POSTRESPONSE
    const[addMessage, setAddMessage] = useState(null);
    // LOADING STATE FOR ADD POSTRESPONSE
    const [loadingPost, setLoadingPost] = useState(false);

    function handleChange(event){
        const {name , value} = event.target;

        setSelectValue((prevValue)=>{
          return {
            ...prevValue,
            [name] : value,
          }
        })  
        setShowDetail(true);
    }

    async function handleClick(event){
        event.preventDefault();
         try {
          if(!arePropertiesNotEmpty(selectValue)) {
            setAddMessage("Kindly fill all input fields.")
            return;
          }
            setLoadingPost(true);
            const result = await axios.post("http://localhost:3001/user/addBalance",
                {
                  ...selectValue,
                  id : user.id,
                } 
                ,
             {withCredentials:true} 
            );

            if(result.status !=200) throw new Error(result.data.message);
            setAddMessage(result.data.message);

         } catch (error) {

            console.log(error.status);
            setAddMessage(error.message);
 
         } finally {
            setLoadingPost(false);
            navigate("/dashboard");
         }
    }

    // RENDERING THE ADD COMPONENT
     return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-[#E2D6F3] max-w-md w-full mx-auto">
      <Suspense fallback = {<div> Loading </div>}>
         <SelectAddress 
      selectValue = {selectValue.crypto}
      onChange={handleChange}
      /> 
      </Suspense>
     
     

      {showDetail && (
        <div className="bg-[#F9FAFB] p-4 rounded-xl shadow-inner border border-[#E2D6F3]">
          {loadingPost && <div className="text-sm text-[#6B7280] mb-2">...Loading</div>}
          {addMessage && <div className="text-sm text-[#7F00FF] font-medium mb-2">{addMessage}</div>}

          <div className="mb-4 gird grid-cols-2 gap-4">
            <div>
               <label className="block mb-1 text-sm text-[#6B7280]">Amount</label>
            <input
              name="amount"
              onChange={handleChange}
              value={selectValue.amount}
              required
              className="w-full p-2 border border-[#D6B4FC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F00FF] text-[#1F2937]"
            />
            </div>
            <div>
              <Suspense fallback={<div> loading</div>}>
                    <CryptoAddress 
                  clickedCrypto = {selectValue.crypto}
                  />
              </Suspense>
            </div>
           
          </div>
          <div>
            <button
              onClick={handleClick}
              className="w-full py-2 font-semibold text-white rounded-xl bg-gradient-to-r from-[#7F00FF] to-[#E100FF] hover:from-[#5A00B3] hover:to-[#7F00FF] shadow transition-all">
              Deposit Sent
            </button>
          </div>
          
        </div>
      )}
    </div>
    )
}



export function Withdraw (balance){
    const {user} = useAuth();
    const [showDetail, setShowDetail] = useState(false);
    const [amount, setAmount] = useState(
        {
        crypto : "",
        amount: "",
        withdrawAddress: "", 
        txnType : "withdraw"
        });
      

    const [withdrawalMessage, setWithdrawalMessage] = useState(null);

    const [withdrawLoading, setWithdrawLoading] = useState(false)

    function handleChange(event){
        const {name , value} = event.target;

        setAmount((prevValue)=>{
          return {
            ...prevValue,
            [name] : value
          }
        })
        setShowDetail(true);
    }

    async function handleClick(event){
        event.preventDefault();
        try{
          const {amount} = amount
          if(balance - amount <10 ){
            setWithdrawalMessage("Insufficient Balance!! Cannot Withdraw.")
            return;
          }
            setWithdrawLoading(true);
            const result = await axios.post("http://localhost:3001/user/withdrawBalance",
                 {
                    id : user.id,
                    ...amount
                } ,
                  {withCredentials : true});
            if (result.status !=200) throw new Error (result.data.message);
            setWithdrawalMessage(result.data.message);
        }catch(error){
            console.log(error.status);
            setWithdrawalMessage(error.message);
        } finally {
            setWithdrawLoading(false);
            setTimeout(() => {
              navigate("/dashboard");  
            }, 3000);
            
        }
    }
return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-[#E2D6F3] max-w-md w-full mx-auto">

     <Suspense fallback = {<div>Loading</div>}>
       <SelectAddress
      selectValue = {amount.crypto}
      onChange = {handleChange}
      />
    </Suspense>

      {showDetail && (
        <div className="bg-[#F9FAFB] p-4 rounded-xl shadow-inner border border-[#E2D6F3]">
          {withdrawLoading && <div className="text-sm text-[#6B7280] mb-2">...Loading</div>}
          {withdrawalMessage && <div className="text-sm text-[#7F00FF] font-medium mb-2">{withdrawalMessage}</div>}

          <div className="mb-4">
            <label className="block mb-1 text-sm text-[#6B7280]">Amount</label>
            <input
              name="amount"
              onChange={handleChange}
              value={amount.amount}
              required
              className="w-full p-2 border border-[#D6B4FC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F00FF] text-[#1F2937]"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm text-[#6B7280]">
              Withdrawal Address {amount.crypto === "usdt" && <span className="text-xs text-[#7F00FF]">(TRC20)</span>}
            </label>
            <input
              name="withdrawAddress"
              onChange={handleChange}
              value={amount.withdrawAddress}
              required
              className="w-full p-2 border border-[#D6B4FC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F00FF] text-[#1F2937]"
            />
          </div>

          <button
            onClick={handleClick}
            className="w-full py-2 font-semibold text-white rounded-xl bg-gradient-to-r from-[#7F00FF] to-[#E100FF] hover:from-[#5A00B3] hover:to-[#7F00FF] shadow transition-all"
          >
            Withdraw
          </button>
        </div>
      )}
    </div>
)
}