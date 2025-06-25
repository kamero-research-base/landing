import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import PopupForm from "../components/auth/choose";

// Constants
const LANGUAGES = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
] as const;

const ROUTES = {
  home: "/",
  help: "/~/help",
  join: "#auth",
  about: "/about",
  contact: "/contact-us",
} as const;

// Types
type Language = typeof LANGUAGES[number]["code"];

interface TopbarProps {
  onClickSideBar: () => void;
  isAuthenticated?: boolean;
  userAvatar?: string;
  userName?: string;
  currentLanguage?: Language;
  onLanguageChange?: (language: Language) => void;
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
  isAuthenticated: boolean; 
  userName?: string; 
  userAvatar?: string;
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
  onClose: () => void;
}> = ({ isOpen, isAuthenticated, userName, userAvatar, currentLanguage, onLanguageChange, onClose }) => {
  if (!isOpen) return null;

  const handleLinkClick = () => {
    onClose();
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
          
          {/* User Profile Section */}
          {isAuthenticated && (
            <div className="bg-white/5 rounded-xl p-4 border border-teal-800/30">
              <div className="flex items-center space-x-3 mb-4">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gradient-to-br from-teal-500 to-teal-700 shadow-lg">
                  {userAvatar ? (
                    <Image src={userAvatar} alt="User avatar" fill sizes="48px" className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <i className="bi bi-person text-white text-lg" />
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-white font-medium">{userName || 'Researcher'}</p>
                  <p className="text-teal-300 text-sm">Premium Member</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <Link href="/profile" onClick={handleLinkClick} className="flex items-center px-3 py-2 text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                  <i className="bi bi-person mr-3 w-4" />
                  My Profile
                </Link>
                <Link href="/research" onClick={handleLinkClick} className="flex items-center px-3 py-2 text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                  <i className="bi bi-journal-text mr-3 w-4" />
                  My Research
                </Link>
                <Link href="/settings" onClick={handleLinkClick} className="flex items-center px-3 py-2 text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                  <i className="bi bi-gear mr-3 w-4" />
                  Settings
                </Link>
              </div>
            </div>
          )}

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
              Help
            </Link>
          </div>

          {/* Language Selection */}
          <div className="space-y-3">
            <h3 className="text-teal-300 font-medium text-sm px-3">Language</h3>
            <div className="space-y-1">
              {LANGUAGES.map(({ code, label, flag }) => (
                <button
                  key={code}
                  onClick={() => onLanguageChange(code)}
                  className={`w-full flex items-center px-3 py-3 rounded-lg transition-colors ${
                    currentLanguage === code 
                      ? 'bg-teal-600/20 text-teal-300 border border-teal-600/30' 
                      : 'text-white/80 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="mr-3 text-lg">{flag}</span>
                  <span>{label}</span>
                  {currentLanguage === code && (
                    <i className="bi bi-check-lg ml-auto text-teal-400" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Auth Actions */}
          {isAuthenticated ? (
            <div className="pt-4 border-t border-teal-800/30">
              <button className="w-full flex items-center justify-center px-4 py-3 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 hover:text-red-300 transition-colors border border-red-600/30">
                <i className="bi bi-box-arrow-right mr-2" />
                Sign Out
              </button>
            </div>
          ) : (
            <div className="pt-4 border-t border-teal-800/30">
              <Link 
                href={ROUTES.join} 
                onClick={handleLinkClick}
                className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white font-medium rounded-lg shadow-lg hover:from-teal-500 hover:to-teal-600 transition-all"
              >
                <i className="bi bi-rocket-takeoff mr-2" />
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const LanguageSelector: React.FC<{
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
}> = ({ currentLanguage, onLanguageChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const currentLang = LANGUAGES.find(l => l.code === currentLanguage);

  return (
    <div className="relative hidden md:block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-2 lg:px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all duration-200 border border-white/10"
        aria-label="Select language"
      >
        <i className="bi bi-globe2 text-teal-300 text-sm" />
        <span className="text-xs lg:text-sm font-medium text-white hidden lg:inline">{currentLang?.flag} {currentLang?.code.toUpperCase()}</span>
        <i className={`bi bi-chevron-down text-xs text-teal-300 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-xl bg-slate-800 backdrop-blur-xl shadow-2xl border border-teal-800/30 py-1 z-50">
          {LANGUAGES.map(({ code, label, flag }) => (
            <button
              key={code}
              onClick={() => {
                onLanguageChange(code);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                currentLanguage === code 
                  ? 'bg-teal-600/20 text-teal-300' 
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="mr-2">{flag}</span> {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const UserProfile: React.FC<{ avatarUrl?: string; userName?: string }> = ({ avatarUrl, userName }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative hidden md:block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 lg:space-x-3 px-2 lg:px-3 py-2 rounded-xl bg-gradient-to-r from-teal-600/20 to-teal-700/20 hover:from-teal-600/30 hover:to-teal-700/30 backdrop-blur-sm transition-all duration-200 border border-teal-600/30"
        aria-label="User profile menu"
        type="button"
      >
        <div className="relative w-7 h-7 lg:w-8 lg:h-8 rounded-lg overflow-hidden bg-gradient-to-br from-teal-500 to-teal-700 shadow-lg">
          {avatarUrl ? (
            <Image src={avatarUrl} alt="User avatar" fill sizes="32px" className="object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <i className="bi bi-person text-white text-sm" />
            </div>
          )}
        </div>
        <span className="hidden lg:block text-sm font-medium text-white truncate max-w-24">{userName || 'Researcher'}</span>
        <i className="bi bi-chevron-down text-xs text-teal-300" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-xl bg-slate-800 backdrop-blur-xl shadow-2xl border border-teal-800/30 py-2 z-50">
          <div className="px-4 py-2 border-b border-teal-800/30">
            <p className="text-sm font-medium text-white truncate">{userName || 'Researcher'}</p>
            <p className="text-xs text-teal-300">Premium Member</p>
          </div>
          <a href="/profile" className="block px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors">
            <i className="bi bi-person mr-2" /> My Profile
          </a>
          <a href="/research" className="block px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors">
            <i className="bi bi-journal-text mr-2" /> My Research
          </a>
          <a href="/settings" className="block px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors">
            <i className="bi bi-gear mr-2" /> Settings
          </a>
          <hr className="my-2 border-teal-800/30" />
          <button className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors">
            <i className="bi bi-box-arrow-right mr-2" /> Sign Out
          </button>
        </div>
      )}
    </div>
  );
};


const NotificationBell: React.FC = () => (
  <button className="hidden md:block relative p-2 rounded-lg hover:bg-white/10 transition-colors">
    <i className="bi bi-bell text-teal-300 text-base lg:text-lg" />
    <span className="absolute top-1 right-1 w-2 h-2 bg-teal-400 rounded-full animate-pulse shadow-lg shadow-teal-400/50" />
  </button>
);

// Main component
const TopBar: React.FC<TopbarProps> = ({ 
  onClickSideBar, 
  isAuthenticated = false,
  userAvatar,
  userName,
  currentLanguage = "en",
  onLanguageChange = () => {}
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(currentLanguage);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

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

  const handleLanguageChange = (language: Language) => {
    setSelectedLanguage(language);
    onLanguageChange(language);
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
      <div className={`sticky top-0 z-40 transition-all duration-300 ${
         'bg-gradient-to-r from-teal-900 to-slate-900'
      }`}>
          <div className="px-3 sm:px-4 lg:px-8 py-3">
            <div className="flex items-center justify-between">
              {/* Left section */}
              <div className="flex items-center flex-1 space-x-3">
                <MenuButton onClick={handleMenuClick} isOpen={mobileMenuOpen} />
                <Logo />
                
              </div>

              {/* Right section */}
              <div className="flex items-center space-x-2 lg:space-x-3">
                {isAuthenticated && <NotificationBell />}
                <LanguageSelector 
                  currentLanguage={selectedLanguage}
                  onLanguageChange={handleLanguageChange}
                />
                {isAuthenticated ? (
                  <UserProfile avatarUrl={userAvatar} userName={userName} />
                ) : (
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
                )}
              </div>
            </div>
          </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={mobileMenuOpen}
        isAuthenticated={isAuthenticated}
        userName={userName}
        userAvatar={userAvatar}
        currentLanguage={selectedLanguage}
        onLanguageChange={handleLanguageChange}
        onClose={closeMobileMenu}
      />
      {isAuth && <PopupForm />}
    </>
  );
};

export default TopBar;