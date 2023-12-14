import { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import "../css/AddHealthRecord.css";
import record from "../images/healthh.jpg";
import Swl from 'sweetalert2'
import Swal from "sweetalert2";

const AddHealthRecord = () =>{
    const [file, setFile] = useState()
    const [caption, setCaption] = useState("");
    const [allergicHistory, setAllergicHistory] = useState("");
    const [bloodType, setBloodType] = useState("");
    const [mainComplaint, setMainComplaint] = useState("");
    const {id} = useParams()
    const url="/api/healthRecord/addHealthRecord/"+id
    console.log(url)
    const submit = async (event) => {
        event.preventDefault()
        const formData = new FormData();
        formData.append("file", file)
        formData.append("caption", caption)
        formData.append("allergicHistory", allergicHistory);
        formData.append("bloodType", bloodType);
        formData.append("mainComplaint", mainComplaint);
        for (const value of formData.values()) {
            console.log(value);
        }

        //const response= await axios.post(url, formData, { headers: {'Content-Type': 'multipart/form-data'}})
        const response = await fetch(url, {
            method: 'POST',
            body: formData,
            headers: {
                headers: {'Content-Type': 'multipart/form-data'}
            },
        });
        if(!response.ok){
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: await response.text(),
            });
        }
        else {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: "Health record added",
            });
        }
    }

    return (
     
        <div >
              <h1 class ="sdsadssa">Add Health Record</h1>
        <div class ="asasas">
          
        <form  class ="adsdd "onSubmit={submit}>
            <input class ="awl" onChange={e => setFile(e.target.files[0])} type="file"  accept=".pdf" ></input>
        
            <div class ="gamb">
            <label>Allergic History</label>
            <select class ="awl"
                value={allergicHistory}
                onChange={(e) => setAllergicHistory(e.target.value)}
            >
              <option value="NONE">NONE</option>
              <option value="POLLEN">POLLEN</option>
              <option value="DUST">DUST</option>
              <option value="PET">PET</option>
              <option value="FOOD">FOOD</option>
              <option value="MEDICATION">MEDICATION</option>
              <option value="OTHER">OTHER</option>

            </select>
           
              </div>
              <div class ="gamb">
              <label>Main Complaint</label>
            <select 
            class ="awl"
            value={mainComplaint}
            onChange={(e) => setMainComplaint(e.target.value)}
            >
 <option value="NONE">NONE</option>
              <option value="FEVER">FEVER</option>
              <option value="COUGH">COUGH</option>
              <option value="HEADACHE">HEADACHE</option>
              <option value="ABDOMINAL_PAIN">ABDOMINAL_PAIN</option>
              <option value="FATIGUE">FATIGUE</option>
              <option value="OTHER">OTHER</option>
                
            </select>


               </div>
               <div class ="gamb">
               <label>Blood Type</label>
               <select 
            class ="awl"
            value={bloodType}
            onChange={(e) => setBloodType(e.target.value)}
            >
 <option value="A_POSITIVE">A_POSITIVE</option>
              <option value="A_NEGATIVE">A_NEGATIVE</option>
              <option value="B_POSITIVE">B_POSITIVE</option>
              <option value="B_NEGATIVE">B_NEGATIVE</option>
              <option value="AB_POSITIVE">AB_POSITIVE</option>
              <option value="AB_NEGATIVE">AB_NEGATIVE</option>
              <option value="O_POSITIVE">O_POSITIVE</option>
              <option value="O_NEGATIVE">O_NEGATIVE</option>
            </select>

               

            </div>
            <div class ="tanty">
            <button  class ="tany" type="submit">Submit</button>
            </div>
        </form>
        <img src={record} className="recdord" alt="record" />
        </div>
      
        </div>
      
       
    )
}

export default AddHealthRecord;