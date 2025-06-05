import React, {useState} from "react";
import Input from "../components/Input";
import b1 from "../assets/B1.png";
import b2 from "../assets/B2.png";
import g1 from "../assets/g1.png";
import g2 from "../assets/g2.png";


export function Avatar (){
    const avatars =[
        {name: "boyOne", src : b1},
        {name: "boyTwo", src : b2},
        {name: "girlOne", src : g1},
        {name: "girlTwo", src : g2},
     ];
    const [avatar, setAvatar] = useState({
        nickName : "",
        image : "",
    })
    const [click, setClick] = useState(false);

    function handleClick (e){
        const {id} = e.target;
        setClick(true);
        const userAvatar = avatars.find((item)=>item.name == id);
        setAvatar((prevValue)=>{
            return {
                ...prevValue,
                image: [id]
            }
        })
    }
    function handleChange(e){
        const {name} = e.target;
        setAvatar((prevValue)=>{
            return {
                ...prevValue,
                nickName : [name],
            }
        });
    }

    // function handleSubmit (){
    //     if(avatar.nickName && avatar.image)
    // }



    return (
    <section>
        <h2>Welcome to BERNN INVESTMENT SITE, Complete your profile</h2>
        <div className="min-h-[screen] grid grid-cols-2">
            <div>
                <p className="my-4">{avatar.nickName}</p>
               <Input 
                name="nickname"
                type="text"
                placeholder="Set your Nickname"
                value= {avatar.nickName}
                onChange={handleChange}
               />
            </div>
            <div className="">
                <p>Chose your Avatar</p>
                <div className="flex flex-col-2 md:flex-col-4 gap-10 md:gap-6">
                     {
                    avatars.map((item,index)=>{
                        return (
                            <div
                             key={index} id={item.name} className={`${click && "border-3-[#E2D6F3]"} h-40 rounded-full  overflow-hidden `}
                             onClick={handleClick}
                             >  
                                
                              <img 
                                src={item.src}
                                className= "h-full w-full object-contain"
                                alt = {item.name}
                                />
                            </div>
                        )
                    })
                }
                </div>
               <div>
                 <Input
                name="image"
                type="file"
                placeholder="Set your Avatar"
                onChange={handleChange}
                accept = "image/*"
                />
                <div className="flex justify-items-center "><button className="p-4 rounded-3xl hover:bg-[#5A00B3] text-[#FFFFFF]"
                onClick={handleSunmit}>Set your Profile.</button></div>
               </div>
            </div>

        </div>
        
    </section>   
    )
}