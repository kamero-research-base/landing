"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import Ratings from "./ratings";
import Preloader from "../app/divPreloader";

interface Research {
  id: number;
  status: string;
  title: string;
  researcher: string;
  year: string;
  abstract: string;
  progress_status: string;
  ratings: number;
  created_at: string;
  hashed_id: string;
}

const headers = [
  { name: "all", icon: "bi-collection" },
  { name: "new", icon: "bi-plus-circle" },
  { name: "trends", icon: "bi-graph-up-arrow" },
  { name: "recommends", icon: "bi-award" },
];

function formatDate(dateString: any) {
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

function highlightText(text: string, query: string): string {
  if (!query.trim() || !text) return text;
  const queryWords = query
    .trim()
    .split(/\s+/)
    .map(word => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .filter(word => word.length > 0);
  if (queryWords.length === 0) return text;
  const pattern = new RegExp(`(${queryWords.join('|')})`, 'gi');
  return text.replace(pattern, '<mark class="bg-teal-100/60 text-teal-900 rounded">$1</mark>');
}

const HighlightedText: React.FC<{ text: string; query: string; className?: string }> = ({ 
  text, 
  query, 
  className = "" 
}) => {
  const highlightedHtml = highlightText(text, query);
  return (
    <span 
      className={className}
      dangerouslySetInnerHTML={{ __html: highlightedHtml }}
    />
  );
};

// Share Button Component
const ShareButton: React.FC<{ research: Research }> = ({ research }) => {
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
    const shareUrl = `${baseUrl}/~/view?id=${research.hashed_id}`;
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

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setShowShareMenu(!showShareMenu);
        }}
        className="text-sm text-gray-600 hover:text-teal-700 transition-colors"
      >
        <i className="bi bi-share me-1"></i>
        Share
      </button>

      {showShareMenu && (
        <div
          ref={shareMenuRef}
          className="absolute bottom-full mb-2 right-0 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-[160px] sm:min-w-[180px] z-50"
        >
          <div className="px-3 py-2 border-b border-gray-100">
            <p className="text-xs font-medium text-gray-500 uppercase">Share via</p>
          </div>
          {shareOptions.map((option) => (
            <button
              key={option.platform}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleShare(option.platform);
              }}
              className={`w-full px-3 sm:px-4 py-2 text-left text-sm text-gray-700 transition-colors flex items-center gap-3 ${option.color}`}
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

const Researches = () => {
  const [researches, setResearches] = useState<Research[]>([]);
  const [suggestedResearches, setSuggestedResearches] = useState<Research[]>([]);
  const [activeBtn, setActiveBtn] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const [header, setHeader] = useState("");
  const [initialLoad, setInitialLoad] = useState(true);
  const [showingSuggestions, setShowingSuggestions] = useState(false);

  const itemsPerPage = 10;

  const displayResearches = showingSuggestions ? suggestedResearches : researches;
  const displayCount = showingSuggestions ? 0 : researches.length;

  const totalPages = Math.ceil(displayResearches.length / itemsPerPage);

  const currentResearches = displayResearches.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const kay = urlParams.get("search");
      if (kay) {
        setQuery("" + kay);
      }
      setInitialLoad(false);
    }
  }, []);

  const fetchSuggestedResearches = async () => {
    try {
      const response = await fetch(`/api/researches`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ 
          search: query, // Pass the original search query
          getSuggestions: true // Flag to indicate we want smart suggestions
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setSuggestedResearches(data);
      }
    } catch (error) {
      console.error("Error fetching suggested researches:", error);
    }
  };

  useEffect(() => {
    if (initialLoad) return;

    const fetchResearches = async () => {
      setLoading(true);
      setError(null);
      setShowingSuggestions(false);

      try {
        const response = await fetch(`/api/researches`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ search: query, sort: header }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch researches");
        }

        const data = await response.json();
        setResearches(data);
        setLoading(false);
        setCurrentPage(1);

        if (data.length === 0 && query.trim()) {
          setShowingSuggestions(true);
          await fetchSuggestedResearches();
        }
      } catch (error) {
        setLoading(false);
        setError("An error occurred, check your network and try again.");
        console.error("Fetch error:", error);
      }
    };

    fetchResearches();
  }, [query, header, initialLoad]);

  const handleAbstract = (research: string, id: number) => {
    if (typeof window !== "undefined") {
      const abstract = document.getElementById("abstract" + id) as HTMLDivElement;
      if (abstract && research) {
        abstract.innerHTML = highlightText(research, showingSuggestions ? "" : query);
      }
    }
  };

  useEffect(() => {
    currentResearches.map((research) =>
      handleAbstract(research.abstract, research.id)
    );
  }, [currentResearches, query, showingSuggestions]);

  if (loading || initialLoad) {
    return (
      <div className="p-3 sm:p-5 w-full min-h-[60vh] flex justify-center items-center lg:ml-[20vw]">
        <div className="text-center">
          <Preloader />
          <p className="mt-4 text-gray-600">Loading research papers...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-3 sm:p-5 w-full min-h-[60vh] flex justify-center items-center lg:ml-[20vw]">
        <div className="text-center bg-red-50 border border-red-200 rounded-lg p-6 sm:p-8 max-w-md mx-auto">
          <i className="bi bi-exclamation-triangle text-3xl text-red-600 mb-3 d-block"></i>
          <p className="text-red-800">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-4 sm:py-6 px-3 sm:px-5 md:px-8 w-full min-h-[60vh] lg:ml-[20vw] bg-gray-50">
      <div className="bg-white border-b-2 border-gray-200 rounded-t-lg px-4 sm:px-6 py-4 sm:py-5 mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 sm:gap-0">
          <div>
            <h1 className="text-xl sm:text-2xl text-gray-900 mb-1">Research Repository</h1>
            <p className="text-gray-600 text-sm sm:text-base">
              {showingSuggestions ? (
                <>
                  <span className="font-semibold">0</span> results found
                  {query.trim() && (
                    <>
                      {" "}for <span className="italic text-gray-800 break-words">"{query}"</span>
                    </>
                  )}
                  <span className="block mt-1 text-sm">
                    <i className="bi bi-lightbulb text-amber-600 me-1"></i>
                    Showing <span className="font-semibold">{displayResearches.length}</span> suggested papers you might be interested in
                  </span>
                </>
              ) : (
                <>
                  Showing <span className="font-semibold">{displayCount}</span> results
                  {query.trim() && (
                    <>
                      {" "}for <span className="italic text-gray-800 break-words">"{query}"</span>
                    </>
                  )}
                </>
              )}
            </p>
          </div>
          <div className="text-xs sm:text-sm text-gray-500">
            <i className="bi bi-filter me-2"></i>
            <span className="hidden sm:inline">Sorted by:</span>
            <span className="sm:hidden">Sort:</span>
            <span className="font-medium capitalize ml-1">
              {showingSuggestions ? "Recommendations" : (header || "Relevance")}
            </span>
          </div>
        </div>
      </div>

      {showingSuggestions && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 sm:px-6 py-3 sm:py-4 mb-4 sm:mb-6">
          <div className="flex items-start gap-3">
            <i className="bi bi-info-circle text-amber-600 text-lg mt-0.5"></i>
            <div>
              <p className="text-amber-800 font-medium">No exact matches found</p>
              <p className="text-amber-700 text-sm mt-1">
                {query && query.trim() ? (
                  <>
                    Your search for "{query}" didn't return exact matches, but here are related research papers 
                    in similar fields that might interest you.
                  </>
                ) : (
                  <>
                    Here are some recommended research papers based on popularity and relevance.
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-2 sm:py-3 mb-4 sm:mb-6 overflow-x-auto">
        <nav className="flex gap-4 sm:gap-6 min-w-max">
          {headers.map((headerItem, i) => (
            <button
              key={i}
              onClick={() => {
                setActiveBtn(i);
                setHeader(headerItem.name);
              }}
              className={`pb-2 sm:pb-3 px-1 capitalize font-medium text-sm transition-all duration-200 border-b-2 flex items-center gap-2 whitespace-nowrap ${
                activeBtn === i
                  ? "text-teal-700 border-teal-700"
                  : "text-gray-600 border-transparent hover:text-gray-900 hover:border-gray-300"
              }`}
            >
              <i className={`${headerItem.icon} text-base`}></i>
              {headerItem.name === "recommends" ? "Recommended" : headerItem.name}
            </button>
          ))}
        </nav>
      </div>

      <div className="space-y-1">
        {currentResearches.map((research, i) => (
          <Link
            key={i}
            href={`/~/view?id=${research.hashed_id}`}
            className="block bg-white hover:bg-gray-50 border-b border-gray-200 transition-colors duration-150 hover:border-l-4 hover:border-teal-700/30 rounded-md group"
          >
            <article className="px-4 sm:px-6 py-4 sm:py-5">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-2 gap-2 sm:gap-0">
                <h2 className="text-base sm:text-lg font-semibold text-slate-800 hover:text-slate-900 transition-colors leading-tight pr-0 sm:pr-4 flex-1">
                  <HighlightedText 
                    text={research.title} 
                    query={showingSuggestions ? "" : query} 
                  />
                  {showingSuggestions && (
                    <span className="ml-2 text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                      Suggested
                    </span>
                  )}
                </h2>
                <span className={`py-1 w-a px-2 rounded-full text-sm capitalize border flex-shrink-0 ${getStatusStyle(research.progress_status || "")}`}>
                  <i className={`bi ${research.progress_status === "completed" ? "bi-check-circle" : "bi-clock"} me-1`}></i>
                  {research.progress_status || ""}
                </span>
              </div>

              <div className="text-sm text-gray-700 mb-2 flex flex-wrap items-center gap-1">
                <span className="font-medium">
                  <HighlightedText 
                    text={research.researcher} 
                    query={showingSuggestions ? "" : query} 
                  />
                </span>
                <span className="mx-2 text-gray-400">•</span>
                <span>
                  <HighlightedText 
                    text={research.year} 
                    query={showingSuggestions ? "" : query} 
                  />
                </span>
                <span className="mx-2 text-gray-400 hidden sm:inline">•</span>
                <span className="text-gray-600 w-full sm:w-auto">Published {formatDate(research.created_at)}</span>
              </div>

              <div
                className="text-gray-700 text-sm leading-relaxed mb-3 line-clamp-3"
                id={`abstract${research.id}`}
              ></div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Ratings rating={research.ratings} />
                    <span className="text-sm text-gray-600">({research.ratings})</span>
                  </div>
                 
                  <ShareButton research={research} />
                </div>
                <span className="text-sm text-teal-700 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  View Full Text →
                </span>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {displayResearches.length > 0 && (
        <div className="bg-white border-t border-gray-200 px-4 sm:px-6 py-3 sm:py-4 mt-4 sm:mt-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0">
            <p className="text-sm text-gray-700 text-center sm:text-left">
              {showingSuggestions ? (
                <>
                  Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{" "}
                  <span className="font-medium">
                    {Math.min(currentPage * itemsPerPage, displayResearches.length)}
                  </span>{" "}
                  of <span className="font-medium">{displayResearches.length}</span> suggested papers
                </>
              ) : (
                <>
                  Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{" "}
                  <span className="font-medium">
                    {Math.min(currentPage * itemsPerPage, displayResearches.length)}
                  </span>{" "}
                  of <span className="font-medium">{displayResearches.length}</span> results
                </>
              )}
            </p>

            {totalPages > 1 && (
              <nav className="flex items-center gap-2 justify-center sm:justify-start">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
                    currentPage === 1
                      ? "text-gray-400 bg-gray-100 cursor-not-allowed"
                      : "text-gray-700 bg-white hover:bg-gray-50 border border-gray-300"
                  }`}
                >
                  Previous
                </button>

                <div className="flex gap-1 overflow-x-auto max-w-[200px] sm:max-w-none">
                  {Array.from({ length: totalPages }, (_, index) => {
                    const pageNum = index + 1;
                    const showPage =
                      pageNum === 1 ||
                      pageNum === totalPages ||
                      (pageNum >= currentPage - 1 && pageNum <= currentPage + 1);
                    const showEllipsis = pageNum === currentPage - 2 || pageNum === currentPage + 2;

                    if (showEllipsis && totalPages > 5) {
                      return (
                        <span key={pageNum} className="px-2 text-gray-400">
                          ...
                        </span>
                      );
                    }

                    if (!showPage && totalPages > 5) return null;

                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
                          currentPage === pageNum
                            ? "bg-teal-700 text-white"
                            : "text-gray-700 bg-white hover:bg-gray-50 border border-gray-300"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
                    currentPage === totalPages
                      ? "text-gray-400 bg-gray-100 cursor-not-allowed"
                      : "text-gray-700 bg-white hover:bg-gray-50 border border-gray-300"
                  }`}
                >
                  Next
                </button>
              </nav>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Researches;