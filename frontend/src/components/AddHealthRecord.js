import { useEffect, useState } from "react";
import axios from 'axios';
import {useParams} from "react-router-dom";
const AddHealthRecord =() =>{  
    const [file, setFile] = useState()
    const [caption, setCaption] = useState("");
    const [allergicHistory, setAllergicHistory] = useState("");
    const [bloodType, setBloodType] = useState("");
    const [mainComplaint, setMainComplaint] = useState("");
    const {id} = useParams()
   const url="/api/healthRecord/AddHealthRecord/"+id
   console.log(url)
    const submit = async event => {
      event.preventDefault()
      const formData = new FormData();
      formData.append("file", file)
      formData.append("caption", caption)
      formData.append("allergicHistory", allergicHistory);
      formData.append("bloodType", bloodType);
      formData.append("mainComplaint", mainComplaint);
      //try{
    //  const response= await axios.post(url, formData, { headers: {'Content-Type': 'multipart/form-data'}})
    // if(response.status === 200) {
    //     console.log("no error")
    //   alert("Health record added")
    // }
    // else {
    //     console.log("nour switch 7abeeby❤")
    //     alert("An error occurred")
    // }
     
    // }catch(err){
    //   alert(err.message)
    //  }
        try {

        const response = await fetch(url, {
            method: 'POST',
            body: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        if (response.ok) {
            console.log("no error");
            alert("Health record added");
        } else {
            console.log("nour switch 7abeeby❤");
            alert("An error occurred");
        }
    } catch (error) {
        console.error("An error occurred during the fetch:", error);
        alert("An error occurred");
    }
    }
  
    return (
       <form onSubmit={submit}>
         <input onChange={e => setFile(e.target.files[0])} type="file"  accept=".pdf" ></input>
         <input value={caption} onChange={e => setCaption(e.target.value)} type="text" placeholder='Caption'></input>
         <input
        value={allergicHistory}
        onChange={(e) => setAllergicHistory(e.target.value)}
        type="text"
        placeholder="Allergic History"
      />
      <input
        value={bloodType}
        onChange={(e) => setBloodType(e.target.value)}
        type="text"
        placeholder="Blood Type"
      />
      <input
        value={mainComplaint}
        onChange={(e) => setMainComplaint(e.target.value)}
        type="text"
        placeholder="Main Complaint"
      />
         <button type="submit">Submit</button>
       </form>
    )
  }

  export default AddHealthRecord;