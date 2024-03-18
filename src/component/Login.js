import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

const Login = () => {
  
  
  const [credentials,setCredentials]=useState({email:"",password:""})
  const onChange=(e)=>{
  setCredentials({...credentials,[e.target.name]:e.target.value})
}

let navigate = useNavigate();
const handleSubmit= async (e)=>{
  e.preventDefault();
    const response = await fetch(`http://localhost:3000/api/auth/Login`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password})
    });
const json= await response.json();
console.log(json)
if (json.success===true) {
       localStorage.setItem('token',json.authToken)
       navigate("/");
  
} else {
  alert("invalid crdentials")
}



  }
  return (
   <>
   <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" onChange={onChange} id="email"  value={credentials.email} name="email" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" onChange={onChange} id="password" value={credentials.password} name='password'/>
  </div>
  
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
   </>
  )
}

export default Login
