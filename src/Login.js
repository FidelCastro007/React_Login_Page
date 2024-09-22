import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Login = ({onlogin,username,setUsername,password,setPassword,error,setError}) => {

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault()
    const user = JSON.parse(localStorage.getItem('users'))?.find(
      (u) => u.username === username && u.password === password
    )
    if (user){
      onlogin(user)
      setUsername('')
      setPassword('')
      navigate("/home")
    } else {
      setError('Invalid Credentials')
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='Enter your username'
          autoComplete="username"
          required
          />
        </div>
        <div>
          <label>password:</label>
          <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
          placeholder='Enter your password'
          autoComplete="current-password"
          />
        </div>
        {error && <p style={{color:'red'}}>{error}</p>}
        <button type='submit'>login</button>
        </form>
        <Link to="/signup">Don't have a username & password? SignUp</Link>
    </div>
  )
}

export default Login
