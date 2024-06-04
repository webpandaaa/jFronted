import React, { useContext, useState } from 'react';
import { Context } from '../../main';
import { Link, useNavigate } from 'react-router-dom';
import {GiHamburgerMenu} from "react-icons/gi"

const Navbar = () => {
  const [show, setShow] = useState(false);
  const {isAuthorized , setisAuthorized , user} = useContext(Context);
  const navigate = useNavigate();

  const handleLogout = async () =>{
    try{
      const response = await axios.get("http://localhost:4000/api/user/logout" , {withCredentials : true});
      toast.success(response.data.message);
      setisAuthorized(false);
      navigate("/login");
    }catch(error){
      toast.error(error.response.data.message);
      setisAuthorized(true);
    }
  };

  return <>
    <nav className={isAuthorized ? "navbarShow" : "navbarHide"} >
        <div className='container'>
          <div className='logo'>
            <img src="Hireway.png" alt="logo" />
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
              ? "APPLICANT'S APPLICATIONS"
              : "MY APPLICATIONS"
              }
            </Link>
            </li>
            { user && user.role === "Employer" ? (
              <>
              <li>
                <Link to={"/job/post"}  onClick={() => setShow(false)}>
                  Post new Job
                </Link>
              </li>
              <li>
              <Link to={"/job/me"}  onClick={() => setShow(false)}>
                  View new Jobs
                </Link>
              </li>
              </>
            ) : ( <></>
            )}
            <button onClick={handleLogout}>Logout</button>
          </ul>
          <div className='hamburger'>
            <GiHamburgerMenu onClick={()=>setShow(!show)}/>
          </div>
        </div>
    </nav>
  

  </>
  
}

export default Navbar
