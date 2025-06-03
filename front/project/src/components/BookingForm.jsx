// import React , {useState} from "react";
// import { BookingInput } from "./Input";
// import useUser from "../hooks/Usercontext";
// import Axios from "axios";

// function BookingForm(prop){
//     const {thisUser} = useUser();
//     const [bookings, setBookings]= useState({
//         fullName:'',     email:'',      phone:'',   departure:'',  destination:'',
//         departure_date:'',      passangers:'',      class:'',    payment:''
//     });
//     const [showPayment,setShowPayment]=useState(false);
//     const [paymentMessage, setPaymentMessage]=useState(null);
//     function handleBookings(event){
//         const{name,value}= event.target;
//         setBookings((prevValue)=>{
//             return{
//                 ...prevValue,
//                 [name]:value
//             }
//         });
//     }

//     function bookingSubmit(e){
        
//         e.preventDefault();
//         setShowPayment(true);
//         let bankTrack;
       
//         switch (bookings.payment) {
//             case 'bank':
//                 bankTrack = Math.random().toString(36).substring(2,10).toUpperCase();
//                 console.log(bankTrack);
//                 setPaymentMessage(
//                     <div className={`${showPayment && 'absolute m-20 bg-amber-600'}`}>
//                         <h1> Pay into this bank account. Use {bankTrack} as your narration.</h1>
//                         <button onClick={()=>{
//                             setShowPayment(false)
//                         }}> Go back </button>
//                         <button onClick={()=>submitData(bankTrack)}>I have paid</button>
//                     </div> 
//                 );
            
//             break;
//             case 'crypto':
//                 setPaymentMessage(
//                     <div className={`${showPayment && 'absolute m-20 bg-amber-600'}`}>
//                     <h1> Pay into this crypto account</h1>
//                     <button className='' onClick={()=>submitData()}>Paid</button>
//                 </div>
//                 )
                
//                 break;
        
//             default:setPaymentMessage( <div className='ml-10 mt-10 mb-10 mr-10'>
//                  <h1>Pls choose a payment method</h1>
//                  <button className='bookingButton p-3.5 mb-3' onClick={()=>{
//                             setShowPayment(false)
//                         }}> Go back </button>
//             </div>);
//         }
//     }

//         function submitData(bankTrack=null){
//                 // const modeOfPayment = bookings.payment;
//                 console.log(bookings);
//                async function paymentVerification() {
//                  try{ const pay = await Axios.post('http://localhost:3001/bookings',
//                   {bookings:{...bookings,
//                      trackingRef : bankTrack,
//                      id: thisUser.id
//                   }});
//                   console.log(pay.data);

//                 } catch (error){
//                     console.log(error.message)
//                 }
//                }
//                paymentVerification();

        
//     }
//     return <div>
//          <div className={`${showPayment && 'blur-sm pointer-events-none'} bg-blue-200 absolute m-20 z-10 rounded-4xl`}>
//             <div className="grid grid-cols-[2fr_1fr] mt-10 mb-5">
//                         <div className="ml-20"> <h2 >Flight Booking Form</h2> </div>
//                         <div className='flex justify-end '>
//                             <button className='bookingButton pl-3.5 pr-3.5' onClick={(event)=>{
//                                 prop.closeForm(event)
//                             }}>Close Booking</button>
//                         </div>
//             </div>
//             <div className="m-5 grid  gap-2 lg:grid-cols-5  sm:grid-cols-3">
//                 <BookingInput
//                     labelName='Full Name'  type='text'  inputName='fullName' value={bookings.fullName} onChange={handleBookings} required/>

//                     <BookingInput
//                     labelName='Email'    type='email'   inputName='email'  value={bookings.email} onChange={handleBookings}required/>

//                     <BookingInput  
//                     labelName='Phone Number' type='tel'    inputName='phone'  value={bookings.phone} onChange={handleBookings}required/>

//                     <BookingInput
//                     labelName='Departure City'   type='text'    inputName='departure'  
//                     value={bookings.departure} onChange={handleBookings}required/>

//                     <BookingInput
//                     labelName='Destination'  type='text'     inputName='destination'  
//                     value={bookings.destination} onChange={handleBookings}required/>

//                     <BookingInput
//                     labelName='Departure Date'   type='date'    inputName='departure_date' 
//                     value={bookings.departure_date} onChange={handleBookings}required/>

//                     <BookingInput
//                     labelName='Return Date'   type='date'    inputName='return_date' 
//                     value={bookings.departure_date} onChange={handleBookings} Optional/>    

//                     <BookingInput
//                     labelName='Passengers'    type='number'    inputName='passangers'   
//                     value={bookings.passangers} onChange={handleBookings}min='1' required/>

//                     <BookingInput
//                     type='select'    labelName='Class:'    inputName='class'  value={bookings.class} onChange={handleBookings}
//                     options={[
//                         {value:'economy', name : 'Economy'},
//                         {value:'business', name : 'Business'},
//                         {value:'first', name : 'First'}
//                     ]} required/>
                    
//                     <BookingInput
//                     type='select'       labelName='Payment'     inputName='payment'  value={bookings.payment} onChange={handleBookings}
//                     options={[
//                         {value:'bank', name:'Bank Transfer'},
//                         {value:'crypto', name:'Crypto Payment'}
//                     ]} required/>

//             </div>
//             <div className="flex justify-center mb-14 mt-14">
//             <button className="bookingButton pr-44 pl-44" onClick={bookingSubmit} >Book Flight</button>
//             </div>          
//     </div>
//     <div className={`${showPayment ? 'absolute lg:mt-50 mx-auto ml-1/2 z-20 bg-amber-600' :  'hidden'}`}>
//     {paymentMessage}  
//     </div>
//     </div>
    
// }

// export default BookingForm;