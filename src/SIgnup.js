import React from 'react'

const SIgnup = ({onSignup,username,setUsername,password,setPassword,error,setError}) => {
  
  return (
    <div>
      <h2>SignUp</h2>
      <form onSubmit={onSignup}>
        <div>
          <label>Username:</label>
          <input
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='Enter your username'
          autoComplete='username'
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
          autoComplete='current-password'
          required
          />
        </div>
        {error && <p style={{color: 'red'}}>{error}</p>}
        <button type='submit'>SignUp</button>
      </form>
    </div>
  )
}

export default SIgnup
