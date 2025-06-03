// import React, {useState} from "react";
// // import useUser from "../hooks/Usercontext";
// // const {thisUser} = useUser();
// // const visit = thisUser.visited;

// export default function Booking({booking}) {  
//     // const [visited, setVisited] = useState(thisUser.visited);
//     const [book,setBook]= useState('');
//     if(!visit.length){
//         setBook(0);
//     }else {
//         setBook(visit.length)
//     }

//     return <div className="">
//                         <div><h3> BOOKINGS WITH US: {book}.</h3> </div>
//                         <div>
//                                 {places == 0?
//                                     <p>Kindly click <a className="no-underline text-emerald-700 animate-pulse" href={booking}>Here</a> to start booking.</p>
//                                 : 
//                                     <p> Continue booking with us, click <a href={`#${booking}`}>Here</a> to book now.</p>
//                                 } 
//                         </div>
                        
//             </div>
    
// }


// export function PlacesVisited (){
//     const [places, setPlaces]=useState([]);
//     if(!visit.length){
//         setPlaces((prevValue)=>{
//             return [...prevValue, 'NIL']
//         })
//     } else{
//         setPlaces(visit);
//     }

//     return <div className =" ">
//         <h3>PLACES BOOKED WITH US.</h3>
//         {places.map((place)=>{
//             return <p> {place}. </p>
//         })}
//     </div>
// }