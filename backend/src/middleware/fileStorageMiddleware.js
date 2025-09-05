// MULTER USED TO STORE FILES IN DATABASE
import multer from "multer";

// DISK STORAGE USED TO STORE FILES IN THE SERVER

const storage = multer.diskStorage({
    // CREATES  FILE PATH IN THE SERVER TO STORES UPLOADS LIKE IMAGES , VIDEOS ETC
    destination :  function (req,file,cb){
        cb(null, "uploads/");
    },
    // NAMING FILES
    filename : function (req,file , cb){
        // GETS THE FILE SUFFIX EG .jpg or .pneg  and the rest... 
        const ext = path.extname(file.originalname); 
        // FORMS A RANDOM SUFFIX THAT WOULD E A UNIQUE IDENTIER TO EACH UPLOADED FILE
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        const filename = file.fieldname + "_" + uniqueSuffix + ext;
        cb(null , filename);
    }
});

const upload = multer({ storage : storage });

export default upload;