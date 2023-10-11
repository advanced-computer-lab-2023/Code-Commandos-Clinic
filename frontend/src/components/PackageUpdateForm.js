import { useState } from 'react'

const PackageUpdateForm = ({ healthPackage }) => {

  const [packageName, setPackageName] = useState(healthPackage.packageName)
  const [yearlySubscription, setYearlySubscription] = useState(healthPackage.yearlySubscription)
  const [doctorSessionDiscount, setDoctorSessionDiscount] = useState(healthPackage.doctorSessionDiscount)
  const [medicineDiscount, setMedicineDiscount] = useState(healthPackage.medicineDiscount)
  const [familyDiscount, setFamilyDiscount] = useState(healthPackage.familyDiscount)
  const [error, setError] = useState(null)

  const deleteHealthPackage = async () => {
    const response = await fetch('/api/healthPackage/deletePackage/'+healthPackage._id, {
      method: 'DELETE',
    })
    const json = await response.json()
    if (!response.ok) {
      setError(json.message)
    }
    if (response.ok) {
      setError('successfully deleted')
      console.log('a health package has been deleted:', json)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    let newHealthPackage = {}
    newHealthPackage.packageName = packageName;
    newHealthPackage.yearlySubscription = yearlySubscription;
    newHealthPackage.doctorSessionDiscount = doctorSessionDiscount;
    newHealthPackage.medicineDiscount = medicineDiscount;
    newHealthPackage.familyDiscount = familyDiscount;
    
    const response = await fetch('/api/healthPackage/updatePackage/'+healthPackage._id, {
      method: 'PUT',
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
      setError('successfully updated')
      console.log('a health package has been updated:', json)
    }

  }

  return (
    <div>
    <form className="create" onSubmit={handleSubmit}> 
      <h2>Update health package id: {healthPackage._id}</h2>
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

      <button>Edit</button> 
      {error && <div className="error">{error}</div>}
    </form>
    <button onClick={deleteHealthPackage}>Delete</button>
    </div>
  )
}

export default PackageUpdateForm