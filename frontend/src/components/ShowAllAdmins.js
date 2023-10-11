// import { useState } from "react";
const ShowAllAdmins = ({admin}) => {
    const remove = async () => {
            const response = await fetch('/api/admin/removeAdmin/'+admin._id, {
              method: 'DELETE',
              body: JSON.stringify(admin),
              headers: {
                'Content-Type': 'application/json'
              }
            })
            const json = await response.json()
        
            if (!response.ok) {
             
              console.log('problem with deleting admin')
            }
            if (response.ok) {
              console.log('admin deleted:', json)
            }
        
          }
      
    
    return (  
             
<div>
           
      <p>Username: {admin.username}</p>
      {/* <p>Password: {admin.password}</p> */}
        <button onClick={remove}>delete</button>
       <br />
       </div>
    )
}

export default ShowAllAdmins
