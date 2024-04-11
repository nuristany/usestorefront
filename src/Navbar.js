import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import logo from "./images/ibuy.png";
import account from "./images/login.png";

const Navbar = () => {
  const { isLoggedIn } = useAuth();

  return (
    
      <div className="navbar">
        <div className="nav-logo">
          <Link to="/">
            <img src={logo} alt="I-Buy Logo" className="footer-logo" />
          </Link>
        </div>
        <div className="nav-items">
          {isLoggedIn ? (
            <ul>
              <li>
                <Link to="/create">Create</Link>
              </li>
              <li>
                <Link to="/logout">Logout</Link>
              </li>
            </ul>
          ) : (
            <ul>
              <li>
                <img src={account} alt="Account Icon" />
              </li>
              <li><Link to="/login">Login</Link></li>
            </ul>
          )}
        </div>
      </div>


    // <div className="nav">
    //   <Link to="/" className="logo">
    //     <img src={logo} alt="I-Buy Logo" className="footer-logo" />
    //   </Link>

    //   <ul className="nav-ul">
    //     {isLoggedIn ? (
    //       <div>
    //         <li className="nav-li">
    //           <Link to="/create">Create</Link>
    //         </li>
    //         <li className="nav-li">
    //           <Link to="/logout">Logout</Link>
    //         </li>
    //       </div>
    //     ) : (
    //       <>
    //         <li>
    //           <Link to="/login">
    //             <button>Login</button>
    //           </Link>
    //         </li>
    //       </>
    //     )}
    //   </ul>
    // </div>
  );
};

export default Navbar;
