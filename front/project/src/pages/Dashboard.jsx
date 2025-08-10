import React, {useState, useEffect} from "react";

import { useAuth } from "../hooks/Auth_Provider";
import useUser from "../hooks/Usercontext.jsx";
import axios from "axios";
// COMPONENTS
import {DashboardNavbar} from "../components/dashboardComponent/DashboardNavbar.jsx";
import {Balance} from "../components/dashboardComponent/Balance.jsx";
import {Transaction} from "../components/dashboardComponent/TransactionAction.jsx";
import {PendingTransaction} from "../components/dashboardComponent/PendingTxn.jsx";
import {PricingSection} from "../components/dashboardComponent/Prices.jsx";
import {AllTransactions} from "../components/dashboardComponent/AllTransactions.jsx";
function Dashboard(){

    const {user}= useAuth();
    const {thisUser , setThisUser} = useUser();
    const [userData, setUserData] = useState(null);
    const [isLoading, setLoading]= useState(false);
    const [errorMessage, setError] = useState(null);

    // const [toggleForm, setToggle]= useState(false);

    useEffect(()=>{
      // don't run until user is loaded.. Guard against null user or userId
      if (!user || !user.id) return; 

        setLoading(true);
        const dashboardData = async () => {
            try{
                 const result = await axios.get(`http://localhost:3001/user/dashboard?id=${user.id}`, {withCredentials:true});

                 if(result.status !=200) {
                    const error = new Error(result.data.message); 
                    error.status(result.status);
                    throw error;
                 }

                 const {data} = result.data;
                 console.log(data);
                 setUserData(data);
                 setThisUser(data);
            } catch (err){
                setError(err.message);
            } finally {
                setLoading(false);
            }
          
        };
        dashboardData();
    }, [user.id])


   
      return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#1F2937] px-4 md:px-8 py-6">
  {/* CUSTOMIZE LOADING STATE */}
  {isLoading && (
    <div className="flex items-center justify-center h-screen text-lg font-medium text-[#6B7280]">
      Loading...
    </div>
  )}

  {!isLoading && userData && (
    <div className="max-w-7xl mx-auto space-y-10">
      {/* NAVBAR */}
      <DashboardNavbar avatar={user.id} username={user.username} />

      {/* BALANCE SECTION */}
      <section className="bg-[#D6B4FC] bg-opacity-30 shadow-md shadow-[#E2D6F3] rounded-2xl p-6">
        <Balance balance={userData.walletBalance} />
      </section>
      {/* PRICES SECTION */}
      <section>
        <Prices />
      </section>
      {/* TRANSACTION ACTIONS */}
      <section className="bg-gradient-to-r from-[#7F00FF] to-[#E100FF] p-6 rounded-2xl text-white shadow-lg shadow-[#E2D6F3]">
        <Transaction balance={userData.walletBalance}/>
      </section>

      {/* PENDING TRANSACTIONS */}
      <section className="bg-white rounded-2xl p-6 shadow-sm border border-[#E2D6F3]">
        <PendingTransaction pendingData={userData.pendingTransaction} />
      </section>

      {/* ALL TRANSACTIONS - (If You Add It Later) */}
      <section className="bg-white rounded-2xl p-6 shadow-sm border border-[#E2D6F3]">
        <AllTransactions transactions={userData.allTransactions} />
      </section>
    </div>
  )}
</div> )

    };

export default Dashboard;

// CODE FOR FLIGHT BOOKING WEBSITE
// import Comments from "../components/Comments";
// import BookingForm from "../components/BookingForm";
// import Booking , {PlacesVisited} from "../components/FlightDatail";

//  <div className = {toggleForm? 'block blur-none' : 'hidden'}>
//                          {/* <BookingForm
//                          closeForm={closeBooking}/> */}
//                 </div>
//                     <div className={`${toggleForm && 'blur-xs relative'} bg-amber-300 text-center m-10 h-screen`} >
//                 <div className="grid grid-cols-[2fr_1fr]">
//                     <div className=""></div>
//                     <div>
//                         <button id="bookingButton"  className="hover:out-hover:border-b-black hover:out-hover:bg-none hover:in-hover:bg-white hover:in-hover:border hover:in-hover:rounded"
//                          onClick={navigateBooking}>Book a flight</button>
//                     </div>
//                 </div>
                
//                     {/* Hero section */}
                    
//                    <div>
//                             <p>Weather location of the user</p>
                       
//                     </div>
//                     <div>
//                         <div> 
//                             {/* <Booking
//                             booking="bookingButton"/> */}
//                         </div>
//                         <div>
//                            {/* <PlacesVisited /> */}
//                         </div>
                    
//                     </div>
//                     <div>
//                         <p>upcoming flight</p>
//                     </div>

//                     <div>
                        
//                         <p>Best places to travel to.</p>
                        
//                     </div>

//              </div>  

//     function handleComment(comment){ 
//     console.log(comment);
//     setThisUser((prevValue)=>{
//         return{
//             ...prevValue,
//             userComment : [comment]
//         }
//     });

//     console.log(thisUser);
// }

//         function navigateBooking(){
//             setToggle(true);
//         }
//         function closeBooking(event){
//             setToggle(false);
//         }

//         function checkBookings(){
//             let booking=[]  
         
//             for (let i = 1; i <= 3; i++) {
//                 if (booking.length <=3){
//                     booking.push(zero.at(-i))
//                 }
//            }
//             return booking;
//         }
//         checkBookings();

 /* {thisUser.userComment?
        <React.Fragment>      
         <p> Comments from user</p> 
           
       {thisUser.userComment.map((elements)=>{
         <p>
                {elements.comment}
        </p>
        })
        }
        </React.Fragment>
         :
        //  <React.Fragment> */

        // <h1>This is the login page</h1>
        //             <Comments
        //             addComment={handleComment}
        //             />