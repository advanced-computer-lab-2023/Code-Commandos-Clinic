//import { useEffect, useState } from "react";

import DoctorUpdateForm from '../components/DoctorUpdateForm'
import doctorPhoto from '../images/Doc1.jpeg'; // Replace with the actual path to your photo


const DoctorUpdate = () => {

    return (
        <div className="doctor-update">
      <div className="content">
        <DoctorUpdateForm />
      </div>
      <div className="photo">
        <img src={doctorPhoto} alt="Doctor Photo" />
      </div>
    </div>
    )
}

export default DoctorUpdate;