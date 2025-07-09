import HeroSection from "@/components/HeroSection";
import WhyNikooSection from "@/components/WhyNikooSection";
import AmenitiesSection from "@/components/AmenitiesSection";
import UnitPlansSection from "@/components/UnitPlansSection";
import LocationSection from "@/components/LocationSection";
import Footer from "@/components/Footer";
import React, { useEffect, useRef, useState } from "react";

const Index = () => {
  const sections = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];
  const [showGoToTop, setShowGoToTop] = useState(false);

  useEffect(() => {
    const reveal = () => {
      sections.forEach((ref) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        if (rect.top < window.innerHeight - 80) {
          ref.current.classList.add("visible");
        }
      });
    };
    window.addEventListener("scroll", reveal);
    reveal();
    return () => window.removeEventListener("scroll", reveal);
  }, [sections]);

  useEffect(() => {
    const handleScroll = () => {
      if (sections[1].current) {
        const rect = sections[1].current.getBoundingClientRect();
        setShowGoToTop(rect.top < 0); // Show if scrolled past second section
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const handleGoToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      <div ref={sections[0]} className="fade-up"><HeroSection /></div>
      <div ref={sections[1]} className="fade-up"><WhyNikooSection /></div>
      <div ref={sections[2]} className="fade-up"><AmenitiesSection /></div>
      <div ref={sections[3]} className="fade-up"><UnitPlansSection /></div>
      <div ref={sections[4]} className="fade-up"><LocationSection /></div>
      <div ref={sections[5]} className="fade-up"><Footer /></div>
      {showGoToTop && (
        <button
          onClick={handleGoToTop}
          className="fixed bottom-6 right-6 z-50 bg-[#CF2E2E] text-white p-3 rounded-full shadow-lg hover:bg-[#b82828] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#CF2E2E] animate-fade-in"
          aria-label="Go to top"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 go-to-top-animate" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
        </button>
      )}
    </div>
  );
};

export default Index;
