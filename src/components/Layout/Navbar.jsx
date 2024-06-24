import React, { useContext, useState } from 'react';
import { Context } from '../../main';
import { Link, useNavigate } from 'react-router-dom';
import {GiHamburgerMenu} from "react-icons/gi"
import toast from 'react-hot-toast';
import axios from 'axios';


const Navbar = () => {
  const [show, setShow] = useState(false);
  const {isAuthorized , setIsAuthorized , user} = useContext(Context);
  const navigate = useNavigate();

  const handleLogout = async () =>{
    try {
      const response = await axios.get("http://localhost:4000/api/user/logout" , {withCredentials : true});
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigate("/login");
    }catch(error){
      toast.error(error.response.data.message);
      setIsAuthorized(true);
    }
  };


  return <>
    <nav className={isAuthorized ? "navbarShow" : "navbarHide" }>
        <div className='container'>
          <div className='logo'>
            <img src="/logoname.png" alt="logo" />
          </div>
          <ul className={!show ? "menu" : "show-menu menu" }>
            <li>
            <Link to={"/"} onClick={() => setShow(false)}>
              Home
            </Link>
            </li>
            <li>
            <Link to={"/job/getall"} onClick={() => setShow(false)}>
              All Jobs
            </Link>
            </li>
            <li>
            <Link to={"/application/me"} onClick={() => setShow(false)}>
              { user && user.role === "Employer"
              ? "Applications"
              : "My applications"
              }
            </Link>
            </li>
            { user && user.role === "Employer" ? (
              <>
              <li>
                <Link to={"/job/post"}  onClick={() => setShow(false)}>
                  Post Job
                </Link>
              </li>
              <li>
              <Link to={"/job/me"}  onClick={() => setShow(false)}>
                  View Jobs
                </Link>
              </li>
              </>
            ) : ( <></>
            )}
          </ul>
            <button className='logout' onClick={handleLogout}>Logout</button>
          <div className='hamburger'>
            <GiHamburgerMenu onClick={()=>setShow(!show)}/>
          </div>
        </div>
    </nav>
  

  </>
  
}

export default Navbar
