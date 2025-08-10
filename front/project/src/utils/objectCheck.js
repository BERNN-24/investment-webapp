export function arePropertiesNotEmpty (obj){
    if(!obj || Object.keys(obj).length == 0) return false;
    return Object.values(obj).every((value)=>{
       if( 
        value == null ||
        value == undefined ||
        value == "") return false
        if(typeof value =="string"){
             return value.trim() !="";
        }
    return true;
    });
}