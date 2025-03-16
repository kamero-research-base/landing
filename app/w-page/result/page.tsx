"use client";

import SideBar from "@/app/pages/sidebar";
import TopBar from "@/app/components/results/top";
import { useState } from "react";
import Result from "@/app/components/results";
import Footer from "@/app/pages/footer";

const Results = ( ) => {
    const [isOpen, setIsOpen] = useState(false);
    const showSideBar = () => {
      setIsOpen(!isOpen);
    }
   const closeSideBar = () => {
    setIsOpen(false);
   }
  
  return (
    <>
    <TopBar onClickSideBar={showSideBar}/>
      {isOpen && (
        <SideBar />
      )}
    <div onClick={closeSideBar}>
      <Result />
      <Footer />
    </div>
    </>
  );
}
export default Results;
