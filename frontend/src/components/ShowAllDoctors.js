// import { useState } from "react";
const ShowDoctors = ({doctor}) => {
    const remove = async () => {
        
            const response = await fetch('/api/doctor/removeDoctor/'+doctor._id, {
              method: 'DELETE',
              body: JSON.stringify(doctor),
              headers: {
                'Content-Type': 'application/json'
              }
            })
            const json = await response.json()
        
            if (!response.ok) {
             
              console.log('problem with deleting doctor')
            }
            if (response.ok) {
              console.log('doctor deleted:', json)
            }
        
          }
      
    
    return (  
             
<div>
           
      <p>Username: {doctor.username}</p>
      {/* <p>Password: {admin.password}</p> */}
<button onClick={remove}>delete</button>
       <br />
       </div>
    )
}

export default ShowDoctors