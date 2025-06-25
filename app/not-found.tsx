"use client";

import React, { useState, useEffect } from 'react';

// Bootstrap Icons CDN will be loaded via HTML head

export default function NotFound() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load Bootstrap Icons CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.11.3/font/bootstrap-icons.min.css';
    document.head.appendChild(link);
    
    setIsLoaded(true);
    
    const handleMouseMove = (e: any) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const floatingElements = Array.from({ length: 6 }, (_, i) => (
    <div
      key={i}
      className={`absolute w-2 h-2 bg-teal-300/30 rounded-full animate-pulse`}
      style={{
        left: `${20 + (i * 15)}%`,
        top: `${30 + (i * 8)}%`,
        animationDelay: `${i * 0.5}s`,
        transform: `translate(${mousePos.x * 0.02}px, ${mousePos.y * 0.02}px)`
      }}
    />
  ));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-slate-800 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse"
          style={{
            transform: `translate(${mousePos.x * 0.05}px, ${mousePos.y * 0.05}px)`
          }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-teal-300/15 rounded-full blur-2xl animate-pulse"
          style={{
            animationDelay: '1s',
            transform: `translate(${-mousePos.x * 0.03}px, ${-mousePos.y * 0.03}px)`
          }}
        />
        {floatingElements}
      </div>

      {/* Main content */}
      <div className={`relative z-10 flex flex-col items-center justify-center min-h-screen px-6 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        
        {/* 404 Number with glassmorphism effect */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-teal-400/20 rounded-3xl blur-xl transform rotate-3 scale-110" />
          <div className="relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl px-12 py-8 shadow-2xl">
            <h1 className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-teal-400 to-cyan-300 tracking-tight animate-pulse">
              404
            </h1>
          </div>
        </div>

        {/* Main message */}
        <div className="text-center mb-12 max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            Oops! This page drifted away
          </h2>
          <p className="text-teal-200/80 text-lg md:text-xl leading-relaxed">
            The page you're looking for seems to have sailed into the digital ocean. 
            Let's navigate you back to familiar waters.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <button 
            onClick={() => window.history.back()}
            className="group relative overflow-hidden bg-teal-500 hover:bg-teal-400 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/25"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex items-center gap-3">
              <i className="bi bi-arrow-left text-xl transition-transform group-hover:-translate-x-1"></i>
              Go Back
            </div>
          </button>
          
          <button 
            onClick={() => window.location.href = '/'}
            className="group relative overflow-hidden bg-white/10 hover:bg-white/20 backdrop-blur-lg border border-white/20 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
          >
            <div className="flex items-center gap-3">
              <i className="bi bi-house text-xl transition-transform group-hover:scale-110"></i>
              Home
            </div>
          </button>
        </div>
        {/* Floating navigation compass */}
        <div className="absolute bottom-8 right-8">
          <div className="relative group">
            <div className="absolute inset-0 bg-teal-400/30 rounded-full blur-lg animate-pulse" />
            <button className="relative bg-white/10 backdrop-blur-lg border border-white/20 p-4 rounded-full hover:bg-white/20 transition-all duration-300 transform hover:rotate-45">
              <i className="bi bi-compass text-2xl text-teal-300"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(20, 184, 166, 0.3) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }} />
      </div>
    </div>
  );
}