import { useState } from 'react'
import Swal from 'sweetalert2';

const AddPackageForm = () => {

  const [packageName, setPackageName] = useState('')
  const [yearlySubscription, setYearlySubscription] = useState('')
  const [doctorSessionDiscount, setDoctorSessionDiscount] = useState('')
  const [medicineDiscount, setMedicineDiscount] = useState('')
  const [familyDiscount, setFamilyDiscount] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    let newHealthPackage = {}
    newHealthPackage.packageName = packageName;
    newHealthPackage.yearlySubscription = yearlySubscription;
    newHealthPackage.doctorSessionDiscount = doctorSessionDiscount;
    newHealthPackage.medicineDiscount = medicineDiscount;
    newHealthPackage.familyDiscount = familyDiscount;
    
    const response = await fetch('/api/healthPackage/addPackage', {
      method: 'POST',
      body: JSON.stringify(newHealthPackage),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      const errorMessage = await response.text();
      Swal.fire({
        icon: 'warning',
        title: 'Warning!',
        text: 'Please fill in all fields.',
      });
    }
    if (response.ok) {
      const json = await response.json();
      Swal.fire({
        icon: 'success',
        title: 'Successfully added!',
      });
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
        <h2 className="mb-4">
            <hr className="linearound"></hr> Add a new package <hr className="linearound"></hr>
        </h2>
    <form className="create m-5 border-danger box" onSubmit={handleSubmit}>

        <div className="row mb-3">
            <div className="col-md-3">
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

            <div className="col-md-3">
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
        </div>

        <div className="row mb-3">
            <div className="col-md-3">
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

            <div className="col-md-3">
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
        </div>

        <div className="row mb-3">
            <div className="col-md-3">
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
        </div>

        <button type="submit" className="custom-btn wider-button">
            Submit
        </button>
    </form>
</div>
  )
}

export default AddPackageForm