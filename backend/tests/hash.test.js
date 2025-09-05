//  MOVE TO TEST SCRIPTS
 
 import bcrypt from 'bcrypt';
  async function hash(){
        const saltRound = 10;
       const password = "Benny";
    //    if (result.length !== 0) {
    //         const error = new Error ('!! User Found !!');
    //                error.status = 401; 
    //                throw error;
    //    }

           bcrypt.hash(password, saltRound, async (err, hash)=>{
               if(err)
                    {
                   console.log(err.message);
                   return;
                    }
                    console.log(hash);
              }
              )
    }
  hash();
 