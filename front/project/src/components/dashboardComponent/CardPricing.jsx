// components/PricingCard.jsx

import React, {Suspense, useState} from 'react';

import { useAuth } from '../../hooks/Auth_Provider';
import { lazyLoad } from '../../hooks/LazyLoading';

import { arePropertiesNotEmpty } from '../../utils/objectCheck';

import axios from 'axios';

const CryptoAddress = lazyLoad('./Deposit', 'CryptoAddress');
const SelectAddress = lazyLoad('./Deposit', 'SelectAddress');


const PricingCard = ({ plan }) => {
  const {user} = useAuth();
  const [selectValue , setSelectValue] = useState({
      planName : "",
      crypto : "",
      amount : "",
      txnType : "subscription",
    });
  const [addMessage, setAddMessage] = useState("");
  const [modal , toggleModal] = useState(false);
  const [showDetail , setShowDetail] = useState(false);
  const [isLoading , setIsLoading] = useState(false);



  const investmentRange = plan.maxInvestment
    ? `$${plan.minInvestment.toLocaleString()} – $${plan.maxInvestment.toLocaleString()}`
    : `$${plan.minInvestment.toLocaleString()} and above`;


     // HANDLES SELECTION OF CRYPTO
    function handleChange(event){
      const {name , value} = event.target;

      setSelectValue((prevValue)=>{
        return {
          ...prevValue,
          [name]: value,
        }
      });
      setShowDetail(true);
    }

    // HANDLES PLAN CHOOSING CLICK
    function handleClick(event){
      event.preventDefault();

      setSelectValue((prevValue)=>{
        return {
          ...prevValue,
          planName: plan.name,
        }
      });
      toggleModal(true);
    }

    async function handleSubmit(event){

      event.preventDefault();

      // Validate that all required properties are filled
      if(!arePropertiesNotEmpty(selectValue)) {
        setAddMessage("Kindly fill all input fields.");
        setTimeout(() => setAddMessage(""), 3000);
        return;
      }
      // Check if amount is provided and meets the minimum investment requirement
      if (!selectValue.amount || selectValue.amount < plan.minInvestment){
        setAddMessage(`Minimum investment for this plan is $${plan.minInvestment.toLocaleString()}.`);
        setTimeout(() => setAddMessage(""), 3000);
        return;
      } 

      try {
        isLoading(true);
        const result = await axios.post("http://localhost:3001/user/addBalance", 
          {...selectValue,
            id : user.id,
          },
          { withCredentials: true }
        );
        if(result.status !== 200) throw new Error(result.data.message);


        } catch (error) { 
          console.error(error);
          setAddMessage("An error occurred while processing your request.");
        } finally {
          setIsLoading(false);
        }
      }  

  return (

<div className="relative">
  {addMessage && (
    <div className="text-red-500 text-center mb-4">{addMessage}</div>
  )}

  <div
    id={plan.id}
    className={`rounded-2xl p-6 shadow-md border-2 ${
      plan.highlight
        ? 'bg-gradient-to-r from-[#7F00FF] to-[#E100FF] text-white border-[#E2D6F3] shadow-lg scale-105'
        : `${plan.bg} ${plan.color}`
    } transition-transform duration-300 ease-in-out`}
  >
    <h2 className="text-2xl font-bold mb-2">{plan.name} Plan</h2>
    <p className="text-sm mb-4">{investmentRange}</p>
    <p className="text-xl font-semibold mb-4">{plan.roi}% Daily ROI</p>
    <ul className="text-sm list-disc ml-4 mb-4">
      <li>Instant activation</li>
      <li>Withdraw anytime</li>
      <li>24/7 customer support</li>
    </ul>
    <button
      className="w-full py-2 mt-2 font-semibold text-white rounded-xl bg-gradient-to-r from-[#7F00FF] to-[#E100FF] hover:from-[#5A00B3] hover:to-[#7F00FF] shadow transition-all"
      onClick={handleClick}
    >
      Subscribe Now
    </button>
  </div>

  {modal && arePropertiesNotEmpty(priceInfo) && (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-lg w-full shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <p className="text-lg font-semibold text-[#1F2937]">
            {selectValue.planName.toUpperCase()} Subscription
          </p>
          <button onClick={() => toggleModal(false)} className="text-gray-500 hover:text-gray-700">✖</button>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <SelectAddress
            selectValue={selectValue.crypto}
            onChange={handleChange}
          />
        </Suspense>

        {showDetail && (
          <div>
            <div className="grid grid-cols-1 gap-4 mb-4">
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
                <Suspense fallback={<div>Loading...</div>}>
                  <CryptoAddress clickedCrypto={selectValue.crypto} />
                </Suspense>
              </div>
            </div>
            <button
              onClick={handleSubmit}
              className="w-full py-2 font-semibold text-white rounded-xl bg-gradient-to-r from-[#7F00FF] to-[#E100FF] hover:from-[#5A00B3] hover:to-[#7F00FF] shadow transition-all"
            >
              Subscription Sent
            </button>
          </div>
        )}
      </div>
    </div>
  )}
</div>

  );
};

export default PricingCard;
