import React from "react";


function Input(props){
    return <div  className ="grid lg:grid-cols-[1fr_2fr] sm:grid-cols-1 sm:grid-rows-2 gap-1.5 ml-8 mr-8 pt-2 " >
                <label className="">{props.placeholder} - </label>
                <input
                    className="border rounded lg:pt-1 lg:pb-1  hover:in-hover:border-b-gray-400"
                        name={props.name}
                        type={props.type}
                        placeholder={props.placeholder}
                        value= {props.value}
                        onChange={props.onChange}
                        />
             </div> ;
  
}


function BookingInput(props, ...rest){
    return <div className="p-2 grid grid-rows-2 grid-cols-1 gap-1">
        <label id={props.inputName} className='block'> {props.labelName}:</label>
        {props.type == 'select' ?
        <select name={props.inputName} value={props.value} onChange={props.onChange} className="border">
            {(props.options).map((option,index)=>{
               return <option value={option.value}> {option.name}</option>
            }) }
            
        </select> :

        <input 
        className="border rounded hover:in-hover:border-b-gray-400 py-2 px-4 overflow-visible resize-none text-ellipsis-none"
        type={props.type} name={props.inputName} value={props.value} onChange={props.onChange}  {...rest}/>
        }
       
    </div>;
}

export  default Input;
export {BookingInput} ;