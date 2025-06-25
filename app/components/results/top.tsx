import Link from "next/link";
import React, { useState, useEffect } from "react";
import PopupForm from "../auth/choose";

// Constants
const ROUTES = {
  home: "/",
  help: "/~/help",
  join: "#auth",
  about: "/about",
  contact: "/contact",
};

// Types
interface TopbarProps {
  onClickSideBar: () => void;
}

// Sub-components
const Logo: React.FC = () => {
  return (
    <Link 
      href={ROUTES.home} 
      className="flex items-center space-x-3 group"
      aria-label="Kamero Research Base - Home"
    >
      <div className="relative w-9 h-9 sm:w-11 sm:h-11">
        <img src="/logo.svg" alt="" className="w-full h-full object-cover"/>
      </div>
      <div className="hidden md:block">
        <h1 className="text-base lg:text-lg font-bold text-white">
          Research Base
        </h1>
        <p className="text-[9px] text-teal-200/70 -mt-1">Advanced Research Platform</p>
      </div>
    </Link>
  );
};

const MenuButton: React.FC<{ onClick: () => void; isOpen: boolean }> = ({ onClick, isOpen }) => (
  <button
    onClick={onClick}
    className="relative ml-3 sm:ml-4 p-2 sm:p-2.5 rounded-xl bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all duration-200 group border border-white/10"
    aria-label="Toggle sidebar menu"
    type="button"
  >
    <div className="flex flex-col space-y-1.5">
      <span className={`block w-4 sm:w-5 h-0.5 bg-teal-300 group-hover:bg-teal-200 transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
      <span className={`block w-4 sm:w-5 h-0.5 bg-teal-300 group-hover:bg-teal-200 transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
      <span className={`block w-3 sm:w-5 h-0.5 bg-teal-300 group-hover:bg-teal-200 transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2 w-4 sm:w-5' : ''}`} />
    </div>
  </button>
);

const MobileMenu: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: () => void;
}> = ({ isOpen, onClose, searchQuery, setSearchQuery, handleSearch }) => {
  if (!isOpen) return null;

  const handleLinkClick = () => {
    onClose();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
      onClose();
    }
  };

  return (
    <div className="md:hidden">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      
      {/* Mobile Menu */}
      <div className="fixed top-[76px] left-0 right-0 bg-gradient-to-b from-slate-900/98 to-slate-800/98 backdrop-blur-xl border-t border-teal-800/30 shadow-2xl z-50 max-h-[calc(100vh-76px)] overflow-y-auto">
        <div className="px-4 py-6 space-y-6">
          
          {/* Mobile Search Section */}
          <div className="space-y-3">
            <h3 className="text-teal-300 font-medium text-sm">Search Research</h3>
            <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 flex">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Search for researches..."
                className="w-full placeholder:text-gray-500 border-none outline-none rounded-l-xl px-4 py-3 bg-transparent text-gray-800"
                aria-label="Search for research papers"
              />
              <button 
                onClick={() => { handleSearch(); onClose(); }}
                className="px-4 text-white bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-500 hover:to-teal-600 rounded-r-xl transition-all duration-200 border-l border-teal-200"
                aria-label="Search"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-1">
            <h3 className="text-teal-300 font-medium text-sm mb-3 px-3">Navigation</h3>
            <Link href={ROUTES.home} onClick={handleLinkClick} className="flex items-center px-3 py-3 text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
              <i className="bi bi-house mr-3 w-4" />
              Home
            </Link>
            <Link href={ROUTES.about} onClick={handleLinkClick} className="flex items-center px-3 py-3 text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
              <i className="bi bi-info-circle mr-3 w-4" />
              About Us
            </Link>
            <Link href={ROUTES.contact} onClick={handleLinkClick} className="flex items-center px-3 py-3 text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
              <i className="bi bi-envelope mr-3 w-4" />
              Contact
            </Link>
            <Link href={ROUTES.help} onClick={handleLinkClick} className="flex items-center px-3 py-3 text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
              <i className="bi bi-question-circle mr-3 w-4" />
              Help & Support
            </Link>
          </div>

          {/* Join Button */}
          <div className="pt-4 border-t border-teal-800/30">
            <Link 
              href={ROUTES.join} 
              onClick={handleLinkClick}
              className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white font-medium rounded-lg shadow-lg hover:from-teal-500 hover:to-teal-600 transition-all"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const SearchBar: React.FC<{ initialQuery?: string; isMobile?: boolean; searchQuery: string; setSearchQuery: (query: string) => void; handleSearch: () => void }> = ({ 
  initialQuery = "", 
  isMobile = false, 
  searchQuery, 
  setSearchQuery, 
  handleSearch 
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
      if (isMobile) {
        setIsSearchOpen(false);
      }
    }
  };

  if (isMobile) {
    return (
      <>
        <button
          onClick={() => setIsSearchOpen(true)}
          className="md:hidden p-2 rounded-lg bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all duration-200 border border-white/10"
          aria-label="Open search"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
        
        {/* Mobile Search Overlay */}
        {isSearchOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 md:hidden">
            <div className="bg-gradient-to-r from-teal-900 to-slate-900 p-4">
              <div className="flex bg-white backdrop-blur-sm rounded-xl shadow-lg border border-white/20">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Search for researches..."
                  className="w-full placeholder:text-gray-500 border-none outline-none rounded-l-xl px-4 py-3 bg-transparent text-gray-800"
                  aria-label="Search for research papers"
                  autoFocus
                />
                <button 
                  onClick={() => { handleSearch(); setIsSearchOpen(false); }}
                  className="px-4 text-white bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-500 hover:to-teal-600 rounded-r-xl transition-all duration-200 border-l border-teal-200"
                  aria-label="Search"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
              <button
                onClick={() => setIsSearchOpen(false)}
                className="mt-4 text-white/70 hover:text-white transition-colors text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="hidden md:flex bg-white/85 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 flex-1 max-w-xl mx-4">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Search for researches..."
        className="w-full placeholder:text-gray-500 border-none outline-none rounded-l-xl px-4 py-2.5 bg-transparent text-gray-800"
        aria-label="Search for research papers"
      />
      <button 
        onClick={handleSearch}
        className="px-4 text-white bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-500 hover:to-teal-600 rounded-r-xl transition-all duration-200 border-l border-teal-200"
        aria-label="Search"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    </div>
  );
};

const NavigationLinks: React.FC = () => (
  <div className="hidden xl:flex items-center space-x-6">
    <Link 
      href={ROUTES.help} 
      className="flex items-center text-white/70 hover:text-white transition-all duration-200"
    >
      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      Help
    </Link>
   
  </div>
);


// Main component
const TopBar: React.FC<TopbarProps> = ({ onClickSideBar }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    // Get search query from URL
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const kay = urlParams.get("search");
      if (kay) {
        setSearchQuery(kay);
      }
    }
  }, []);

  useEffect(() => {
    // Close mobile menu when screen size changes to desktop
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      window.location.href = `/~/result?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  const handleMenuClick = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    onClickSideBar(); // Also call the original sidebar function for desktop
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <div className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        'bg-gradient-to-r from-teal-900 to-slate-900'
      }`}>
        <div className="px-3 sm:px-4 lg:px-8 py-3 lg:py-4">
          <div className="flex items-center justify-between gap-3">
            {/* Left Section */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <MenuButton onClick={handleMenuClick} isOpen={mobileMenuOpen} />
              <Logo />
              
            </div>

            {/* Center Section - Desktop Search */}
            <SearchBar 
              searchQuery={searchQuery} 
              setSearchQuery={setSearchQuery} 
              handleSearch={handleSearch} 
            />

            {/* Right Section */}
            <div className="flex items-center gap-3">
              {/* Mobile Search Button */}
              <SearchBar 
                isMobile 
                searchQuery={searchQuery} 
                setSearchQuery={setSearchQuery} 
                handleSearch={handleSearch} 
              />
              <div className="flex items-center space-x-3 sm:space-x-4 lg:space-x-6">
                <NavigationLinks />
                
              
                  <Link
                    href={ROUTES.join}
                    onClick={() => setIsAuth(true)}
                    className="hidden md:flex relative px-3 lg:px-6 py-2 lg:py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-teal-700 text-white font-medium text-xs lg:text-sm overflow-hidden group shadow-lg shadow-teal-900/50 hover:shadow-xl hover:shadow-teal-900/50 transition-all duration-300 items-center"
                  >
                    <span className="relative z-10 flex items-center">
                      <i className="bi bi-rocket-takeoff mr-1 lg:mr-2" />
                      <span className="hidden lg:inline">Get Started</span>
                      <span className="lg:hidden">Join</span>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-teal-600 transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
                  </Link>
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={mobileMenuOpen}
        onClose={closeMobileMenu}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />
      {isAuth && <PopupForm />}
    </>
  );
};

export default TopBar;