import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

const History = () => {

const [files,setFiles] = useState([]);

useEffect(()=>{
    async function fetchHistory(){
        const token = localStorage.getItem('token');
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/code/files`,{
            headers: {
                Authorization: `Bearer ${token}`,
              },
        });
        setFiles(res.data);
    }
    fetchHistory();
},[]);

  return (
    <div style = {{padding:"20px"}}>
      <h2>Saved Files</h2>
      <ul>
        {files.map(file => (
          <li key={file._id}>
            <Link to={`/file/${file._id}`}>{file.filename} - {new Date(file.createdAt).toLocaleString()}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default History
