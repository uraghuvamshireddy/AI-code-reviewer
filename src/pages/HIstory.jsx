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
  <div className="history-container">
    <h2>Saved Files</h2>
    <div className="file-grid">
      {files.map((file) => (
        <Link key={file._id} to={`/file/${file._id}`} className="file-card">
          <h4>{file.filename}</h4>
          <p>{new Date(file.createdAt).toLocaleString()}</p>
        </Link>
      ))}
    </div>
  </div>
);

}

export default History
