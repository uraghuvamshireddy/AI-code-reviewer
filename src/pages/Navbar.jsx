import React from 'react'

const Navbar = () => {
    const logout = ()=>{
        localStorage.removeItem('token');
        window.location.reload();
    }
  return (
    <div className="nav">
        <div className="name">CodeReview AI</div>
    <div className="button">
        <button className='save'>Save</button>
        <button className='history'>History</button>
        <button className="logout" onClick={logout}>Logout</button>
    </div>
    </div>
  )
}

export default Navbar
