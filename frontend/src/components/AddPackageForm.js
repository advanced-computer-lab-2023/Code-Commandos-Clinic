import { useState } from 'react'

const AddPackageForm = () => {

  const [packageName, setPackageName] = useState('')
  const [yearlySubscription, setYearlySubscription] = useState('')
  const [doctorSessionDiscount, setDoctorSessionDiscount] = useState('')
  const [medicineDiscount, setMedicineDiscount] = useState('')
  const [familyDiscount, setFamilyDiscount] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    let newHealthPackage = {}
    newHealthPackage.packageName = packageName;
    newHealthPackage.yearlySubscription = yearlySubscription;
    newHealthPackage.doctorSessionDiscount = doctorSessionDiscount;
    newHealthPackage.medicineDiscount = medicineDiscount;
    newHealthPackage.familyDiscount = familyDiscount;
    
    const response = await fetch('/api/healthPackage/', {
      method: 'POST',
      body: JSON.stringify(newHealthPackage),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.message)
    }
    if (response.ok) {
      setError('Successfully added.')
      setPackageName('')
      setYearlySubscription('')
      setDoctorSessionDiscount('')
      setMedicineDiscount('')
      setFamilyDiscount('')
      console.log('a health package has been added:', json)
    }

  }

  return (
    <div>
    <form className="create" onSubmit={handleSubmit}> 
      <h2>Add a new package:</h2>
      <label>Name:</label>
      <input 
        type="text" 
        onChange={(e) => setPackageName(e.target.value)} 
        value={packageName}
      /> <br />

      <label>Yearly Subscription (in EGP):</label>
      <input 
        type="number" 
        onChange={(e) => setYearlySubscription(e.target.value)} 
        value={yearlySubscription} 
      /> <br />

      <label>Discount for doctor sessions:</label>
      <input 
        type="number" 
        onChange={(e) => setDoctorSessionDiscount(e.target.value)} 
        value={doctorSessionDiscount} 
      /> <br />

      <label>Discount for medicine:</label>
      <input 
        type="text" 
        onChange={(e) => setMedicineDiscount(e.target.value)} 
        value={medicineDiscount} 
      /> <br />

      <label>Discount for family members:</label>
      <input 
        type="text" 
        onChange={(e) => setFamilyDiscount(e.target.value)} 
        value={familyDiscount} 
      /> <br />

      <button>Submit</button> 
      {error && <div className="error">{error}</div>}
    </form>
    </div>
  )
}

export default AddPackageForm