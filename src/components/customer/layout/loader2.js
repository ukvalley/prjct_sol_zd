
import React, { useEffect, useState } from "react";





const Loader2 = ({
    msg
  }) => {
  


    
    
   
  return (
    <><div className="ring">Loading
    <span className="ringspan"></span>

  </div>
  <h4 className='text-center-wall yelloclr'>{msg}</h4>
          

  </>
   
  );
}
export default Loader2;


