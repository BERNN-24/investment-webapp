import React, {useState} from "react";
import Input from "../components/Input";
import { arePropertiesNotEmpty } from "../utils/objectCheck";
import b1 from "../assets/B1.png";
import b2 from "../assets/B2.png";
import g1 from "../assets/g1.png";
import g2 from "../assets/g2.png";

const avatars =[
        {name: "boyOne", src : b1},
        {name: "boyTwo", src : b2},
        {name: "girlOne", src : g1},
        {name: "girlTwo", src : g2},
     ]

export default function Avatar (){;

    const [avatar, setAvatar] = useState({
        nickName : "",
        image : "",
    });
    const [errorMessage , setError] = useState(null);

    const [click, setClick] = useState(null);

  

    function handleChange(e){
        const {value} = e.target;
        setAvatar((prevValue)=>{
            return {
                ...prevValue,
                nickName : value.trim(),
            }
        });
    }

    function handleAvatar (event){
        let customAvatar;
        let inputImage;
        if(!event) return;
        switch (event.type) {
            case "click":
                const {id} = event.currentTarget;
                setClick(id);
                const userAvatar = avatars.find((item)=>item.name == id);
                console.log(userAvatar);
                customAvatar = userAvatar.src;
                break;
            case "change":
                 const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"]
                 const maxSize = 5 * 1024 * 1024;
                 const file = event.target.files[0];
                if(file.size > maxSize) {
                    setError("Photo size should not exceed 5mb");
                    return;
                 }
                if (!validTypes.includes(file.type)) {
                        setError("Please upload a valid image (JPG, PNG, or WEBP)");
                        return;
                    }
                inputImage = file; 

            break;
            default:
                console.log("No event")
                break;
        }

        if(inputImage){
            setAvatar((prevValue)=>{
                return {
                    ...prevValue,
                    image : inputImage,
                }
            })
        } else if (customAvatar){
            setAvatar((prevValue)=>{
                return {
                    ...prevValue,
                    image : customAvatar,
                }
            });
        }
        setError(null);
    }


    function handleSubmit (){
        const checkInput = arePropertiesNotEmpty(avatar);
        console.log(checkInput);
        if(!checkInput) {
            setError("Kindly set your Nickname and Avatar");
            return;
        }
        console.log("User and avatar inputed", avatar);        
    }

    function handleSkip () {
        console.log("Skip process");

    }


    return (   
    <section className="min-h-screen px-6 py-10 bg-gradient-to-br from-[#6A0DAD] to-[#9F00FF] text-white">
      <div className="max-w-4xl mx-auto">
        <p className="text-red-300 text-sm mb-4">{errorMessage}</p>

        <h2 className="text-2xl sm:text-3xl font-bold mb-6">
          Welcome to BERNN INVESTMENT SITE, Complete your profile
        </h2>

        <div className="mb-6 text-sm flex justify-between">
            <div></div>
            <div className="justify-end items-end">
                 <h2> Click here to skip:</h2>
         
          <button
            onClick={handleSkip}
            className="ml-6 underline text-yellow-300 hover:text-yellow-200"
          >
            Skip this
          </button>
            </div>
           
        </div>

        {/* Responsive grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Nickname Input */}
          <div>
            <Input
              name="nickname"
              type="text"
              placeholder="Set your Nickname"
              value={avatar.nickName}
              onChange={handleChange}
              className="w-full p-3 rounded-lg text-black h-[50px]"
            />
          </div>

          {/* Avatar Selection */}
          <div>
            <p className="mb-4 font-medium">Choose your Avatar:</p>

            {/* Avatar Grid - responsive 2x2 on small screens, row on md+ */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {avatars.map((item, index) => {
                let isClicked = click === item.name;

                return( <div
                  key={index}
                  id={item.name}
                  onClick={handleAvatar}
                   className={`cursor-pointer border-2 rounded-lg p-1 transition-all duration-300 ${isClicked ? "border-purple-600 ring-2 ring-purple-500" 
                    : "border-transparent hover:border-purple-300"}`}
                >
                  <img
                    id={item.name}
                    src={item.src}
                    alt={item.name}
                    className="w-full h-[60px] object-contain rounded"
                  />
                </div>
                ) 
            })}
            </div>

            {/* Custom Avatar Upload */}
            <Input
              name="image"
              type="file"
              placeholder="Set your Avatar"
              onChange={handleAvatar}
              accept="image/*"
              className="mb-4 w-full text-white h-[50px]"
            />

            <div className="text-center mt-[20%]">
              <button
                onClick={handleSubmit}
                className="bg-white text-purple-700 font-semibold px-6 py-3 rounded-2xl hover:bg-purple-100 transition"
              >
                Set Your Profile Picture
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )

}