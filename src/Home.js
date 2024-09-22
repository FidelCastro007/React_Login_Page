import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = ({user,logout}) => {
  const navigate = useNavigate()

  useEffect(() => {
    if(!user){
      navigate('/');
    }
  },[user,navigate])

  if(!user){
    return <div> Redirecting...</div>
  }
  return (
    <div className='home'>
      <h1>Home Page</h1>
      <h2>Welcome, {user.name || user.username}</h2>
      <p>Email: {user.email  || 'Not provided'}</p>
      <button onClick={logout}>logout</button>
    </div>
  )
}

export default Home