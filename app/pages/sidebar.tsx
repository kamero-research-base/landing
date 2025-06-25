import { useState } from "react";
import Link from "next/link";
import PopupForm from "../components/auth/choose";

const Links = [
  { name: "Home", icon: "bi bi-house", url: "/" },
  { name: "Kamero Official", icon: "bi bi-globe", url: "https://kamero.rw" },
  { name: "Contact Us", icon: "bi bi-phone", url: "/contact-us" },
  { name: "About", icon: "bi bi-info-circle", url: "/about" },
];

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  return (
    <>
      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="sm:hidden fixed top-4 left-4 z-30 bg-gradient-to-r from-teal-600 to-teal-700 text-white p-2.5 rounded-xl shadow-lg backdrop-blur-sm"
      >
        <i className="bi bi-grid text-xl"></i>
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gradient-to-b from-teal-900/95 to-slate-900/95 backdrop-blur-xl shadow-2xl border-r border-teal-800/30 z-40 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 w-[70vw] sm:w-[23vw]`}
      >
        <div className="h-full flex flex-col py-6">
          {/* Logo Section */}
          <div className="border-b border-teal-800/30 pb-4 px-4 mb-6 flex items-center justify-between">
            <Link href={"/"} className="flex items-center group">
              <div className="relative w-10 h-10 mr-3">
                <img src="/logo.svg" alt="logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white group-hover:text-teal-300 transition-colors">
                  Research Base
                </h4>
                <p className="text-[9px] text-teal-200/70 -mt-1">Advanced Research Platform</p>
              </div>
            </Link>
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="sm:hidden text-teal-300 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-all"
            >
              <i className="bi bi-x text-2xl"></i>
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col space-y-1 px-3 flex-1">
            {Links.map((link, key) => (
              <Link
                key={key}
                href={link.url}
                className="flex items-center px-3 py-3 text-white/70 font-medium rounded-xl hover:text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-200 group"
              >
                <i className={`${link.icon} text-lg text-teal-300 group-hover:text-teal-200 mr-3 transition-colors`}></i>
                <span className="text-sm">{link.name}</span>
              </Link>
            ))}
          </div>

          {/* Bottom Section */}
          <div className="px-3 mt-auto space-y-2">
            <div className="border-t border-teal-800/30 pt-4">
              <Link
                href={"/~/help"}
                className="flex items-center px-3 py-3 text-white/70 font-medium rounded-xl hover:text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-200 group"
              >
                <i className="bi bi-question-circle text-lg text-teal-300 group-hover:text-teal-200 mr-3 transition-colors"></i>
                <span className="text-sm">Documentation</span>
              </Link>
              
              <Link
                href={"#auth"}
                onClick={()=>setIsAuth(true)}
                className="flex items-center justify-center mt-3 px-4 py-2.5 bg-gradient-to-r from-teal-600 to-teal-700 text-white font-medium rounded-xl hover:from-teal-500 hover:to-teal-600 transition-all duration-200 shadow-lg shadow-teal-900/50"
              >
                <i className="bi bi-rocket-takeoff mr-2 text-sm"></i>
                <span className="text-sm">Get Started</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 sm:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
       {isAuth && <PopupForm />}
    </>
  );
};

export default SideBar;