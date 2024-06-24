import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Context } from '../../main';
import toast from 'react-hot-toast';
import { FaPenAlt, FaRegUser } from 'react-icons/fa';
import { FaPhoneFlip } from 'react-icons/fa6';
import { MdOutlineMailOutline } from 'react-icons/md';
import { RiLock2Fill } from 'react-icons/ri';
import { Link, Navigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);

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
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isAuthorized) {
    return <Navigate to={'/'} />
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
            <h4 >Thankyou for Register account</h4>
            <h4> Now you are a member of HireWay</h4>
          </div>
          <div className='leftdown'>
            <h4>Created by Ankush</h4>
          </div>
        </div>
        <div className="right">
          <div className="container">
            <img src="logo.png" alt="" />
            <h3>Register Your Account</h3>
            <form >

              <div className='inputTag'>
                <h6> Register As </h6>
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
                    type="text"
                    placeholder='Enter your name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

              <div className='inputTag'>
                <div>
                  <input
                    type="number"
                    placeholder='Enter your phone no.'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
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

              <button onClick={handleRegister} type="submit">Register</button>
              <p>Already have an account <Link to={'/login'}>Login Now</Link> </p>


            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register
