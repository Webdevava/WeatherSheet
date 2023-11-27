import React from "react";
import '../styles/footer.scss'
import github from '../assets/github.svg'
import linkedin from '../assets/linkedin.svg'
import insta from '../assets/instagram.svg'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="centered">
      <div className="lists centered">
        <ul id="links" className="centered">
          <li>
            <a href="https://openweathermap.org/api" target="_blank">API</a>
          </li>
          <li>
            <a href="/">About WeatherSheet</a>
          </li>
          <li>
            <a href="mailto:ankurauti@gmail.com">Contact Us</a>
          </li>
        </ul>
        <ul id="icons" className="centered">
          <li className="centerd">
            <a href="https:github.com/Webdevava" target="_blank">
              <img src={github} alt="" id="github"/>
            </a>
          </li>
          <li className="centerd">
            <a href="https://www.linkedin.com/in/ankur-auti-862953250/" target="_blank">
              <img src={linkedin} alt="" />
            </a>
          </li>
          <li className="centerd">
            <a href="https://instagram.com/ankurauti382" target="_blank">
              <img src={insta} alt="" />
            </a>
          </li>
        </ul>
      </div>
      <a href="https://youtu.be/8ybW48rKBME?si=Xr6A2QyVFDIbUNe1" target="_blank"> <p className="copyright centered">
      © {year} WeatherSheet, Inc. All Rights Reserved. 
    </p></a>

     
      <p className="love">
      made with ❤️ by <a href="https://github.com/Webdevava">Webdevava</a>
      </p>
    </footer>
  );
};

export default Footer;
