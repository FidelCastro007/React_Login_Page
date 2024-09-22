import { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Home from "./Home";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./Login";
import USERS from "./data/data";
import SIgnup from "./SIgnup";


function App() {
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [error,setError] = useState('')
  const [loggedInUser, setLoggedInUser] = useState(null)
  const navigate = useNavigate()
  const [users, setUsers] = useState([])

  // Load user from localstorage on component mount

  useEffect(() => {
      const storedUsers = localStorage.getItem('users')
      if (storedUsers) {
        setUsers(JSON.parse(storedUsers))
      } else {
        setUsers(USERS); // Initialize with default users
        localStorage.setItem('users',JSON.stringify(USERS))
      }
       // Load logged-in user from 'user' key
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
      }
  },[])

  const handleSignup = (e) => {
    e.preventDefault()
    const existingUser = users.find((u) => u.username === username && u.password === password)
    if(existingUser){
      setError('username already taken')
    }
    else {
      const newuser = {
        id: users.length+1,
        username,
        password,
        name: username, // Optional: Add name if needed
        email: `${username}@example.com` // Optional: Generate an email
      };
      
      // Update the users state
      const updatedUsers = [...users, newuser];
      setUsers(updatedUsers);

      localStorage.setItem('users',JSON.stringify(updatedUsers))
      // Store the new user in localStorage as the current user
      localStorage.setItem('user', JSON.stringify(newuser));

      handleLogin(newuser)
      setUsername('')
      setPassword('')
      navigate('/home')
    }
  }

  const handleLogin = (user) => {
    setLoggedInUser(user);
    localStorage.setItem('user',JSON.stringify(user))
    setError('')
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    localStorage.removeItem('user'); // Clear current user from localStorage
    navigate('/'); // Navigate back to login page on logout
  };
  
  return (
    <main>
    <Header 
    title="LOGIN & SIGNUP PAGE"
    />
    <Routes>
    <Route path="/" element={
    <Login
    username = {username}
    setUsername = {setUsername}
    password = {password}
    setPassword = {setPassword}
    error = {error}
    setError = {setError}
    onlogin ={handleLogin}
    />} />
    <Route path="/signup" element={<SIgnup
      username = {username}
      setUsername = {setUsername}
      password = {password}
      setPassword = {setPassword}
      error = {error}
      setError = {setError}
      onSignup ={handleSignup}
    />} />
    <Route path = "/home" element={
    <Home 
    user = {loggedInUser}
    logout = {handleLogout}
    />} />
    </Routes>
    <Footer/>
    </main>
  );
}

export default App;
