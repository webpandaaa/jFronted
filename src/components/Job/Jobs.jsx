import React, { useContext, useEffect, useState } from 'react'
import {Context} from "../../main";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Jobs = () => {
  const [jobs , setJobs] = useState([]);
  const { isAuthorized } = useContext(Context);
  const navigate = useNavigate();


  useEffect(()=>{
    try {
      axios.get("" , 
        { withCredentials : true }
      ).then((res) => {
        setJobs(res.data);
      })
      
    } catch (error) {
      console.log(error)
    }

  }, [])

  if(!isAuthorized){
    navigate("/login")
  }
  

  return (
    <>
      Jobs
    </>
  )
}

export default Jobs
