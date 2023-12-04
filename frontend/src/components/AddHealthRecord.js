import { useEffect, useState } from "react";
import axios from 'axios';
import {useParams} from "react-router-dom";
import "../css/AddHealthRecord.css";
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
            alert(await response.text())
        }
        else {
            alert("Health record added")
        }
    }

    return (
        <div >
              <h1 class ="sdsadssa">Add Health Record</h1>
        <div class ="asasas">
          
        <form  class ="adsdd "onSubmit={submit}>
            <input class ="awl" onChange={e => setFile(e.target.files[0])} type="file"  accept=".pdf" ></input>
            <div class ="gamb">
            <label>caption</label>
            <input   class ="awl" value={caption} onChange={e => setCaption(e.target.value)} type="text" ></input>
            </div>
            <div class ="gamb">
            <label>Allergic History</label>
            <input class ="awl"
                value={allergicHistory}
                onChange={(e) => setAllergicHistory(e.target.value)}
                type="text"
               
            />
              </div>
              <div class ="gamb">
              <label>Blood Type</label>
            <input class ="awl"
                value={bloodType}
                onChange={(e) => setBloodType(e.target.value)}
                type="text"
               
            />
               </div>
               <div class ="gamb">
               <label>Main Complaint</label>
            <input class ="awl"
                value={mainComplaint}
                onChange={(e) => setMainComplaint(e.target.value)}
                type="text"
                
            />
            </div>
            <button  class ="tany" type="submit">Submit</button>
        </form>
        </div>
        </div>
    )
}

export default AddHealthRecord;