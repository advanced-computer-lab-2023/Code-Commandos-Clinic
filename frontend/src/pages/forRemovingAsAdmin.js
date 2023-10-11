import { Link } from "react-router-dom";
import React from 'react'


const Tryy = ()=>{
    const redirectAdmin =()=>{
        
            <Link to='/showAllToRemoveAdmin' >  </Link>
        
       }
       const redirectDoctor =()=>{
        
            <Link to='/showAllToRemoveAdmin' >  </Link>
        
       }
       const redirectPatient =()=>{
        
            <Link to='/showAllToRemoveAdmin' >  </Link>
        
       }
return(
    <div>
        <button onClick={redirectAdmin}>remove admin</button>
        <button onClick={redirectDoctor}>remove doctor</button>
        <button onClick={redirectPatient}>remove patient</button>
        </div>
)

}
export default Tryy;