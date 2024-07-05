"use client";
import { useState } from "react";

const Tabs = ({ tabContent }) => {
   const [activeTab, setActiveTab] = useState(0);

   return (
      <div className="container mx-auto p-4">
         <div className="flex justify-around mb-4">
            {tabContent.map((tab, index) => (
               <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`p-2 ${activeTab === index ? "bg-blue-500 text-white" : "bg-gray-200"}`}
               >
                  {tab.label}
               </button>
            ))}
         </div>
         <div>{tabContent[activeTab].content}</div>
      </div>
   );
};

export default Tabs;
