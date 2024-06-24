import React, { useContext } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import { FaFacebookF, FaYoutube, FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

const Footer = () => {
  const { isAuthorized } = useContext(Context);
  return (
    <footer className={isAuthorized ? "footerShow" : "footerHide"}>
      <div>&copy; All Rights Reserved By Hireway.</div>
      <div>
        <Link to={"https://www.linkedin.com/in/ankush-raj-singh-72b203252/"} target="_blank">
          <FaLinkedin />
        </Link>
        <Link to={"https://www.instagram.com/_.ankushrajsingh/?hl=en"} target="_blank">
          <RiInstagramFill />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;

