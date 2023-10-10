import { useState } from 'react'
const RemoveAdmin = async ()=>{

  const [error, setError] = useState(null)
const handleClick= async()=>{
    const response =await fetch('/api/admin/removeAdmin'+document.getElementById('admin').innerText,{
      method:"DELETE"
    })
    const json = await response.json()

    if(!response.ok){
    setError(json.message)
      console.log('errorrrr')
    }
    if(response.ok)
    {
      console.log('deleted')
    }
  
}
  return (
    <form className="delete" onSubmit={handleClick}> 
      <h2>Remove Admin from the system based on ID:</h2>

      <label>ID:</label>
      <input 
        type="text" 
        id='admin'
      /> <br />


      <button onClick ={handleClick}>Delete</button>
      {error && <div className="error">{error}</div>}
    </form>
  )}

  export default RemoveAdmin
