import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Context } from '../../main';
import toast from 'react-hot-toast';
import { FaPenAlt, FaRegUser } from 'react-icons/fa';
import { FaPhoneFlip} from 'react-icons/fa6';
import {MdOutlineMailOutline} from 'react-icons/md';
import { RiLock2Fill } from 'react-icons/ri';
import { Link, Navigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const {isAuthorized , setisAuthorized , user , setuser} = useContext(Context);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/user/register",
        { name, phone, email, role, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setRole("");
      setisAuthorized(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if(isAuthorized){
    return <Navigate to={'/'}/>
  }


  return (
    <>
      <div className='authPage'>
        <div className='container'>
          <div className='header'>
            <img src="/Hireway.png" alt="logo" />
            <h3>Create a new Account</h3>
          </div>
          <form >
            <div className='inputTag'> 
              <label> Register As </label>
              <div>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Select</option>
                  <option value="Employer">Employer</option>
                  <option value="Job Seeker">Job Seeker</option>
                </select>
                <FaRegUser/>
              </div>
            </div>
            <div className='inputTag'>
              <label>Name</label>
              <div>
                <input 
                type="text" 
                placeholder='Enter your name'
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                />
                <FaPenAlt/>
              </div>
            </div>
            <div className='inputTag'>
              <label>Email Address</label>
              <div>
                <input 
                type="email" 
                placeholder='Enter your email'
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                />
                <MdOutlineMailOutline/>
              </div>
            </div>
            <div className='inputTag'>
              <label>Phone Number</label>
              <div>
                <input 
                type="number" 
                placeholder='Enter your phone no.'
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                />
                <FaPhoneFlip/>
              </div>
            </div>
            <div className='inputTag'>
              <label>Password</label>
              <div>
                <input 
                type="password" 
                placeholder='Enter your Password'
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                />
                <RiLock2Fill/>
              </div>
            </div>
            <button onClick={handleRegister} type="submit">Register</button>
            <Link to={'/login'}>Login Now</Link>
          </form>
        </div>
        <div className='banner'>
          <img src="/register.png" alt="register" />
        </div>
      </div>
    </>
  )
}

export default Register
