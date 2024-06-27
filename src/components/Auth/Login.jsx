import axios from 'axios';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, Navigate } from 'react-router-dom';
import { Context } from '../../main';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const {isAuthorized , setIsAuthorized} = useContext(Context);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://jbackend.onrender.com/api/user/login",
        { email, role, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setEmail("");
      setPassword("");
      setRole("");
      setIsAuthorized(true);
     
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // console.log(isAuthorized);
  if(isAuthorized){
    return <Navigate to={'/'}/>
  }


  return (
    <>
      <div className="authpage">
        <div className="left">
          <div className='leftup'>
            <h1>HireWay</h1>
            <h6>Search, Apply & <br /> Get your Dream Job</h6>
          </div>
          <div className='leftmid'>
            <h4 >Thankyou for login account</h4>
          </div>
          <div className='leftdown'>
            <h4>Created by Ankush</h4>
          </div>
        </div>
        <div className="right">
          <div className="container">
          <img src="logo.png" alt="" />
            <h3>Login Your Account</h3>
          <form >

            <div className='inputTag'> 
              <h6> Login As </h6>
              <div>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Select</option>
                  <option value="Employer">Employer</option>
                  <option value="Job Seeker">Job Seeker</option>
                </select>
              </div>
            </div>

            <div className='inputTag'>
              <div>
                <input 
                type="email" 
                placeholder='Enter your email'
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                />
              </div>
            </div>

            <div className='inputTag'>
              <div>
                <input 
                type="password" 
                placeholder='Enter your Password'
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                />
              </div>
            </div>

            <button onClick={handleLogin} type="submit">Login</button>
            <p>don't have an account <Link to={'/register'}>Register Now</Link> </p>
            

          </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login

