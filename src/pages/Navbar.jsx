import React from 'react'
import {useNavigate} from 'react-router-dom'

const Navbar = () => {
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
        <button className='save' onClick={()=>document.dispatchEvent(new Event('trigger-save'))}>Save</button>
        <button className='history' onClick={gotoHistory}>History</button>
        <button className="logout" onClick={logout}>Logout</button>
    </div>
    </div>
  )
}

export default Navbar
