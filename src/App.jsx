import React, { useContext, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Context } from "./main.jsx";

import Application from "./components/Applications/Application.jsx";
import MyApplication from "./components/Applications/MyApplication.jsx";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Home from "./components/Home/Home.jsx";
import JobDetails from "./components/Job/JobDetails.jsx";
import Jobs from "./components/Job/Jobs.jsx";
import MyJobs from "./components/Job/MyJobs.jsx";
import PostJobs from "./components/Job/PostJobs.jsx";
import Footer from "./components/Layout/Footer.jsx";
import Navbar from "./components/Layout/Navbar";
import NotFound from "./components/NotFound/NotFound.jsx";

import axios from "axios";
import { Toaster } from "react-hot-toast";



const App = () => {
  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "https://jbackend.onrender.com/api/user/getuser",
          {
            withCredentials: true,
          }
        );
        setUser(response.data.user);
        setIsAuthorized(true);
      } catch (error) {
        setIsAuthorized(false);
      }
    };
    fetchUser();
  }, [isAuthorized]);


  return (
    <>
      <BrowserRouter>
        <Navbar/>
          <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/" element={<Home/>}/>
            <Route path="/job/getall" element={<Jobs/>}/>
            <Route path="/job/:id" element={<JobDetails/>}/>
            <Route path="/job/post" element={<PostJobs/>}/>
            <Route path="/job/me" element={<MyJobs/>}/>
            <Route path="/application/:id" element={<Application/>}/>
            <Route path="/application/me" element={<MyApplication/>}/>
            <Route path="*" element={<NotFound/>}/>
          </Routes>
        <Footer/>
        <Toaster/>

      </BrowserRouter>
    </>
  )
}

export default App
