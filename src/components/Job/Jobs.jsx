import React, { useContext, useEffect, useState } from 'react'
import {Context} from "../../main";
import { useNavigate , Link } from 'react-router-dom';
import axios from 'axios';

const Jobs = () => {
  const [jobs , setJobs] = useState([]);
  const { isAuthorized } = useContext(Context);
  const navigate = useNavigate();


  useEffect(()=>{
    try {
      axios.get("http://localhost:4000/api/job/getall" , 
        { withCredentials : true }
      ).then((res) => {
        setJobs(res.data);
        // console.log(res.data);
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
      <section className='jobs page'>
        <div className='container'>
          <h1>All Available Job</h1>
          <div className='banner'>
            {jobs.jobs && jobs.jobs.map((element)=>{
              return (
                <div className='card' key={element._id}>
                  <p></p>
                  <p>{element.title}</p>
                  <p>{element.category}</p>
                  <p>{element.country}</p>
                  <Link to={`/job/${element._id}`}>Job Details</Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      </>
  )
}

export default Jobs
