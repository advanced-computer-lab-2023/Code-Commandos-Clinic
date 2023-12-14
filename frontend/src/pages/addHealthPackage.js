import { useEffect, useState } from "react";
import  healthPackageImage from '../images/Health Package.png'; // Adjust the path accordingly
import AddPackageForm from '../components/AddPackageForm'

const AddHealthPackage = () => {

    return (
        <div className="add-package">
            <div className="content">
                <AddPackageForm />
            </div>
            <div className="photo">
                <img src={healthPackageImage} alt="Health Package" />
            </div>
        </div>
    )
}

export default AddHealthPackage;