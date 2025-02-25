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
        setQuery(""+kay);
      }
    }
  }, []);
const sortedTopics = getSortedTopics(query);
  return (
    <div className="div bg-white py-2 px-3 space-y-1 flex flex-col max-h-[65vh] overflow-hidden overflow-y-visible">
      {sortedTopics.map((topic, i) => (
         <a key={i} href={`/w-page/result?search=${topic}`} className="text-sm py-2 px-3 bg-slate-50 rounded hover:bg-slate-100 text-gray-600 ">{topic}</a>
      ))}
    </div>
  );
}
export default SimilarTopics;