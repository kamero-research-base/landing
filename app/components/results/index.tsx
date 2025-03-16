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
    <div className="sm:px-5 sm:py-2 bg-slate-50 flex flex-1 mt-[125px]">
      <div className="hidden sm:grid fixed w-[20vw]">
        <h4 className="py-2">Similars</h4>
        <div className="flex items-center">
          {buttons.map((btn, i) => (
            <button
              key={i}
              onClick={() => setActiveBtn(activeBtn === i ? null : i)}
              className={`w-full py-1 px-2 ${
                activeBtn === i ? "border-b-0 bg-white" : ""
              }`}
            >
              {btn.name}
            </button>
          ))}
        </div>
        {/* Show content only when clicked */}
        <div className={`${activeBtn !== null ? "block" : "hidden"}`}>
          {activeBtn === 0 && <SimilarTopics />}
          {activeBtn === 1 && <SimilarTitles />}
        </div>
      </div>
      <Researches />
    </div>
  );
};

export default Result;
