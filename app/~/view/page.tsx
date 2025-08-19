"use client";

import Preloader from "@/app/components/app/divPreloader";
import TopBar from "@/app/components/results/top";
import Footer from "@/app/pages/footer";
import SideBar from "@/app/pages/sidebar";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";

interface Research {
  title: string;
  researcher: string;
  category: string;
  institute: string;
  status: string;
  progress_status: string;
  school: string;
  year: string;
  abstract: string;
  document: string;
  document_type: string;
  created_at: string;
  is_public: boolean;
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const year = date.getFullYear();
  const month = months[date.getMonth()];
  const day = String(date.getDate()).padStart(2, "0");
  return `${month} ${day}, ${year}`;
}

function getStatusStyle(status: string) {
  switch (status?.toLowerCase()) {
    case "completed":
      return "bg-green-50 text-green-700 border-green-200";
    case "ongoing":
      return "bg-blue-50 text-blue-700 border-blue-200";
    default:
      return "bg-yellow-50 text-yellow-700 border-yellow-200";
  }
}

// Secure Document Viewer Modal Component
const DocumentViewerModal: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void; 
  documentUrl: string;
  documentType: string;
  title: string;
}> = ({ isOpen, onClose, documentUrl, documentType, title }) => {
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Zoom controls
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 25, 50));
  };

  const handleZoomReset = () => {
    setZoomLevel(100);
  };

  // Fullscreen toggle
  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      try {
        await modalRef.current?.requestFullscreen();
        setIsFullscreen(true);
      } catch (err) {
        console.error("Error attempting to enable fullscreen:", err);
      }
    } else {
      try {
        await document.exitFullscreen();
        setIsFullscreen(false);
      } catch (err) {
        console.error("Error attempting to exit fullscreen:", err);
      }
    }
  };

  // Handle fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !document.fullscreenElement) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Prevent right-click context menu
  useEffect(() => {
    const preventContextMenu = (e: MouseEvent) => {
      if (isOpen) {
        e.preventDefault();
        return false;
      }
    };

    const preventDrag = (e: DragEvent) => {
      if (isOpen) {
        e.preventDefault();
        return false;
      }
    };

    const preventSelection = (e: Event) => {
      if (isOpen && e.target && (e.target as HTMLElement).closest('.document-content')) {
        e.preventDefault();
        return false;
      }
    };

    if (isOpen) {
      document.addEventListener('contextmenu', preventContextMenu);
      document.addEventListener('dragstart', preventDrag);
      document.addEventListener('selectstart', preventSelection);
    }

    return () => {
      document.removeEventListener('contextmenu', preventContextMenu);
      document.removeEventListener('dragstart', preventDrag);
      document.removeEventListener('selectstart', preventSelection);
    };
  }, [isOpen]);

  // Reset states when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setZoomLevel(100);
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      // Exit fullscreen when closing modal
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
    }
  }, [isOpen]);

  const handleIframeLoad = () => {
    setIsLoading(false);
    
    // Try to inject CSS to hide download buttons in iframe (may not work due to CORS)
    try {
      const iframe = iframeRef.current;
      if (iframe && iframe.contentWindow) {
        const style = document.createElement('style');
        style.textContent = `
          #toolbar { display: none !important; }
          .ndfHFb-c4YZDc-Wrql6b { display: none !important; }
          .ndfHFb-c4YZDc-GSQQnc-LgbsSe { display: none !important; }
          [role="toolbar"] { display: none !important; }
          .drive-viewer-toolstrip { display: none !important; }
        `;
        iframe.contentDocument?.head?.appendChild(style);
      }
    } catch (e) {
      // Expected to fail due to CORS, but we try anyway
    }
  };

  if (!isOpen) return null;

  // Determine if the document type is an image
  const isImage = documentType?.toLowerCase().includes('image') || 
                  documentUrl?.match(/\.(jpg|jpeg|png|gif|bmp|svg|webp)$/i);
  
  // Check if it's a Google Drive URL
  const isGoogleDrive = documentUrl?.includes('drive.google.com');
  
  // Process the URL for viewing
  const getViewableUrl = () => {
    if (isGoogleDrive) {
      // Extract file ID and use preview mode without toolbar
      const fileIdMatch = documentUrl.match(/[-\w]{25,}/);
      if (fileIdMatch) {
        // Add parameters to try to hide controls
        return `https://drive.google.com/file/d/${fileIdMatch[0]}/preview?rm=minimal`;
      }
    }
    // For PDFs, use Google Docs viewer
    if (documentUrl?.toLowerCase().endsWith('.pdf') || documentType?.toLowerCase().includes('pdf')) {
      return `https://docs.google.com/viewer?url=${encodeURIComponent(documentUrl)}&embedded=true&rm=minimal`;
    }
    return documentUrl;
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Enhanced backdrop with blur and semi-transparency */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
        style={{ 
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)'
        }}
      />

      {/* Modal Content */}
      <div 
        ref={modalRef}
        className={`relative ${isFullscreen ? 'w-full h-full' : 'w-[92vw] h-[92vh] max-w-7xl'} bg-gray-900 shadow-2xl flex flex-col overflow-hidden transition-all duration-300`}
        style={{ borderRadius: isFullscreen ? '0' : '0.75rem' }}
      >
        
        {/* Minimalist Header */}
        <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-4 bg-gradient-to-b from-gray-900/95 to-transparent">
          <div className="flex items-center gap-3">
            <h3 className="text-white/90 text-sm font-medium truncate max-w-[300px] lg:max-w-[500px]" title={title}>
              {title}
            </h3>
          </div>

          {/* Control buttons */}
          <div className="flex items-center gap-2">
            {/* Zoom Controls */}
            <div className="flex items-center gap-1 bg-gray-800/80 backdrop-blur-sm rounded-full px-3 py-1.5">
              <button
                onClick={handleZoomOut}
                className="p-1.5 hover:bg-gray-700/50 rounded-full transition-all"
                title="Zoom Out (-))"
                disabled={zoomLevel <= 50}
              >
                <svg className="w-4 h-4 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              
              <span className="px-3 text-xs font-medium text-white/80 min-w-[50px] text-center select-none">
                {zoomLevel}%
              </span>
              
              <button
                onClick={handleZoomIn}
                className="p-1.5 hover:bg-gray-700/50 rounded-full transition-all"
                title="Zoom In (+)"
                disabled={zoomLevel >= 200}
              >
                <svg className="w-4 h-4 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>

              <div className="w-px h-5 bg-gray-600/50 mx-1"></div>
              
              <button
                onClick={handleZoomReset}
                className="p-1.5 hover:bg-gray-700/50 rounded-full transition-all"
                title="Reset Zoom (R)"
              >
                <svg className="w-4 h-4 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            </div>

            {/* Fullscreen Button */}
            <button
              onClick={toggleFullscreen}
              className="p-2.5 bg-gray-800/80 backdrop-blur-sm hover:bg-gray-700/80 rounded-full transition-all"
              title={isFullscreen ? "Exit Fullscreen (F)" : "Fullscreen (F)"}
            >
              {isFullscreen ? (
                <svg className="w-4 h-4 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              )}
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2.5 bg-red-600/80 backdrop-blur-sm hover:bg-red-700/80 rounded-full transition-all ml-2"
              title="Close (ESC)"
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Document Viewer Area */}
        <div 
          ref={containerRef}
          className="flex-1 bg-gray-950 relative overflow-hidden document-content"
          style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
        >
          {/* Loading Indicator */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-10">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-sm text-gray-400">Loading secure document viewer...</p>
              </div>
            </div>
          )}

          {/* Document Content */}
          {isImage ? (
            // Image viewer with protection
            <div 
              className="w-full h-full flex items-center justify-center p-8 select-none"
              style={{
                transform: `scale(${zoomLevel / 100})`,
                transformOrigin: 'center center',
                transition: 'transform 0.2s ease-in-out',
                userSelect: 'none',
                // @ts-ignore - vendor prefixes
                WebkitUserSelect: 'none',
                MozUserSelect: 'none',
                msUserSelect: 'none'
              } as React.CSSProperties}
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
            >
              <img
                src={documentUrl}
                alt={title}
                className="max-w-full max-h-full object-contain select-none pointer-events-none"
                style={{ 
                  userSelect: 'none',
                  // @ts-ignore - vendor prefixes for older browsers
                  WebkitUserSelect: 'none',
                  WebkitTouchCallout: 'none',
                  WebkitUserDrag: 'none',
                  pointerEvents: 'none'
                } as React.CSSProperties}
                draggable={false}
                onLoad={() => setIsLoading(false)}
                onError={() => {
                  setIsLoading(false);
                  alert("Failed to load image");
                }}
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
              />
            </div>
          ) : (
            // PDF and document viewer with iframe
            <div className="w-full h-full relative">
              <iframe
                ref={iframeRef}
                src={getViewableUrl()}
                className="absolute inset-0 w-full h-full bg-white"
                style={{
                  width: `${100 / (zoomLevel / 100)}%`,
                  height: `${100 / (zoomLevel / 100)}%`,
                  border: 'none',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: `translate(-50%, -50%) scale(${zoomLevel / 100})`
                }}
                onLoad={handleIframeLoad}
                onError={() => {
                  setIsLoading(false);
                  console.error("Failed to load document");
                }}
                title={title}
                sandbox="allow-same-origin allow-scripts"
                allowFullScreen={false}
              />
              {/* Overlay to prevent interaction with certain areas */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{ zIndex: 5 }}
              />
            </div>
          )}

          {/* Watermark overlay (optional) */}
          <div 
            className="absolute inset-0 pointer-events-none select-none"
            style={{
              background: 'repeating-linear-gradient(45deg, transparent, transparent 100px, rgba(0,0,0,0.02) 100px, rgba(0,0,0,0.02) 200px)',
              zIndex: 10
            }}
          />
        </div>

        {/* Keyboard shortcuts hint */}
        <div className="absolute bottom-4 left-4 text-xs text-gray-500 select-none">
          <span className="bg-gray-800/70 backdrop-blur-sm px-2 py-1 rounded">
            ESC to close • F for fullscreen • +/- for zoom
          </span>
        </div>
      </div>

      {/* Additional CSS for security */}
      <style dangerouslySetInnerHTML={{ __html: `
        .document-content * {
          -webkit-touch-callout: none !important;
          -webkit-user-select: none !important;
          -khtml-user-select: none !important;
          -moz-user-select: none !important;
          -ms-user-select: none !important;
          user-select: none !important;
        }
        
        .document-content img {
          pointer-events: none !important;
          -webkit-user-drag: none !important;
          -khtml-user-drag: none !important;
          -moz-user-drag: none !important;
          -o-user-drag: none !important;
          user-drag: none !important;
        }
        
        iframe {
          -webkit-touch-callout: none !important;
          -webkit-user-select: none !important;
        }
      `}} />
    </div>
  );
};

