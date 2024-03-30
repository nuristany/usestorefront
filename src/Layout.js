import Navbar from "./Navbar";
import Footer from "./Footer";


import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
      <Navbar />
      <Outlet />
     
    </div>
  );
}
export default Layout;
