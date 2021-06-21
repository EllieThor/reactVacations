import React from "react";
import "../css/style.css";

const Footer = () => {
  //TODO: fix links
  return (
    <div className="footer text-center p-3">
      <h6> Copyright &copy; 2021 | Designed by Ellie Thor</h6>
      <a href="https://www.facebook.com/Ellie.kurts/" className="footerIcon">
        <i className="fab fa-facebook px-2 fa-lg"></i>
      </a>
      <a href="www.linkedin.com/‪ellie-thor‬‏-a42195203" className="footerIcon">
        <i className="fab fa-linkedin px-2 fa-lg "></i>
      </a>
      <a href="mailto:webmaster@gmail.com" className="footerIcon">
        <i className="fas fa-envelope px-2 fa-lg"></i>
      </a>
      <a href="" className="footerIcon">
        <i className="fab fa-github px-2 fa-lg"></i>
      </a>
    </div>
  );
};

export default Footer;
