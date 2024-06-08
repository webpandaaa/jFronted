import React, { useContext } from 'react'
import {Context} from "../../main";
import {Navigate} from "react-router-dom";
import Hero from "./Hero";
import Works from "./Works";
import Category from "./Category";
import Companies from "./Companies";

const Home = () => {
  const {isAuthorized} = useContext(Context);

  if(!isAuthorized){
    return <Navigate to={"/login"}/>;
  }



  return (
    <section className='homepage page'>
      <Hero/>
      <Works/>
      <Category/>
      <Companies/>
    </section>
  )
}

export default Home
