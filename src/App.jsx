import React, { useEffect , useContext } from "react"; 
import "./App.css";
import { Context} from "./main.jsx";
import { BrowserRouter as Router , Route , Routes} from "react-router-dom";

import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer.jsx";
import Home from "./components/Home/Home.jsx";
import Jobs from "./components/Job/Jobs.jsx";
import JobDetails from "./components/Job/JobDetails.jsx";
import MyJobs from "./components/Job/MyJobs.jsx";
import PostJobs from "./components/Job/PostJobs.jsx";
import Application from "./components/Applications/Application.jsx";
import MyApplication from "./components/Applications/MyApplication.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";

import axios from "axios";
import { Toaster } from "react-hot-toast";




const App = () => {
  const {isAuthorized , setisAuthorized , setUser} = useContext(Context);

  useEffect(()=> {
    const fetchUser = async() =>{
      try{
        const response = await axios.get("" , {withCredentials : true});
        setUser(response.data.user);
        setisAuthorized(true);
      } catch (error){
        setisAuthorized(false);
      }
    };
    fetchUser();
  } , [isAuthorized]);


  return (
    <>
      <Router>
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
      </Router>
    </>
  )
}

export default App
