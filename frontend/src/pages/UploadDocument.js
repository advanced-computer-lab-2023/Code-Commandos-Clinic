import React, { useState, useRef } from 'react';
import "../css/UploadDocument.css"
import documentImage from "../images/doc.jpg"
import Swal from "sweetalert2";

const UploadDocument = () => {
  const [singleFile, setSingleFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    console.log(file.name)
    setSingleFile(file);
    setFileName(file.name);
  };

  const handleSubmit = async () => {
    if (!singleFile) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: "Please select a file to upload",
      });
      return;
    }
    const formData = new FormData();
    formData.append('file', singleFile);
    console.log(singleFile);
    try {
      const response = await fetch('/api/file/addSingleFile', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        const errorMessage = await response.text();
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorMessage,
        });
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: "File uploaded successfully",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message,
      });
    }
    setFileName('');
  };

  return (
    <div class ="cccc">
    <h2 className="mb-4"><hr className="lineAround"></hr>Upload document<hr className="lineAround"></hr></h2>
    <div className="bodyyggy">
      
      <div className="rooow">
      <img src={documentImage} className="document" alt="document" />
      <div className="bodyyssyyy">
      
        <button className="btn btn-secondary" style={{ width: 300 }} onClick={() => fileInputRef.current.click()}>
          Upload a single document
        </button>
        <input id="fileInput" type="file" style={{ display: 'none' }} ref={fileInputRef} onChange={handleFileSelect} />
        {fileName && <p>Selected file: {fileName}</p>}
       
          <button type="submit" className="btn btn-primary" onClick={handleSubmit} style={{ marginTop: '10px' }}>
            Submit
          </button>
          </div>
        
          
          </div>  
       
      </div>
    </div>
  );
};

export default UploadDocument;