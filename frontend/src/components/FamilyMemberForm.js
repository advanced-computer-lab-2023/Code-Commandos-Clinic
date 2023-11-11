import { useState } from 'react'

const FamilyMemberForm = () => {
  const [name, setName] = useState('')
  const [nationalId, setNationalId] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('')
  const [relation, setRelation] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const FamilyMember = { name: name, nationalId: nationalId, age: age, gender: gender, relation: relation}
    
    const response = await fetch('/api/familyMember/addFamilyMember/', {
      method: 'POST',
      body: JSON.stringify(FamilyMember),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
        alert(await response.text())
    }
    if (response.ok) {
        const json = await response.json()
        setName('')
      setNationalId('')
      setAge('')
      //setGender('')
      //setRelation('')
      alert('Successfully added')
      console.log('new family member added:', json)
    }

  }

    return (
        <form className="add m-5" onSubmit={handleSubmit}>
            <h2>Add Family Member:</h2>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">
                    Name:
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="nationalId" className="form-label">
                    National ID:
                </label>
                <input
                    type="number"
                    className="form-control"
                    id="nationalId"
                    value={nationalId}
                    onChange={(e) => setNationalId(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="age" className="form-label">
                    Age:
                </label>
                <input
                    type="number"
                    className="form-control"
                    id="age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label>Gender:</label>
                <div className="form-check">
                    <input
                        type="radio"
                        className="form-check-input"
                        id="MALE"
                        name="gender"
                        onChange={(e) => setGender(e.target.id)}
                    />
                    <label className="form-check-label" htmlFor="MALE">
                        Male
                    </label>
                </div>

                <div className="form-check">
                    <input
                        type="radio"
                        className="form-check-input"
                        id="FEMALE"
                        name="gender"
                        onChange={(e) => setGender(e.target.id)}
                    />
                    <label className="form-check-label" htmlFor="FEMALE">
                        Female
                    </label>
                </div>
            </div>

            <div className="mb-3">
                <label>Relation:</label>
                <div className="form-check">
                    <input
                        type="radio"
                        className="form-check-input"
                        id="WIFE"
                        name="relation"
                        onChange={(e) => setRelation(e.target.id)}
                    />
                    <label className="form-check-label" htmlFor="WIFE">
                        Wife
                    </label>
                </div>

                <div className="form-check">
                    <input
                        type="radio"
                        className="form-check-input"
                        id="HUSBAND"
                        name="relation"
                        onChange={(e) => setRelation(e.target.id)}
                    />
                    <label className="form-check-label" htmlFor="HUSBAND">
                        Husband
                    </label>
                </div>

                <div className="form-check">
                    <input
                        type="radio"
                        className="form-check-input"
                        id="CHILDREN"
                        name="relation"
                        onChange={(e) => setRelation(e.target.id)}
                    />
                    <label className="form-check-label" htmlFor="CHILDREN">
                        Children
                    </label>
                </div>
            </div>

            <button type="submit" className="btn btn-primary">
                Add
            </button>
        </form>
    );
}

export default FamilyMemberForm