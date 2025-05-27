import { Outlet } from "react-router-dom";
import Navbar from "./src/components/Navbar.jsx";

function Layout() {
  return (
    <div>
      <Navbar />

      <div className="">
        <Outlet />
      </div>
    </div>
  )
}

export default Layout;
