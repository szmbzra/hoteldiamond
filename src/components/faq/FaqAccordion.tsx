"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface AccordionItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: AccordionItem[];
}

const FaqAccordion: React.FC<FaqAccordionProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!items || items.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center text-gray-400 text-sm">
        No FAQ items found.
      </div>
    );
  }

  return (
    <div className="space-y-3 lg:col-span-8">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className={`bg-white rounded-xl border transition-all duration-300 overflow-hidden ${
              isOpen
                ? "border-gold/40 shadow-md shadow-gold/5"
                : "border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200"
            }`}
          >
            <button
              onClick={() => toggle(index)}
              className="w-full flex items-center justify-between hover:cursor-pointer px-6 py-5 text-left focus:outline-none group"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-4 pr-4">
                <span
                  className={`flex items-center justify-center w-8 h-8 rounded-lg text-xs font-semibold shrink-0 transition-colors duration-300 ${
                    isOpen
                      ? "bg-gold text-luxury-dark"
                      : "bg-gray-100 text-gray-400 group-hover:bg-gray-200"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className={`text-sm font-medium transition-colors duration-300 ${
                    isOpen ? "text-gray-900" : "text-gray-700 group-hover:text-gray-900"
                  }`}
                >
                  {item.question}
                </span>
              </div>
              <ChevronDown
                className={`w-5 h-5 shrink-0 transition-all duration-300 ${
                  isOpen ? "rotate-180 text-gold" : "text-gray-300 group-hover:text-gray-400"
                }`}
              />
            </button>

            <div
              className={`grid transition-all duration-300 ease-in-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-6 pb-6 pl-[4.5rem]">
                  <div className="h-px bg-gray-100 mb-4" />
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {item.answer?.trim()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FaqAccordion;
