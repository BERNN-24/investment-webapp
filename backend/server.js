import app from "./src/app.js";

const port = 3001;

app.listen(port , (req,res)=>{
    console.log(`App is listening at port ${port}`);
});


// import bodyParser from "body-parser";
// import loginData from "./loginData.js";

// import { Strategy } from "passport-local";


// const app = express();
// const port = 3001;
// const saltRound = 15;
// env.config();

// app.use(cors());
// app.use(express.json());
// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave:false,
//     saveUninitialized:true,
//     cookie:{
//         maxAge: 1000 * 60 * 30
//     }   
// }));
// app.use(passport.initialize());
// app.use(passport.session());



// app.get('/', (req,res)=>{
//     res.json('Goat ');
// });

// app.post('/user/bookings', (req,res)=>{
//     const bookForm = req.body;
//     console.log(bookForm);
//     res.json('I have gotten your data');
// });
 
// app.get('/user/dashboard',(req,res)=>{
// if (req.isAuthenticated()){
//     res.status(200).json('Success, allow the login.');
// } else {
//     res.json(400).json('No success, don,t allow login');
// }
// })


// app.post('/user/register',async (req,res)=>{
//     let {email, password} = req.body;
//     try{
//         const checkNew = loginData.find((element)=>{
//             return element.email ==  email || false;
//         });
        
//         if(checkNew){
//             console.log(checkNew);
//             res.status(409).json({message:'This user already exists, kindly login your profile.'} )
//         }
//         else{
//             await bcrypt.hash(password,saltRound,(err,hash)=>{
//              if(err){
//                  console.log(err.message);
//              }
//              else{
//                  const id = loginData.length + 1;
//                  var user = {
//                          id : id,
//                          email : email,
//                          password : hash    
//                  }
//                  console.log(user);
//                  loginData.push(user);
//                  req.login(user,(err)=>{
//                    res.status(200).json('You have sucessfully registered.');
//                  })        
//              }
            
//      }) } 

// } catch(err) {
//     console.log(err.message);
// }
// });


// app.post('/user/login', (req,res,next)=>{
//     passport.authenticate('local', (err, user , info)=>{
//     if(err){
//         // to handle the error from the bcrypt 
//         return res.status(500).json('Server-side error, unable to handle login at this moment');
//     } else if(!user){
//         if(info && info.code == 215){
//             // incorrect password
//             return res.status(401).json(info.message);
//         } else if(info && info.code == 220){
//             // user not found
//           return  res.status(404).json(info.message);
//         }    
//         } else{
//             req.login(user,function(err){
//                 if (err){
//                     return (res.status(500).json({message: `Login Failed : ${err} `, user: null}))
//                 } else {
//                     return( res.status(200).json({message :'User Logged in.', user : user}) )
                   
//                 }
//             });
//         }
    
// }) 
// (req,res,next);

// });

// passport.use( new Strategy({usernameField:'email'},async function verify (email,password, cb){
//     try{
//            const user = loginData.find((element, index)=>{
//             return element.email == email;
//         });
//         if(user){
//             let databasePassword = user.password;
//            await  bcrypt.compare(password,databasePassword,(err, valid)=>{
//                if (err){
//                 // if the comparism did not go throuhj if.e if bcrypt failed 
//               return   cb(err);
//                } else {
//                 if(valid){
//                     // returned true boolean that is inputed password is correct
//                    return cb(null, user);
//                 } else{
//                      // returned false boolean that is inputed password is incorrect
//                    return cb(null,false, {code:215, message:'Invalid Password.'});
//                 }
//                }
//             })
//         } else{
//             return cb(null,false,{code:220, message:'User not found'});
//         }

//     } catch (err){
//         console.log(err.message);
//     }
// }));

// passport.serializeUser((user,cb)=>{
//     cb(null,user);
// });
// passport.deserializeUser((user,cb)=>{
//     cb(null,user);
// });



  








// (req,res)=>{
//     const login = req.body.body;
//     console.log(login.email);
//     const userLogin = function () {

//         const loginInfo = loginData.find((element, index)=>{
//             return element.email == login.email;
//         });

//         if (loginInfo){
//             if (login.email == loginInfo.email && login.password == loginInfo.password){
//                 console.log('You have inputed the correct email and password');
//                 return ({...loginInfo, status: true})
//             } else if (login.password != loginInfo.password){
//                 console.log("Your password is not correct");
//                 return({response : 'Incorrect Password',
//                     status : false
//                 });
//              }
           
//         }else {
           
//            console.log('No info matching this email you sent is found');
//            return({
//             response: 'This user not found',
//             status : false
//            });
//         }

//     }

//     ();

//     console.log(userLogin);

//     res.json(userLogin);
     
// }