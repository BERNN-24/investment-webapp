import React, {useState, useEffect} from "react";
import Comments from "../components/Comments";
// import BookingForm from "../components/BookingForm";
// import Booking , {PlacesVisited} from "../components/FlightDatail";
import { useAuth } from "../hooks/Auth_Provider";
import axios from "axios";

function Dashboard(){
    const {user}= useAuth();
    const [userData, setUserData] = useState([]);
    const [toggleForm, setToggle]= useState(false);

   

    function handleComment(comment){ 
    console.log(comment);
    setThisUser((prevValue)=>{
        return{
            ...prevValue,
            userComment : [comment]
        }
    });

    console.log(thisUser);
}

        function navigateBooking(){
            setToggle(true);
        }
        function closeBooking(event){
            setToggle(false);
        }

        function checkBookings(){
            let booking=[]  
         
            for (let i = 1; i <= 3; i++) {
                if (booking.length <=3){
                    booking.push(zero.at(-i))
                }
           }
            return booking;
        }
        checkBookings();
   
      return <div>
                <div className = {toggleForm? 'block blur-none' : 'hidden'}>
                         {/* <BookingForm
                         closeForm={closeBooking}/> */}
                </div>
                    <div className={`${toggleForm && 'blur-xs relative'} bg-amber-300 text-center m-10 h-screen`} >
                <div className="grid grid-cols-[2fr_1fr]">
                    <div className=""></div>
                    <div>
                        <button id="bookingButton"  className="hover:out-hover:border-b-black hover:out-hover:bg-none hover:in-hover:bg-white hover:in-hover:border hover:in-hover:rounded"
                         onClick={navigateBooking}>Book a flight</button>
                    </div>
                </div>
                
                    {/* Hero section */}
                    
                   <div>
                            <p>Weather location of the user</p>
                       
                    </div>
                    <div>
                        <div> 
                            {/* <Booking
                            booking="bookingButton"/> */}
                        </div>
                        <div>
                           {/* <PlacesVisited /> */}
                        </div>
                    
                    </div>
                    <div>
                        <p>upcoming flight</p>
                    </div>

                    <div>
                        
                        <p>Best places to travel to.</p>
                        
                    </div>

             </div>        
      </div>
    };

    
    

   




export default Dashboard;



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