// Comment Modal Component
const CommentModal: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void; 
  research: Research;
  researchId: string;
}> = ({ isOpen, onClose, research, researchId }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!comment.trim()) {
      setError("Please enter a comment");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccess("Comment submitted successfully!");
      setTimeout(() => {
        onClose();
        setComment("");
        setRating(0);
        setSuccess("");
      }, 2000);
    } catch (err) {
      setError("Failed to submit comment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50 p-4">
      <button
        onClick={onClose}
        className="absolute right-4 top-4 w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-200 group z-10"
        aria-label="Close modal"
      >
        <svg 
          className="w-4 h-4 text-gray-600 group-hover:text-teal-600 transition-colors" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="w-full max-w-2xl bg-white rounded-lg shadow-2xl max-h-[90vh] overflow-hidden">
        <div className="bg-gradient-to-r from-teal-600 to-teal-700 px-6 py-4">
          <h2 className="text-center text-xl font-bold text-white">
            Add Comment
          </h2>
          <p className="text-center text-teal-100 text-sm mt-1">
            Share your thoughts about this research
          </p>
        </div>

        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Research Title
              </label>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-900 font-medium">{research.title}</p>
                <p className="text-xs text-gray-500 mt-1">by {research.researcher}</p>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rate this research (optional)
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="text-2xl transition-colors"
                  >
                    <i className={`bi bi-star${star <= rating ? '-fill' : ''} ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}></i>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Comment <span className="text-red-500">*</span>
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 bg-white focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100 transition-all duration-200 min-h-[120px]"
                placeholder="Share your thoughts, feedback, or questions about this research..."
                required
              />
              <p className="text-xs text-gray-500 mt-1">{comment.length}/500 characters</p>
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-3 focus:ring-gray-200 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-3 focus:ring-teal-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg min-w-[120px]"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Submitting...
                  </span>
                ) : (
                  'Submit Comment'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Report Issue Modal Component
const ReportIssueModal: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void; 
  research: Research;
  researchId: string;
}> = ({ isOpen, onClose, research, researchId }) => {
  const [issueType, setIssueType] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const issueTypes = [
    "Incorrect information",
    "Copyright violation",
    "Inappropriate content",
    "Broken document link",
    "Duplicate research",
    "Other"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!issueType || !description.trim()) {
      setError("Please select an issue type and provide a description");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccess("Report submitted successfully! We'll review it shortly.");
      setTimeout(() => {
        onClose();
        setIssueType("");
        setDescription("");
        setEmail("");
        setSuccess("");
      }, 2000);
    } catch (err) {
      setError("Failed to submit report. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50 p-4">
      <button
        onClick={onClose}
        className="absolute right-4 top-4 w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-200 group z-10"
        aria-label="Close modal"
      >
        <svg 
          className="w-4 h-4 text-gray-600 group-hover:text-teal-600 transition-colors" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="w-full max-w-2xl bg-white rounded-lg shadow-2xl max-h-[90vh] overflow-hidden">
        <div className="bg-gradient-to-r from-teal-600 to-teal-700 px-6 py-4">
          <h2 className="text-center text-xl font-bold text-white">
            Report Issue
          </h2>
          <p className="text-center text-teal-100 text-sm mt-1">
            Help us maintain quality by reporting problems
          </p>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Research Being Reported
              </label>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-900 font-medium">{research.title}</p>
                <p className="text-xs text-gray-500 mt-1">by {research.researcher}</p>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Issue Type <span className="text-red-500">*</span>
              </label>
              <select
                value={issueType}
                onChange={(e) => setIssueType(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 bg-white focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100 transition-all duration-200"
                required
              >
                <option value="">Select an issue type</option>
                {issueTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 bg-white focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100 transition-all duration-200 min-h-[120px]"
                placeholder="Please provide details about the issue..."
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Email (optional)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 bg-white focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100 transition-all duration-200"
                placeholder="your.email@example.com"
              />
              <p className="text-xs text-gray-500 mt-1">We'll use this to update you on the issue status</p>
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-3 focus:ring-gray-200 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-3 focus:ring-teal-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg min-w-[120px]"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Submitting...
                  </span>
                ) : (
                  'Submit Report'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Share Button Component (Updated)
const ShareButton: React.FC<{ 
  research: Research; 
  researchId: string; 
  variant?: 'header' | 'quick-action';
  onOpenModal?: () => void;
}> = ({ 
  research, 
  researchId,
  variant = 'header',
  onOpenModal
}) => {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const shareMenuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (shareMenuRef.current && !shareMenuRef.current.contains(event.target as Node) &&
          buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setShowShareMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleShare = (platform: string) => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const shareUrl = `${baseUrl}/~/view?id=${researchId}`;
    const shareTitle = research.title;
    const shareText = `Check out this research: "${shareTitle}" by ${research.researcher} (${research.year})`;

    let shareLink = '';

    switch (platform) {
      case 'whatsapp':
        shareLink = `https://wa.me/?text=${encodeURIComponent(shareText + '\n' + shareUrl)}`;
        break;
      case 'linkedin':
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'gmail':
        shareLink = `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`;
        break;
    }

    if (shareLink) {
      window.open(shareLink, '_blank', 'noopener,noreferrer');
    }
    
    setShowShareMenu(false);
  };

  const shareOptions = [
    { name: 'WhatsApp', icon: 'bi-whatsapp', color: 'hover:bg-green-50 hover:text-green-600', platform: 'whatsapp' },
    { name: 'LinkedIn', icon: 'bi-linkedin', color: 'hover:bg-blue-50 hover:text-blue-600', platform: 'linkedin' },
    { name: 'X (Twitter)', icon: 'bi-twitter-x', color: 'hover:bg-gray-100 hover:text-gray-900', platform: 'twitter' },
    { name: 'Gmail', icon: 'bi-envelope', color: 'hover:bg-red-50 hover:text-red-600', platform: 'gmail' }
  ];

  const handleClick = () => {
    if (variant === 'quick-action' && onOpenModal) {
      onOpenModal();
    } else {
      setShowShareMenu(!showShareMenu);
    }
  };

  if (variant === 'quick-action') {
    return (
      <button
        onClick={handleClick}
        className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
      >
        <i className="bi bi-share text-green-500"></i>
        <span className="text-sm text-gray-700">Share research</span>
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setShowShareMenu(!showShareMenu)}
        className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
      >
        <i className="bi bi-share"></i>
        <span className="hidden sm:inline">Share</span>
      </button>

      {showShareMenu && (
        <div
          ref={shareMenuRef}
          className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-[180px] z-50"
        >
          <div className="px-3 py-2 border-b border-gray-100">
            <p className="text-xs font-medium text-gray-500 uppercase">Share via</p>
          </div>
          {shareOptions.map((option) => (
            <button
              key={option.platform}
              onClick={(e) => {
                e.stopPropagation();
                handleShare(option.platform);
              }}
              className={`w-full px-4 py-2 text-left text-sm text-gray-700 transition-colors flex items-center gap-3 ${option.color}`}
            >
              <i className={`${option.icon} text-base`}></i>
              <span>{option.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Share Modal Component
const ShareModal: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void; 
  research: Research;
  researchId: string;
}> = ({ isOpen, onClose, research, researchId }) => {
  const [copied, setCopied] = useState(false);

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const shareUrl = `${baseUrl}/~/view?id=${researchId}`;
  const shareTitle = research.title;
  const shareText = `Check out this research: "${shareTitle}" by ${research.researcher} (${research.year})`;

  const handleShare = (platform: string) => {
    let shareLink = '';

    switch (platform) {
      case 'whatsapp':
        shareLink = `https://wa.me/?text=${encodeURIComponent(shareText + '\n' + shareUrl)}`;
        break;
      case 'linkedin':
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'gmail':
        shareLink = `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`;
        break;
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'telegram':
        shareLink = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
        break;
    }

    if (shareLink) {
      window.open(shareLink, '_blank', 'noopener,noreferrer');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  const shareOptions = [
    { name: 'WhatsApp', icon: 'bi-whatsapp', color: 'bg-green-500 hover:bg-green-600', platform: 'whatsapp' },
    { name: 'LinkedIn', icon: 'bi-linkedin', color: 'bg-blue-600 hover:bg-blue-700', platform: 'linkedin' },
    { name: 'X (Twitter)', icon: 'bi-twitter-x', color: 'bg-gray-900 hover:bg-gray-800', platform: 'twitter' },
    { name: 'Facebook', icon: 'bi-facebook', color: 'bg-blue-500 hover:bg-blue-600', platform: 'facebook' },
    { name: 'Telegram', icon: 'bi-telegram', color: 'bg-sky-500 hover:bg-sky-600', platform: 'telegram' },
    { name: 'Email', icon: 'bi-envelope', color: 'bg-red-500 hover:bg-red-600', platform: 'gmail' }
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50 p-4">
      <button
        onClick={onClose}
        className="absolute right-4 top-4 w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-200 group z-10"
        aria-label="Close modal"
      >
        <svg 
          className="w-4 h-4 text-gray-600 group-hover:text-teal-600 transition-colors" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="w-full max-w-2xl bg-white rounded-lg shadow-2xl max-h-[90vh] overflow-hidden">
        <div className="bg-gradient-to-r from-teal-600 to-teal-700 px-6 py-4">
          <h2 className="text-center text-xl font-bold text-white">
            Share Research
          </h2>
          <p className="text-center text-teal-100 text-sm mt-1">
            Share this research with others
          </p>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Research Title
            </label>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-900 font-medium">{research.title}</p>
              <p className="text-xs text-gray-500 mt-1">by {research.researcher} • {research.year}</p>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Share via Social Media
            </label>
            <div className="grid grid-cols-3 gap-3">
              {shareOptions.map((option) => (
                <button
                  key={option.platform}
                  onClick={() => handleShare(option.platform)}
                  className={`flex flex-col items-center justify-center p-4 rounded-lg text-white transition-all duration-200 ${option.color} hover:shadow-lg`}
                >
                  <i className={`${option.icon} text-2xl mb-2`}></i>
                  <span className="text-xs font-medium">{option.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Or copy link
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2.5 bg-gray-50 text-sm text-gray-700"
              />
              <button
                onClick={copyToClipboard}
                className={`px-4 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                  copied 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {copied ? (
                  <span className="flex items-center gap-2">
                    <i className="bi bi-check"></i>
                    Copied!
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <i className="bi bi-clipboard"></i>
                    Copy
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ResearchViewPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [research, setResearch] = useState<Research | null>(null);
  const [id, setId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  
  // Modal states
  const [showShareModal, setShowShareModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showDocumentViewerModal, setShowDocumentViewerModal] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const researchId = urlParams.get("id");
      if (researchId) {
        setId(researchId);
      } else {
        setError("Research ID not provided");
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    if (id) {
      const fetchResearch = async () => {
        setLoading(true);
        setError(null);
        
        try {
          const response = await fetch(`/api/researches/view`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({ id }),
          });

          if (!response.ok) {
            throw new Error("Research not found");
          }

          const data = await response.json();
          setResearch(data);
        } catch (error) {
          setError("Research not found");
          console.error("Fetch error:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchResearch();
    }
  }, [id]);

  useEffect(() => {
    if (research?.abstract) {
      const abstractElement = document.getElementById("abstract") as HTMLDivElement;
      if (abstractElement) {
        abstractElement.innerHTML = research.abstract;
      }
    }
  }, [research]);

  useEffect(() => {
    if (id) {
      const updateRatings = async () => {
        try {
          await fetch(`/api/researches/ratings`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({ id }),
          });
        } catch (error) {
          console.error("Failed to update ratings:", error);
        }
      };

      updateRatings();
    }
  }, [id]);

  const showSideBar = () => setIsOpen(!isOpen);
  const closeSideBar = () => setIsOpen(false);

  const getPageTitle = () => {
    if (error) return "Research Not Found";
    if (loading) return "Loading Research...";
    return research?.title || "Research Details";
  };

  return (
    <>
      <head>
        <title>{getPageTitle()}</title>
      </head>
      
      <TopBar onClickSideBar={showSideBar} />
      
      <div className="min-h-screen bg-gray-50 mt-[80px]" onClick={closeSideBar}>
        {error ? (
          <div className="flex items-center justify-center min-h-[60vh] px-4">
            <div className="text-center bg-white rounded-lg shadow-sm p-8 sm:p-12 max-w-md mx-auto">
              <i className="bi bi-exclamation-triangle text-4xl sm:text-5xl text-red-500 mb-4"></i>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Research Not Found</h2>
              <p className="text-sm sm:text-base text-gray-600 mb-6">The research document you're looking for doesn't exist or has been removed.</p>
              <Link 
                href="/" 
                className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm"
              >
                <i className="bi bi-arrow-left mr-2"></i>
                Back to Research Library
              </Link>
            </div>
          </div>
        ) : loading ? (
          <div className="flex items-center justify-center min-h-[60vh] px-4">
            <div className="text-center">
              <Preloader />
              <p className="mt-4 text-gray-600 text-sm sm:text-base">Loading research details...</p>
            </div>
          </div>
        ) : research ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
            {/* Header Section */}
            <div className="bg-white rounded-lg shadow-sm border mb-6 sm:mb-8">
              <div className="p-4 sm:p-6 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 leading-tight break-words">
                      {research.title}
                    </h1>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <i className="bi bi-person mr-1 flex-shrink-0"></i>
                        <span className="truncate">{research.researcher}</span>
                      </span>
                      <span className="flex items-center">
                        <i className="bi bi-calendar mr-1 flex-shrink-0"></i>
                        {research.year}
                      </span>
                      <span className="flex items-center">
                        <i className="bi bi-building mr-1 flex-shrink-0"></i>
                        <span className="truncate">{research.institute}</span>
                      </span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm capitalize font-medium border ${getStatusStyle(research.progress_status || "")} flex-shrink-0`}>
                    <i className={`bi ${research.progress_status === "completed" ? "bi-check-circle" : "bi-clock"} mr-1`}></i>
                    {research.progress_status}
                  </span>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 flex items-center gap-2 sm:gap-3">
                <button disabled className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                  <i className="bi bi-bookmark"></i>
                  <span className="hidden sm:inline">Save</span>
                </button>
                <ShareButton research={research} researchId={id} variant="header" />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Abstract Section */}
                <div className="bg-white rounded-lg shadow-sm border">
                  <div className="p-4 sm:p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <i className="bi bi-file-text mr-2 text-teal-600 flex-shrink-0"></i>
                      Abstract
                    </h2>
                    <div 
                      id="abstract" 
                      className="prose prose-gray max-w-none text-gray-700 leading-relaxed text-sm sm:text-base"
                    ></div>
                  </div>
                </div>

                {/* Document Access - Modified */}
                {research.document && research.is_public &&(
                  <div className="bg-white rounded-lg shadow-sm border">
                    <div className="p-4 sm:p-6">
                      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <i className="bi bi-file-earmark-pdf mr-2 text-red-600 flex-shrink-0"></i>
                        Full Document
                      </h2>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <i className="bi bi-file-earmark-pdf text-red-600 text-lg sm:text-xl"></i>
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-gray-900 text-sm sm:text-base break-words">Research Document</p>
                            <p className="text-xs sm:text-sm text-gray-600">{research.document_type || "PDF"}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => setShowDocumentViewerModal(true)}
                          className="flex items-center justify-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm flex-shrink-0"
                        >
                          <i className="bi bi-eye"></i>
                          View Document
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Research Details */}
                <div className="bg-white rounded-lg shadow-sm border">
                  <div className="p-4 sm:p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <i className="bi bi-info-circle mr-2 text-blue-600 flex-shrink-0"></i>
                      Research Details
                    </h2>
                    <div className="space-y-4">
                      {[
                        { 
                          label: "Status", 
                          value: research.progress_status,
                          icon: "bi-flag"
                        },
                        { 
                          label: "Researcher", 
                          value: research.researcher,
                          icon: "bi-person"
                        },
                        { 
                          label: "Institution", 
                          value: research.institute,
                          icon: "bi-building"
                        },
                        { 
                          label: "School/Department", 
                          value: research.school,
                          icon: "bi-mortarboard"
                        },
                        { 
                          label: "Category", 
                          value: research.category,
                          icon: "bi-tag"
                        },
                        { 
                          label: "Year", 
                          value: research.year,
                          icon: "bi-calendar"
                        },
                        { 
                          label: "Document Type", 
                          value: research.document_type,
                          icon: "bi-file-earmark"
                        },
                        { 
                          label: "Published", 
                          value: research.created_at ? formatDate(research.created_at) : "",
                          icon: "bi-clock"
                        },
                      ].map((item) => (
                        item.value && (
                          <div key={item.label} className="flex items-start gap-3">
                            <i className={`${item.icon} text-gray-400 mt-0.5 flex-shrink-0`}></i>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                {item.label}
                              </p>
                              <p className="text-sm text-gray-900 mt-1 break-words">
                                {item.value}
                              </p>
                            </div>
                          </div>
                        )
                      ))}
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow-sm border">
                  <div className="p-4 sm:p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
                    <div className="space-y-1">
                      <ShareButton 
                        research={research} 
                        researchId={id} 
                        variant="quick-action"
                        onOpenModal={() => setShowShareModal(true)}
                      />
                      <button 
                        onClick={() => setShowCommentModal(true)}
                        className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <i className="bi bi-chat text-blue-500 flex-shrink-0"></i>
                        <span className="text-sm text-gray-700">Add comment</span>
                      </button>
                      <button 
                        onClick={() => setShowReportModal(true)}
                        className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <i className="bi bi-flag text-red-500 flex-shrink-0"></i>
                        <span className="text-sm text-gray-700">Report issue</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {isOpen && <SideBar />}
      
      {/* Modals */}
      {research && (
        <>
          <DocumentViewerModal 
            isOpen={showDocumentViewerModal}
            onClose={() => setShowDocumentViewerModal(false)}
            documentUrl={research.document}
            documentType={research.document_type}
            title={research.title}
          />
          <ShareModal 
            isOpen={showShareModal}
            onClose={() => setShowShareModal(false)}
            research={research}
            researchId={id}
          />
          <CommentModal 
            isOpen={showCommentModal}
            onClose={() => setShowCommentModal(false)}
            research={research}
            researchId={id}
          />
          <ReportIssueModal 
            isOpen={showReportModal}
            onClose={() => setShowReportModal(false)}
            research={research}
            researchId={id}
          />
        </>
      )}
      
      <Footer />
    </>
  );
}