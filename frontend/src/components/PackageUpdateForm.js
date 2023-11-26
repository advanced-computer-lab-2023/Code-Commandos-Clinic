import { useState } from 'react'
import Swal from 'sweetalert2';


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
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'aloooooo',
      });
    }
    if (response.ok) {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Health package successfully deleted.',
      });
      console.log('A health package has been deleted:', json);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!packageName || !yearlySubscription || !doctorSessionDiscount || !medicineDiscount || !familyDiscount) {
      Swal.fire({
        icon: 'warning',
        title: 'Warning!',
        text: 'Please fill in all fields.',
      });
      return;
    }

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

    // if (!response.ok) {
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'Error!',
    //     text: '3mnnnnnnnnnaaaaaaaa',
    //   });
    // }
    if (response.ok) {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Health package successfully updated.',
      });
      console.log('A health package has been updated:', json);
    }

  }

  return (
      <div>
        <form className="create p-4" onSubmit={handleSubmit}>
          <h2 className= "red-header"> Health package ID: {healthPackage._id}</h2>
          <div className="col-md-2 mb-3">
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

          <div className="col-md-2 mb-3">
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

          <div className="col-md-2 mb-3">
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

          <div className="col-md-2 mb-3">
            <label htmlFor="medicineDiscount" className="form-label">
              Discount for medicine:
            </label>
            <input
                type="number"
                className="form-control"
                id="medicineDiscount"
                value={medicineDiscount}
                onChange={(e) => setMedicineDiscount(e.target.value)}
            />
          </div>

          <div className="col-md-2 mb-3">
            <label htmlFor="familyDiscount" className="form-label">
              Discount for family members:
            </label>
            <input
                type="number"
                className="form-control"
                id="familyDiscount"
                value={familyDiscount}
                onChange={(e) => setFamilyDiscount(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginRight: '5px', backgroundColor: '#344D6D', border: 'none'}}>
            Edit
          </button>
          <button onClick={deleteHealthPackage} className="btn btn-danger red-header">
            Delete
          </button>
          {error && <div className="error mt-3">{error}</div>}
        </form>

      </div>

  )
}

export default PackageUpdateForm