"use client";

import { useState, useEffect } from "react";

const SimilarTitles = () => {
  const [titles, setTitles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    // Get search query from URL and set the id
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const kay = urlParams.get("search");
      if (kay) {
        setQuery("" + kay);
      }
    }
  }, []);

  useEffect(() => {
    if (!query) return;

    const fetchTitles = async () => {
      try {
        const response = await fetch("/api/researches/titles", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ search: query }), // Adjust search and sort as needed
        });

        if (!response.ok) throw new Error("Failed to fetch");

        const data = await response.json();
        setTitles(data);
      } catch (error) {
        console.error("Error fetching titles:", error);
        setError("Failed to load titles");
      } finally {
        setLoading(false);
      }
    };

    fetchTitles();
  }, [query]);

  if (loading) {
    return (
      <div className="bg-white/95 backdrop-blur-sm py-2 px-3 space-y-1 flex flex-col max-h-[65vh] overflow-hidden overflow-y-visible rounded-b-lg border border-slate-200/60 shadow-xl">
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-teal-600 border-r-2 border-r-transparent"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white/95 backdrop-blur-sm py-2 px-3 space-y-1 flex flex-col max-h-[65vh] overflow-hidden overflow-y-visible rounded-b-lg border border-slate-200/60 shadow-xl">
        <div className="text-center py-8">
          <div className="w-10 h-10 mx-auto mb-3 bg-gradient-to-br from-red-100 to-red-50 rounded-full flex items-center justify-center border border-red-200">
            <span className="text-red-500 text-sm">⚠️</span>
          </div>
          <p className="text-sm mb-3 text-red-600">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="text-xs bg-gradient-to-r from-red-50 to-red-100 hover:from-red-100 hover:to-red-150 text-red-700 px-4 py-2 rounded-lg transition-all duration-200 border border-red-200 hover:border-red-300 shadow-sm hover:shadow-md"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/95 backdrop-blur-sm py-2 px-3 space-y-1 flex flex-col max-h-[65vh] overflow-hidden overflow-y-visible rounded-b-lg border border-slate-200/60 shadow-xl">
      {titles.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-10 h-10 mx-auto mb-3 bg-gradient-to-br from-slate-100 to-slate-50 rounded-full flex items-center justify-center border border-slate-200">
            <span className="text-slate-400 text-sm">📄</span>
          </div>
          <p className="text-sm text-slate-500">No related titles found</p>
        </div>
      ) : (
        titles.sort((a, b) => a.localeCompare(b)).map((title, i) => (
          <a
            key={i}
            href={`/~/result?search=${title}`}
            className="text-sm py-3 px-4 bg-gradient-to-r from-slate-50/80 to-white/90 rounded-lg hover:from-teal-50/80 hover:to-blue-50/80 hover:text-teal-700 text-slate-700 transition-all duration-300 border border-slate-500/40 hover:border-teal-300/60 hover:shadow-lg hover:scale-[1.01] backdrop-blur-sm"
          >
            {title}
          </a>
        ))
      )}
    </div>
  );
};

export default SimilarTitles;