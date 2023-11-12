import React, { useState, useEffect } from 'react';

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
        alert(errorMessage);
        throw new Error(errorMessage);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const openFile = (filepath) => {
    // Open the file in a new Chrome window
    window.open(`http://localhost:4000/${filepath}`, '_blank');
  };

  const handleRemove = async (id) => {
    try {
      const response = await fetch(`/api/file/deleteSingleFile/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        fetchFiles();
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
        setFiles([]);
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
      <h1>Remove Documents</h1>
      <ul>
        {files.map((file) => (
          <li key={file._id}>
            <span>{file.fileName}</span>
            <p>  </p>
            <button className="btn btn-primary"     onClick={() => openFile(file.filePath)}>Open</button>
            {'   '}
            <button className="btn btn-secondary"   onClick={() => handleRemove(file._id)}>Remove</button>
            <p>  </p>
            <hr/>
          </li>
        ))}

      </ul>
      {files.length > 0 && <button className="btn btn-danger" onClick={handleRemoveAll}>Remove All</button>}
    </div>
  );
};

export default RemoveDocument;
