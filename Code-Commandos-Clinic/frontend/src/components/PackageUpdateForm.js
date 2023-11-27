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
        <form className="create p-4" onSubmit={handleSubmit}>
          <h2>Update health package id: {healthPackage._id}</h2>
          <div className="mb-3">
            <label htmlFor="packageName" className="form-label">
              Name:
            </label>
            <input
                type="text"
                className="form-control"
                id="packageName"
                value={packageName}
                onChange={(e) => setPackageName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="yearlySubscription" className="form-label">
              Yearly Subscription (in EGP):
            </label>
            <input
                type="number"
                className="form-control"
                id="yearlySubscription"
                value={yearlySubscription}
                onChange={(e) => setYearlySubscription(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="doctorSessionDiscount" className="form-label">
              Discount for doctor sessions:
            </label>
            <input
                type="number"
                className="form-control"
                id="doctorSessionDiscount"
                value={doctorSessionDiscount}
                onChange={(e) => setDoctorSessionDiscount(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="medicineDiscount" className="form-label">
              Discount for medicine:
            </label>
            <input
                type="text"
                className="form-control"
                id="medicineDiscount"
                value={medicineDiscount}
                onChange={(e) => setMedicineDiscount(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="familyDiscount" className="form-label">
              Discount for family members:
            </label>
            <input
                type="text"
                className="form-control"
                id="familyDiscount"
                value={familyDiscount}
                onChange={(e) => setFamilyDiscount(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Edit
          </button>
          <button onClick={deleteHealthPackage} className="btn btn-danger">
            Delete
          </button>
          {error && <div className="error mt-3">{error}</div>}
        </form>

      </div>

  )
}

export default PackageUpdateForm