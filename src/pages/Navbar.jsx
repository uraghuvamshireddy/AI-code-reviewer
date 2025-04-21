import React from 'react'
import {useNavigate} from 'react-router-dom'

const Navbar = ({language, setLanguage}) => {
  const navigate = useNavigate();
    const logout = ()=>{
        localStorage.removeItem('token');
        window.location.reload();
    }
    const gotoHistory=()=>{
      navigate('/history')
    }
  return (
    <div className="nav">
        <div className="name">CodeReview AI</div>
    <div className="button">
        <select className='lang' value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
          <option value="c">C</option>
          <option value="markup">HTML</option>
          <option value="css">CSS</option>
          <option value="json">JSON</option>
          <option value="typescript">TypeScript</option>
        </select>
        <button className='save' onClick={()=>document.dispatchEvent(new Event('trigger-save'))}>Save</button>
        <button className='history' onClick={gotoHistory}>History</button>
        <button className="logout" onClick={logout}>Logout</button>
    </div>
    </div>
  )
}

export default Navbar
