import React, { useState } from 'react';
//import ProgressBar from '../components/progressBar';


const UploadDocument = () => {
  const [singleFile, setSingleFile] = useState(null);
  const [fileName, setFileName] = useState('');
  

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
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
    try {
      const response = await fetch('/api/file/addSingleFile', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        const errorMessage = await response.text();
        alert(errorMessage)
        throw new Error(errorMessage)
      } else {
        alert('File is uploaded successfully');
      }
    } catch (error) {
      alert(error.message)
    }
    setFileName('');

  };



  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <button className="btn btn-secondary" style={{width: 300}} onClick={() => document.getElementById('fileInput').click()}>Upload a single document</button>
        <input id="fileInput" type="file" style={{ display: 'none' }} onChange={handleFileSelect} />
        {fileName && <p>Selected file: {fileName}</p>}
      </div>
      <button type="submit" className="btn btn-primary" onClick={handleSubmit} style={{ marginTop: '10px' }}>submit</button>
    </div>
  );
};

export default UploadDocument;
