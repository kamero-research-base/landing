import { useState } from "react";
import Link from "next/link";

const Links = [
  { name: "Home", icon: "bi bi-house", url: "/" },
  { name: "Kamero official site", icon: "bi bi-globe", url: "https://kamero.rw" },
  { name: "Login", icon: "bi bi-box-arrow-right", url: "https://app.kamero.rw/auth/login" },
];

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Sidebar Toggle Button (Only Visible on Small Screens) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="sm:hidden fixed top-4 left-4 z-30 bg-teal-600 text-white p-2 rounded-md shadow-md"
      >
        <i className="bi bi-grid text-xl"></i>
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-md shadow-slate-400 z-20 rounded-e-xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 w-[70vw] sm:w-[18vw]`}
      >
        <div className="flex flex-col py-7">
          {/* Logo */}
          <div className="logo border-b pb-3 px-4 mb-3 border-slate-300 flex items-center justify-between">
            <Link href={"/"} className="flex items-center">
              <img src="/logo.svg" alt="logo" className="w-12 h-8 mr-2" />
              <h4 className="text-lg sm:text-xl font-medium text-nowrap text-teal-600">
                Research Base
              </h4>
            </Link>
            {/* Close Button for Small Screens */}
            <button
              onClick={() => setIsOpen(false)}
              className="sm:hidden text-teal-600 text-2xl"
            >
              <i className="bi bi-x"></i>
            </button>
          </div>

          {/* Navigation Links */}
          {Links.map((link, key) => (
            <Link
              key={key}
              href={link.url}
              className="mx-3 py-1 px-2 text-slate-700 font-medium rounded-md hover:text-[#00796b] hover:bg-slate-100"
            >
              <i className={`${link.icon} mr-3 text-lg text-teal-600`}></i>
              <span className="text-base">{link.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Overlay (Shows when Sidebar is Open on Mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-10 sm:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default SideBar;
