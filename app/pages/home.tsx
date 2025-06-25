"use client"

import { useState } from "react";
import SideBar from "./sidebar";
import TopBar from "./topbar";

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const showSideBar = () => {
    setIsOpen(!isOpen);
  };

  const closeSideBar = () => {
    setIsOpen(false);
  };

  return (
    <>
      <TopBar onClickSideBar={showSideBar} />
      {isOpen && <SideBar />}
      
      <main 
        className="min-h-[100dvh] w-full bg-gradient-to-br from-slate-900 via-slate-900 to-teal-900/60" 
        onClick={closeSideBar}
      >
        {/* Search Section */}
        <div className="w-full h-screen flex justify-center items-center px-4 ">
          <div className="flex flex-col justify-center items-center p-4 rounded-2xl w-full max-w-4xl">
            {/* Main Search Card */}
            <div className={`
              flex 
              backdrop-blur-xl justify-center flex-col py-10 px-8 w-full
              transition-all duration-300
              ${isSearchFocused ? 'shadow-teal-500/20 border-teal-700/50' : ''}
            `}>
              {/* Logo and Title */}
              <div className="flex flex-col items-center mb-8">
                
                <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-white text-center">
                  Kamero Research Base
                </h1>
                <p className="text-teal-200/70 text-center text-sm">
                  Discover groundbreaking research and scholarly articles
                </p>
              </div>

              {/* Search Form */}
              <form action="/~/result" method="GET" className="flex justify-center w-full mb-6">
                <div className="relative w-full max-w-2xl flex">
                  <input 
                    type="search" 
                    name="search" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    placeholder="Search for research..." 
                    className="w-full text-white placeholder:text-teal-200/50 
                      bg-white/5 backdrop-blur-sm
                      border-2 border-teal-700/30 outline-none rounded-l-xl 
                      px-6 py-4 transition-all duration-300
                      focus:bg-white/10 focus:border-teal-500/50
                      hover:bg-white/10"
                  />
                  <button 
                    type="submit" 
                    className="px-6 text-white border-2 border-l-0 rounded-r-xl 
                      border-teal-700/30 bg-gradient-to-r from-teal-600 to-teal-700
                      hover:from-teal-500 hover:to-teal-600 
                      transition-all duration-300 group"
                  >
                    <i className="bi bi-search text-lg group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              </form>

              {/* Tagline */}
              <h4 className="text-center py-4 font-medium text-teal-200/80 text-lg">
                Scholars' First Spot
              </h4>

            </div>
            
            {/* Popular Searches */}
            <div className="mt-8 text-center">
              <p className="text-teal-200/60 text-sm mb-3">Popular searches:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {["Machine Learning", "Climate Change", "Quantum Computing", "Biotechnology", "Neural Networks"].map((term) => (
                  <button
                    key={term}
                    onClick={() => setSearchQuery(term)}
                    className="px-4 py-1.5 text-xs rounded-full 
                      bg-white/5 text-white/70 border border-teal-700/30
                      hover:bg-white/10 hover:text-teal-100 hover:border-teal-600/50
                      transition-all duration-200"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default HomePage;