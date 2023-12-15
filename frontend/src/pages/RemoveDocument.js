import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import gifImage from '../images/trash.gif';

const RemoveDocument = () => {
  const [files, setFiles] = useState([]);
  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const response = await fetch('/api/file/getSingleFiles', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setFiles(data);
      } else {
        const errorMessage = await response.text();
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: errorMessage,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: error.message,
      });
    }
  };

  const openFile = (filepath) => {
    // Open the file in a new Chrome window
    window.open(`http://localhost:4000/${filepath}`, '_blank');
  };

  const handleRemove = async (id) => {
    const isConfirmed = await showConfirmationDialog(`Are you sure you want to remove this document ?`);
    if (isConfirmed) {
  
    try {
      const response = await fetch(`/api/file/deleteSingleFile/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        fetchFiles();
      } else {
        const errorMessage = await response.text();
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: errorMessage,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: error.message,
      });
    }
  }
  }
  const handleRemoveAll = async () => {
    const isConfirmed = await showConfirmationDialog(`Are you sure you want to remove all documents?`);
    if (isConfirmed) {
    try {
      const response = await fetch('/api/file/deleteAllSingleFiles', {
        method: 'DELETE'
      });
      if (response.ok) {
        showSuccessNotification('All files deleted successfully');
        setFiles([]);
      } else {
        const errorMessage = await response.text();
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: errorMessage,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: error.message,
      });
    }
  }
}
const showConfirmationDialog = async (message) => {
  const result = await Swal.fire({
    title: message,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, remove it!',
  });
  return result.isConfirmed;
};
const showSuccessNotification = (message) => {
  Swal.fire({
    icon: 'success',
    title: message,
  });
};
const imageStyle = {
   width: '40%', // Adjust the width as needed
  // height: 'auto',
   position:'fixed' ,
   right:0,
   top:150
  
};

  return (
    <div className="container">
      <h2 className="mb-4"><hr className="lineAround"></hr>Remove Documents<hr className="lineAround"></hr></h2>
      <div className="box-with-image"> 
      <ul>
        {files.map((file) => (
          <li key={file._id}>
            <span>{file.fileName}</span>
            <p>  </p> 
            <button id="button"className="btn btn-primary"     onClick={() => openFile(file.filePath)}>Open</button>
            {'   '}
            <button className="btn btn-secondary"   onClick={() => handleRemove(file._id)}>Remove</button>
            <p>  </p>
            <hr id="removeDoc"></hr>
          </li>
        ))}

      </ul><div className="image" id="pres"> <img style={imageStyle} src={gifImage} alt="Example GIF" loop /></div>
      </div>
      {files.length > 0 && <button className="btn btn-danger" onClick={handleRemoveAll}>Remove All</button>}
    </div>
  );
};

export default RemoveDocument;
