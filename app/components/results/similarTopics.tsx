"use client";

import { useEffect, useState } from "react";

const researchTopics = [
  "Health Research",
  "Agriculture and Environmental Research",
  "Education and Social Sciences",
  "Energy and Infrastructure",
  "Information and Communication Technology (ICT)",
  "Industry and Manufacturing",
  "Natural and Basic Sciences",
  "Tourism and Cultural Heritage",
  "Policy and Governance",
  "Innovation and Technology Transfer"
];

const getSortedTopics = (query: string) => {
  const queryWords = query.toLowerCase().split(/\s+/).filter(Boolean);

  return researchTopics
    .map(topic => {
      const lowerTopic = topic.toLowerCase();
      const matchCount = queryWords.reduce((count, word) => count + (lowerTopic.includes(word) ? 1 : 0), 0);
      return { topic, matchCount };
    })
    .sort((a, b) => b.matchCount - a.matchCount) // Sort by match count (descending)
    .map(item => item.topic); // Extract sorted topics
};

const SimilarTopics = () => {
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

  const sortedTopics = getSortedTopics(query);

  return (
    <div className="bg-white/95 backdrop-blur-sm py-2 px-3 space-y-1 flex flex-col max-h-[65vh] overflow-hidden overflow-y-visible rounded-b-lg border border-slate-200/60 shadow-xl">
      {sortedTopics.map((topic, i) => (
        <a 
          key={i} 
          href={`/~/result?search=${topic}`} 
          className="text-sm py-3 px-4 bg-gradient-to-r from-slate-50/80 to-white/90 rounded-lg hover:from-teal-50/80 hover:to-blue-50/80 hover:text-teal-700 text-slate-700 transition-all duration-300 border border-slate-500/40 hover:border-teal-300/60 hover:shadow-lg hover:scale-[1.01] backdrop-blur-sm"
        >
          {topic}
        </a>
      ))}
    </div>
  );
};

export default SimilarTopics;