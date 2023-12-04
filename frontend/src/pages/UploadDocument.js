import React, { useState, useRef } from 'react';
import "../css/UploadDocument.css"
import documentImage from "../images/doc.jpg"

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
      alert('Please select a file to upload');
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
        alert(errorMessage);
        throw new Error(errorMessage);
      } else {
        alert('File is uploaded successfully');
      }
    } catch (error) {
      alert(error.message);
    }
    setFileName('');
  };

  return (
    <div class ="cccc">
    <h1 className="titlee">Upload documents</h1>
    <div className="bodyyggy">
      
      <div className="row">
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