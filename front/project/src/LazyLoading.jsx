import React, {lazy} from "react";

export function lazyLoad (path , namedExport){
    return lazy(()=> 
        path().then(module=>({default : namedExport ? module[namedExport] : module.default}))
        
    );
}