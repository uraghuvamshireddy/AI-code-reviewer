import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ViewFile = () => {

    const {id} = useParams()
    const [file,setFile] = useState(null);

    useEffect(() => {
        const fetchFile = async () => {
            const token = localStorage.getItem("token");
      
            try {
              const res = await axios.get(`${import.meta.env.VITE_API_URL}/code/file/${id}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              setFile(res.data); 
            } catch (err) {
              console.error(err);
            }
          };
      
          fetchFile();
        }, [id]);

  return (
    <div className="viewfile-container">
           {file ? (
        <>
          <h2>{file.filename}</h2>
          <div className="code-box">
            <pre>{file.code}</pre>
          </div>        </>
      ) : (
        <p>Loading file...</p>
      )}

    </div>
  )
}

export default ViewFile
