const ShowPatients = ({patient}) => {
    const remove = async () => {
        
            const response = await fetch('/api/patient/deletePatient/'+patient._id, {
              method: 'DELETE',
              body: JSON.stringify(patient),
              headers: {
                'Content-Type': 'application/json'
              }
            })
            const json = await response.json()
        
            if (!response.ok) {
             
              console.log('problem with deleting patient')
            }
            if (response.ok) {
              console.log('patient deleted:', json)
            }
        
          }
      
    
    return (  
             
<div>
           
      <p>Username: {patient.username}</p>
      {/* <p>Password: {admin.password}</p> */}
<button onClick={remove}>delete</button>
       <br />
       </div>
    )
}

export default ShowPatients
