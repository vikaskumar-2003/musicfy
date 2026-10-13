import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useUserData } from "../context/UserContext"


const Register = () => {


      const[email,setEmail]=useState("")
      const[name,setName]=useState("")
      const[password,setPassword]=useState("")
  
      const navigate=useNavigate()
  
      const{registerUser,btnLoading}=useUserData()
  
      async function submitHanlder(e:any){
   
          e.preventDefault()
  
  
          await registerUser(email,password,name,navigate)
      }
  
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-black text-white p-8 rounded-lg shadow-lg max-w-md w-full ">
          <h2 className="text-3xl font-semibold text-center mb-8">
            Register To Musicfy
          </h2>
  
          <form action="" onSubmit={submitHanlder} className="mt-8">
            <div className="mb-5">
              <label className="block text-sm font-medium mb-1">
                Username
              </label>
              <input
                type="text"
                placeholder="enter name"
                className="auth-input"
                required
                value={name}
                onChange={(e)=>setName(e.target.value)}
              />
            </div>
             <div className="mb-5">
              <label className="block text-sm font-medium mb-1">
                email
              </label>
              <input
                type="email"
                placeholder="enter email"
                className="auth-input"
                required
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>
             <div className="mb-5">
              <label className="block text-sm font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="password"
                className="auth-input"
                required
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />
            </div>
  
            <button disabled={btnLoading} className="auth-btn" >{btnLoading?"please wait...":"Register"}</button>
  
          </form>
          <div className="text-center mt-8">
                     <Link to={"/login"} className="text-sm text-gray-400 hover:text-gray-300">
                       have an account?
                     </Link>
          </div>
        </div>
      </div>
    );
}

export default Register