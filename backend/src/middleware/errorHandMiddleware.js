// CHECK IF THIS CUSTOM ERROR HANDLING HANDLER CONSTRUCTOR WILL WORK
export function ErrorHandling (message,status){
    const error = new Error (message);
    error.statusCode = status;
    return error;
};
