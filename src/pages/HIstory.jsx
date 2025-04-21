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

const deleteFile = async (id)=>{
  try{
    const token = localStorage.getItem('token');
  const res = await axios.delete(`${import.meta.env.VITE_API_URL}/code/delete-file/${id}`,{
    headers: {
        Authorization: `Bearer ${token}`,
      },
});
  alert('File deleted successflly')
  setFiles(prev => prev.filter(file => file._id !== id));

  }catch(err){
    console.log(err);
    alert('Error in deleting the file')
  }
}

return (
  <div className="history-container">
    <h2>Saved Files</h2>
    <div className="file-grid">
      {files.map((file) => (
        <Link key={file._id} to={`/file/${file._id}`} className="file-card">
          <h2>{file.filename}</h2>
          <p>{new Date(file.createdAt).toLocaleString()}</p>
          <button className='delete-file' onClick={(e) => {
            e.preventDefault(); 
            deleteFile(file._id);
          }}>Delete</button>
        </Link>
      ))}
    </div>
  </div>
);

}

export default History
