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

// Share Button Component
const ShareButton: React.FC<{ research: Research; researchId: string; variant?: 'header' | 'quick-action' }> = ({ 
  research, 
  researchId,
  variant = 'header' 
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

  if (variant === 'quick-action') {
    return (
      <div className="relative">
        <button
          ref={buttonRef}
          onClick={() => setShowShareMenu(!showShareMenu)}
          className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
        >
          <i className="bi bi-share text-green-500"></i>
          <span className="text-sm text-gray-700">Share research</span>
        </button>

        {showShareMenu && (
          <div
            ref={shareMenuRef}
            className="absolute bottom-full mb-2 left-0 right-0 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
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

export default function ResearchViewPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [research, setResearch] = useState<Research | null>(null);
  const [id, setId] = useState<string>("");
  const [loading, setLoading] = useState(true);

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

                {/* Document Access */}
                {research.document && (
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
                        <Link
                          href={research.document}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm flex-shrink-0"
                        >
                          <i className="bi bi-eye"></i>
                          View Document
                        </Link>
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
                      <ShareButton research={research} researchId={id} variant="quick-action" />
                      <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                        <i className="bi bi-chat text-blue-500 flex-shrink-0"></i>
                        <span className="text-sm text-gray-700">Add comment</span>
                      </button>
                      <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
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
      <Footer />
    </>
  );
}