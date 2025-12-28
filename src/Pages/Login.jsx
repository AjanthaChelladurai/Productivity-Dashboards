import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate()
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const handleLogin=(e) => {
    e.preventDefault();
      if (email && password) {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/dashboard");
    }
  }
    return (
    <div  className="min-h-screen flex items-center w-100 justify-center w-full bg-white " >
      <div className="relative p-8 w-[450px] rounded-2xl bg-white border border-gray-200 shadow-[0_0_50px_rgba(34,211,238,0.6)]">
        <h1 className="text-2xl font-bold text-blue-800 text-center mb-6">Access Your Dashboard</h1>
        <form onSubmit={handleLogin } className="space-y-4" >
          <div>
            <label className="block text-sm text-gray-700 mb-1 font-semibold text-left">Email</label>
            <input
             type='email'
             placeholder='Enter your username...'
             onChange={(e)=>setEmail(e.target.value)}
             required
             className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2  focus:ring-cyan-400 text-black"
            />
          </div>
          <div>
           <label className="block text-sm text-gray-700 mb-1 text-left font-semibold">Password</label>
           <input
           type='password'
           placeholder='Enter your password...'
           onChange={(e)=>setPassword(e.target.value)}
           required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2  focus:ring-cyan-400 text-black"
           />
          </div>
          <div>
            <button type='submit' className="w-full py-2 rounded-xl font-semibold text-white bg-gradient-to-b from-cyan-400 via-blue-600 to-indigo-900 hover:scale-105 transition-transform duration-200">Login</button>
          </div>
        </form>
        
        </div> 
    </div>
    
  )
}

export default Login
