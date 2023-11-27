import React, { useState, useEffect } from 'react';
const RemoveDocument = () => {
  const [singleFiles, setSingleFiles] = useState([]);

  useEffect(() => {
    fetchSingleFiles();
  }, []);

  const fetchSingleFiles = async () => {
    try {
      const response = await fetch('/api/file/getSingleFiles', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setSingleFiles(data);
      } else {
        const errorMessage = await response.text();
        alert(errorMessage);
        throw new Error(errorMessage);
      }
    } catch (error) {
      alert(error.message);
    }
  };


  const handleRemove = async (id) => {
    try {
      const response = await fetch(`/api/file/deleteSingleFile/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        fetchSingleFiles();
      } else {
        const errorMessage = await response.text();
        alert(errorMessage);
        throw new Error(errorMessage);
      }
    } catch (error) {
      alert(error.message);
    }
  }

  const handleRemoveAll = async () => {
    try {
      const response = await fetch('/api/file/deleteAllSingleFiles', {
        method: 'DELETE'
      });
      if (response.ok) {
        alert('All files deleted successfully');
        setSingleFiles([]);
      } else {
        const errorMessage = await response.text();
        alert(errorMessage);
        throw new Error(errorMessage);
      }
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div>
      <h1>Single Files</h1>
      {singleFiles.map(file => (
        <div key={file._id}>
          <p>{file.fileName}</p>
          <button className="btn btn-secondary" onClick={() => handleRemove(file._id)}>Remove</button>
        </div>
      ))}
      <div>


      </div>
      <button className="btn btn-danger" onClick={() => handleRemoveAll()}>Remove All</button>
    </div>
  );
};

export default RemoveDocument;
