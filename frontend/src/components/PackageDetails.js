import CheckIcon from '@mui/icons-material/Check';

const PackageDetails =({healthPackage, currentPlan, selected}) =>{
    return (
        <div className="card" style={selected?{borderColor: "#DC3545", borderWidth: "5px"}:{borderColor: "gray", padding: "4px"}}>
                {selected && <span class="position-absolute top-0 start-0 translate-middle p-2 bg-danger rounded-circle" style={{color:"white"}}>
                    <CheckIcon/>
                    <span class="visually-hidden">selected</span>
                </span>}
                <div className="card-header">
                    <h5>{healthPackage.packageName} {currentPlan && <span class="badge bg-secondary">Current Plan</span>} </h5>
                </div>
                <div className="card-body">
                    Get {healthPackage.doctorSessionDiscount*100}% off any doctor's session price and&nbsp;
                    {healthPackage.medicineDiscount*100}% off any medicine ordered from pharmacy platform and&nbsp;
                    {healthPackage.familyDiscount*100}% discount on the subscribtion of any of your family members in any package.
                </div>
                <div className="card-footer">EGP{healthPackage.yearlySubscription}/year</div>
        </div>
    );
}

export default PackageDetails
