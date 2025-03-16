"use client";
import { useState, useEffect } from "react";

const SimilarTitles = () => {
  const [titles, setTitles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    // Get search query from URL and set the id
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const kay = urlParams.get("search");
      if (kay) {
        setQuery(""+kay);
      }
    }
  }, []);

  useEffect(() => {
    const fetchTitles = async () => {
      try {
        const response = await fetch("/api/researches/titles", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ search: query}), // Adjust search and sort as needed
        });

        if (!response.ok) throw new Error("Failed to fetch");

        const data = await response.json();
        setTitles(data);
      } catch (error) {
        console.error("Error fetching");
      } finally {
        setLoading(false);
      }
    };

    fetchTitles();
  }, []);

  return (
    <div className="bg-white py-2 px-3 space-y-1 flex flex-col max-h-[65vh] overflow-hidden overflow-y-visible">
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-gray-500"></div>
        </div>
      ) : (
        titles.sort((a, b) => a.localeCompare(b)).map((title, i) => (
          <a
            key={i}
            href={`/w-page/result?search=${title}`}
            className="text-sm py-2 px-3 bg-slate-50 rounded hover:bg-slate-100 text-gray-600"
          >
            {title}
          </a>
        ))
      )}
    </div>
  );
};

export default SimilarTitles;
