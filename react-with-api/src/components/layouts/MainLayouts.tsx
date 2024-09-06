import { Outlet } from "react-router-dom";
import Navbar from "../fragments/Navbar";

export default function MainLayouts() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f5]">
      <Navbar />
      <div className="flex-grow">
        <Outlet />
      </div>
      {/* <Footer /> */}
    </div>
  );
}
