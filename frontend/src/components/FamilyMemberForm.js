import { useState } from 'react'

const FamilyMemberForm = () => {
  const [name, setName] = useState('')
  const [nationalId, setNationalId] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('')
  const [relation, setRelation] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const FamilyMember = { name: name, nationalId: nationalId, age: age, gender: gender, relation: relation}
    
    const response = await fetch('/api/familyMember/addFamilyMember/651f050ab25af493ab27db83', {
      method: 'POST',
      body: JSON.stringify(FamilyMember),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.message)
    }
    if (response.ok) {
      setError(null)
      setName('')
      setNationalId('')
      setAge('')
      setGender('')
      setRelation('')
      console.log('new family member added:', json)
    }

  }

  return (
    <form className="add" onSubmit={handleSubmit}> 
      <h2>Add family member:</h2>

      <label>Name:</label>
      <input 
        type="text" 
        onChange={(e) => setName(e.target.value)} 
        value={name}
      /> <br />

      <label>NationalId:</label>
      <input 
        type="text" 
        onChange={(e) => setNationalId(e.target.value)} 
        value={nationalId} 
      /> <br />

      <label>Age:</label>
      <input 
        type="text" 
        onChange={(e) => setAge(e.target.value)} 
        value={age} 
      /> <br />

      <label>Gender:</label><br />
      <input 
        type="radio"
        id="MALE"
        name="gender" 
        onChange={(e) => setGender(e.target.id)} 
      /> 
      <label>Male</label><br />
      <input 
        type="radio"
        id="FEMALE"
        name="gender"  
        onChange={(e) => setGender(e.target.id)}  
      /> 
      <label>Female</label><br />

      <label>Relation:</label><br />
      <input 
        type="radio"
        id ="WIFE"
        name="relation"
        onChange={(e) => setRelation(e.target.id)} 
      /> 
      <label>Wife</label><br />
      <input 
        type="radio"
        id ="HUSBAND"
        name="relation"
        onChange={(e) => setRelation(e.target.id)} 
      /> 
      <label>Husband</label><br />
      <input 
        type="radio"
        id ="CHILDREN"
        name="relation"
        onChange={(e) => setRelation(e.target.id)} 
      />
      <label>Children</label><br /> 

      <button>Add</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default FamilyMemberForm