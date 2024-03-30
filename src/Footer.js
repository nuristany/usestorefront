// import React from "react";
// import logo from "./images/ibuy.png";
// import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faFacebook, faWhatsapp } from "@fortawesome/free-brands-svg-icons";

// const Footer = () => {
//   return (
//     <footer>
//       <div className="footer-row">
//         <div className="footer-col">
//           <img src={logo} className="footer-logo" />
//           <p>
//             Lorem Ipsum is simply dummy text of the printing and typesetting
//             industry. Lorem Ipsum has been the industry's standard dummy
//           </p>
//         </div>
//         <div className="footer-col">
//           <h3>office</h3>
//           <p className="email-id">nuristanyqais@gmail.com</p>
//           <h4>+93 - 0786034903</h4>
//         </div>
//         <div className="footer-col">
//           <h3>Links</h3>
//           <ul>
//             <li>
//               <Link to="/">Home</Link>
//             </li>
//             <li>
//               <Link to="/about">About Us</Link>
//             </li>
//           </ul>
//         </div>
//         <div className="social-icons">
//         <FontAwesomeIcon icon={faFacebook} className="facebook" />
//         <FontAwesomeIcon icon={faWhatsapp} className="whatsapp" />
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faWhatsapp } from "@fortawesome/free-brands-svg-icons"; // Import WhatsApp icon
import logo from "./images/ibuy.png";

const Footer = () => {
  const whatsappNumber = "+930786034903"; // Replace with your WhatsApp number
  const facebookProfile = "https://www.facebook.com/nuristany";

  return (
    <footer>
      <div className="footer-row">
        <div className="footer-col">
          <img src={logo} alt="I-Buy Logo" className="footer-logo" />
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy
          </p>
        </div>
        <div className="footer-col">
          <h3>Contact us</h3>
          <p className="email-id">nuristanyqais@gmail.com</p>
          <h4>+93 - 0786034903</h4>
        </div>
        <div className="footer-col">
          <h3>Links</h3>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
          </ul>
        </div>
        <div className="footer-col">
          {/* Font Awesome WhatsApp icon with tel: link */}
          <a
            href={`tel:${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faWhatsapp} className="whatsapp" />
          </a>
          {/* Font Awesome Facebook icon */}
          {/* Font Awesome Facebook icon with link to Facebook profile */}
          <a href={facebookProfile} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebook} className="facebook" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
