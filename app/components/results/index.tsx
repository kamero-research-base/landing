"use client";

import { useState } from "react";
import SimilarTopics from "./similarTopics";
import SimilarTitles from "./similarTitles";
import Researches from "./researches";

const buttons = [
  { name: "Category" },
  { name: "Titles" }, 
  { name: "Books" },
];

const Result = () => {
  const [activeBtn, setActiveBtn] = useState<number | null>(0);

  return (
    <div className="min-h-screen sm:px-5 sm:py-2 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 flex flex-1 mt-[80px]">
      <div className="hidden sm:grid fixed w-[20vw]">
        <h4 className="py-2 text-black font-semibold bg-gradient-to-r from-teal-900/25 to-slate-900/5 px-4 rounded-t-lg shadow-xl border-b border-teal-800/20">Similars</h4>
        <div className="flex items-center bg-white/95 backdrop-blur-sm rounded-none shadow-lg border border-slate-200/60 overflow-hidden">
          {buttons.map((btn, i) => (
            <button
              key={i}
              onClick={() => setActiveBtn(activeBtn === i ? null : i)}
              className={`w-full py-2 px-3 text-sm font-medium transition-all duration-300 ${
                activeBtn === i 
                  ? "bg-gradient-to-r from-teal-600 to-slate-700 text-white shadow-lg scale-105 border-r border-teal-500/30" 
                  : "text-slate-700 hover:text-slate-900 hover:bg-gradient-to-r hover:from-teal-50 hover:to-slate-50 border-r border-slate-200/40 last:border-r-0"
              }`}
            >
              {btn.name}
            </button>
          ))}
        </div>
        
        {/* Show content only when clicked */}
        <div className={`mt-2 ${activeBtn !== null ? "block" : "hidden"}`}>
          {activeBtn === 0 && <SimilarTopics />}
          {activeBtn === 1 && <SimilarTitles />}
          {activeBtn === 2 && (
            <div className="bg-white/95 backdrop-blur-sm py-4 px-3 rounded-b-lg border border-slate-200/60 shadow-lg">
              <div className="text-center text-slate-600">
                <div className="w-8 h-8 mx-auto mb-2 bg-gradient-to-br from-teal-100 to-slate-100 rounded-full flex items-center justify-center">
                  <span className="text-slate-500 text-xs">📚</span>
                </div>
                <p className="text-sm">Books feature coming soon</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <Researches />
    </div>
  );
};

export default Result;