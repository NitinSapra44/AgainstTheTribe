import Navbar from "./src/components/navbar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="flex h-screen">
      <Navbar />
      <div className="w-5/6 bg-white px-4 ">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;

// p-4 flex items-center justify-center min-h-screen
