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
        className="min-h-[80dvh] w-full bg-gradient-to-br from-slate-900 via-slate-900 to-teal-900/60" 
        onClick={closeSideBar}
      >
        {/* Search Section */}
        <div className="w-full h-[90vh] sm:h-screen flex justify-center items-center px-3 sm:px-4 lg:px-6">
          <div className="flex flex-col justify-center items-center p-3 sm:p-4 lg:p-6 rounded-2xl w-full max-w-6xl">
            {/* Main Search Card */}
            <div className={`
              flex 
              backdrop-blur-xl justify-center flex-col py-6 sm:py-8 lg:py-10 px-4 sm:px-6 lg:px-8 w-full
              transition-all duration-300
              ${isSearchFocused ? 'shadow-teal-500/20 border-teal-700/50' : ''}
            `}>
              {/* Logo and Title */}
              <div className="flex flex-col items-center mb-6 sm:mb-8">
                
                <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 text-white text-center leading-tight">
                  Kamero Research Base
                </h1>
                <p className="text-teal-200/70 text-center text-xs sm:text-sm lg:text-base max-w-lg px-4">
                  Discover groundbreaking research and scholarly articles
                </p>
              </div>

              {/* Search Form */}
              <div className="flex justify-center w-full mb-4 sm:mb-6">
                <div className="relative w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl flex">
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
                      px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-sm sm:text-base
                      transition-all duration-300
                      focus:bg-white/10 focus:border-teal-500/50
                      hover:bg-white/10"
                  />
                  <button 
                    type="submit" 
                    className="px-3 sm:px-4 lg:px-6 text-white border-2 border-l-0 rounded-r-xl 
                      border-teal-700/30 bg-gradient-to-r from-teal-600 to-teal-700
                      hover:from-teal-500 hover:to-teal-600 
                      transition-all duration-300 group min-w-fit"
                  >
                    <i className="bi bi-search text-sm sm:text-base lg:text-lg group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Tagline */}
              <h4 className="text-center py-3 sm:py-4 font-medium text-teal-200/80 text-base sm:text-lg lg:text-xl">
                Scholars' First Spot
              </h4>

            </div>
            
            {/* Popular Searches */}
            <div className="mt-6 sm:mt-8 text-center w-full max-w-4xl">
              <p className="text-teal-200/60 text-xs sm:text-sm mb-3">Popular searches:</p>
              <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 px-4">
                {["Machine Learning", "Climate Change", "Quantum Computing", "Biotechnology", "Neural Networks"].map((term) => (
                  <button
                    key={term}
                    onClick={() => setSearchQuery(term)}
                    className="px-2.5 sm:px-3 lg:px-4 py-1 sm:py-1.5 text-xs sm:text-sm rounded-full 
                      bg-white/5 text-white/70 border border-teal-700/30
                      hover:bg-white/10 hover:text-teal-100 hover:border-teal-600/50
                      transition-all duration-200 whitespace-nowrap"
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